<?php

namespace App\Http\Controllers\Api;

use App\Answer;
use App\Http\Resources\UserResource;
use App\Question;
use App\User;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class UsersController extends Controller
{
    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param User $user
     * @return ResponseFactory|Response
     */
    public function update(Request $request, User $user)
    {
        $user = new UserResource($user);

        $user->update($request->all());

        return response('ok');
    }

    /**
     * @param Answer $answer
     * @param User $user
     * @return string
     */
    public function attachStar(Answer $answer, User $user)
    {
        $user->stars()->attach($answer);

        return 'ok';
    }

    /**
     * @param Answer $answer
     * @param User $user
     * @return string
     */
    public function detachStar(Answer $answer, User $user)
    {
        $user->stars()->detach($answer);

        return 'ok';
    }

    /**
     * @param Question $question
     * @param User $user
     * @return string
     */
    public function attachBookmark(Question $question, User $user)
    {
        $user->bookmarks()->attach($question);

        return 'ok';
    }

    /**
     * @param Question $question
     * @param User $user
     * @return string
     */
    public function detachBookmark(Question $question, User $user)
    {
        $user->bookmarks()->detach($question);

        return 'ok';
    }
}
