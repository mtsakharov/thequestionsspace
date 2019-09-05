<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\QuestionResource;
use App\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use function Sodium\increment;

class QuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        return QuestionResource::collection(Question::paginate(5));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return QuestionResource
     */
    public function store(Request $request)
    {
        $request->validate([
            'body' => ['required', 'string', 'max:255'],
            'category_id' => ['required'],
            'image' => ['required'],
            'user_id' => ['required'],
        ]);

        $question = Question::create($request->all());

        return new QuestionResource($question);
    }

    /**
     * Display the specified resource.
     *
     * @param Question $question
     * @return QuestionResource
     */
    public function show(Question $question)
    {
        $question->increment('views');

        return new QuestionResource($question);
    }

    public function image(Request $request){

        $path = $request->file('file')->store('public/images');

        return '/images/'.basename($path);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Question $question
     * @return AnonymousResourceCollection
     */
    public function update(Request $request, Question $question)
    {
        $question = new QuestionResource($question);

        $question->update($request->all());

        return response('ok');
    }

    /**
     * Remove the specified resource from storage.
     * @param Question $question
     * @return QuestionResource
     * @throws \Exception
     */

    public function destroy(Question $question)
    {
        return new QuestionResource(Question::delete($question));
    }
}
