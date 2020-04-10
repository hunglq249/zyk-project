<?php

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

Route::get('/', function () {
    return view('public/home');
});

Route::group(['prefix' => 'components'], function () {
    Route::get('/alerts', function(){
        return view('components.alerts');
    });

    Route::get('/buttons', function(){
        return view('components.buttons');
    });

    Route::get('/badges', function(){
        return view('components.badges');
    });

    Route::get('/guide', function(){
        return view('components.guide');
    });

    Route::get('/header', function(){
        return view('components.header');
    });

    Route::get('/list-items', function(){
        return view('components.list_items');
    });

    Route::get('/popup', function(){
        return view('components.popup');
    });

    Route::get('/slider', function(){
        return view('components.slider');
    });

    Route::get('/theme', function(){
        return view('components.theme');
    });

    Route::get('/type', function(){
        return view('components.type');
    });
});
