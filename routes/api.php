<?php
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return new UserResource(User::findOrFail($request->user('api')->id));
});

Route::get('/questions', 'Api\QuestionsController@index');
Route::get('/questions/question/{question}', 'Api\QuestionsController@show');
Route::post('/questions/question/store', 'Api\QuestionsController@store');
Route::post('/questions/question/image/upload', 'Api\QuestionsController@image');
Route::post('/questions/question/{question}/update', 'Api\QuestionsController@update');
Route::post('/questions/question/{question}/delete', 'Api\QuestionsController@destroy');
Route::post('/questions/question/{question}/{user}/bookmark/attach', 'Api\UsersController@attachBookmark');
Route::post('/questions/question/{question}/{user}/bookmark/detach', 'Api\UsersController@detachBookmark');

Route::post('/answers/answer/store', 'Api\AnswersController@store');
Route::get('/questions/question/{question}/answers', 'Api\AnswersController@index');
Route::post('/answers/answer/{answer}/update', 'Api\AnswersController@update');
Route::post('/answers/answer/{answer}/delete', 'Api\AnswersController@destroy');

Route::post('/answers/answer/{answer}/{user}/attach', 'Api\UsersController@attachStar');
Route::post('/answers/answer/{answer}/{user}/detach', 'Api\UsersController@detachStar');

Route::get('/categories', 'Api\CategoriesController@index');
Route::post('/categories/category/store', 'Api\CategoriesController@store');
Route::get('/categories/category/{category}', 'Api\CategoriesController@show');
Route::post('/categories/category/{category}/update', 'Api\CategoriesController@update');
Route::post('/categories/category/{category}/delete', 'Api\CategoriesController@destroy');

Route::post('/users/user/{user}/update', 'Api\UsersController@update');

Route::post('/login', 'Api\Auth\LoginController@store');
Route::post('/register', 'Api\Auth\RegisterController@store');
