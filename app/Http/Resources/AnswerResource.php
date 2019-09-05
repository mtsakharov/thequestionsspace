<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AnswerResource extends JsonResource
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
            'body' => $this->body,
            'question_id' => $this->question_id,
            'user_id' => $this->user_id,
            'user' => $this->user,
            'stars' => $this->stars,
            'stared' => $this->isStared(),
            'created_at' => $this->created_at
        ];
    }
}
