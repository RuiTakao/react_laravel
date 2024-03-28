<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfilesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api'], function () {
    Route::get('/profile', [ProfilesController::class, 'get']);
    Route::post('/profile', [ProfilesController::class, 'update']);
    Route::post('/testImage',[HomeController::class,'imageUplaod']);
    Route::post('/regist', [App\Http\Controllers\HomeController::class, 'regist'])->name('regist');
    Route::get('/post', [App\Http\Controllers\HomeController::class, 'post'])->name('post');
    Route::post('/postDelete/{post}', [App\Http\Controllers\HomeController::class, 'postDelete'])->name('postDelete');
});
