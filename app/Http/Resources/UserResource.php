<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'avatar' => $this->avatar,
            'role' => $this->role,
            'email' => $this->email,
            'questions' => QuestionResource::collection($this->questions),
            'answers' => AnswerResource::collection($this->answers),
            'created_at' => $this->created_at
        ];
    }
}
