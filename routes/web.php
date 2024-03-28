<?php

use App\Http\Controllers\AdminsController;
use App\Http\Controllers\LandingPagesController;
use App\Http\Controllers\PortFoilosController;
use App\Http\Controllers\ProfilesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('test', [ProfilesController::class, 'test']);

Route::prefix('admin')->group(function () {
    Route::get('{any?}', [AdminsController::class, 'index'])->where('any', '.*');
});

Route::get('/', [LandingPagesController::class, 'index']);
Route::get('/{name}', [PortFoilosController::class, 'index']);
