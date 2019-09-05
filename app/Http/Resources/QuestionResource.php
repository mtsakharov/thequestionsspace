<?php

namespace App\Http\Resources;

use App\User;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'image' => $this->image,
            'body' => $this->body,
            'category' => $this->category,
            'views' => $this->views,
            'user' => $this->user,
            'bookmarks' => $this->userBookMarks,
            'marked' => $this->isMarked(),
            'answers' => $this->answers->load('user', 'stars', 'question'),
            'created_at' => $this->created_at,
        ];
    }
}
