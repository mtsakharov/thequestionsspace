<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        return CategoryResource::collection(Category::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return CategoryResource
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => ['required'],
            'name' => ['required'],
        ]);

        $category = Category::create($request->all());

        return new CategoryResource($category);
    }

    /**
     * Display the specified resource.
     *
     * @param Category $category
     * @return CategoryResource
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param Category $category
     * @return mixed
     */
    public function update(Request $request, Category $category)
    {
        return CategoryResource(Category::uodate($category, $request->all()));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
     * @return AnonymousResourceCollection
     * @throws \Exception
     */
    public function destroy(Category $category)
    {
        return CategoryResource::collection(Category::delete($category));
    }
}
