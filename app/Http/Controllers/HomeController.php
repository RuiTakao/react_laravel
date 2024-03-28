<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
        // parent::__construct();
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $posts = Posts::all();

        return view('home', compact('posts'));
    }

    public function store(Request $request)
    {
        $post = new Posts();
        $post->name = $request->name;
        $post->save();

        return redirect()->route('home');
    }

    public function post() {
        $posts = Posts::all();

        return response()->json($posts);
    }

    public function regist(Request $request) {
        $post = new Posts();
        $post->name = $request->name;
        $post->save();

        return response()->json(['message' => '登録しました']);
    } 

    public function postDelete(Posts $post) {
        $post->delete();
        return response()->json(['OK']);
    }


    public function imageUplaod(Request $request)
    {
    //    $T = $request->saveImage->name;

        $R = $request->saveImage;
        $request->file('saveImage')->store('public/');
        // $image = str_replace('data:image/png;base64,', '', $request->saveImage);
        // $image = str_replace(' ', '+', $image);  // 空白を'+'に変換

        // //ファイル名の指定
        // $imageName ='aaa'.'.'.'jpeg';
        // $R = storage_path();

        // //デコードしたファイルをstorageに保存
        // $T = \File::put(storage_path(). '/' . $imageName, $request->saveImage);

        return response()->json([$request->file('saveImage')]);
    }
}
