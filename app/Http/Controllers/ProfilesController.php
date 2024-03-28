<?php

namespace App\Http\Controllers;

use App\Models\Profiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfilesController extends Controller
{

    public function __construct()
    {
        parent::__construct();

        $this->user = Auth::user();
    }

    public function get()
    {
        $profile = Profiles::where('user_id', Auth::id())->first();
        return response()->json($profile);
    }

    public function update(Request $request)
    {
        $file_name = $request->file('saveImage')->getClientOriginalName();
        Profiles::where('user_id', Auth::id())->update([
            'name' => $request->name,
            'work' => $request->work,
            'profile_text' => $request->profile_text,
            'saveImage' => $file_name
        ]);

        $request->file('saveImage')->storeAs('public/img/', $file_name);

        return response()->json(['message' => '登録しました']);
    }

    public function test()
    {
        $profile = Profiles::find(Auth::id());
        return view('test')->with(['user_id' => $profile]);
    }
}
