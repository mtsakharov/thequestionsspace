<?php

namespace App\Http\Controllers\Api;

use App\Answer;
use App\Http\Resources\AnswerResource;
use App\Http\Resources\QuestionResource;
use App\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AnswersController extends Controller
{
    /**
     * @param Question $question
     * @return QuestionResource
     */
    public function index(Question $question)
    {
        return new QuestionResource($question);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * @param Request $request
     * @return AnswerResource
     */
    public function store(Request $request)
    {
        $request->validate([
            'body' => ['required'],
            'question_id' => ['required'],
            'user_id' => ['required'],
        ]);

        $answer = Answer::create($request->all());

        return new AnswerResource($answer);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Answer  $answer
     * @return \Illuminate\Http\Response
     */
    public function show(Answer $answer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Answer  $answer
     * @return \Illuminate\Http\Response
     */
    public function edit(Answer $answer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Answer  $answer
     * @return \Illuminate\Http\Response
     */
    public function update(AnswerResource $request, Answer $answer)
    {
        $answer = new AnswerResource($answer);

        $answer->update($request->all());

        return response('ok');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Answer  $answer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Answer $answer)
    {
        $answer->delete();

        return response('deleted');
    }
}
