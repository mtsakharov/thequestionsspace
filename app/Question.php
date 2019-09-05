<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Question extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
      'id', 'body', 'image', 'views', 'category_id', 'user_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return HasMany
     */
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    /**
     * @param $user
     * @return bool
     */
    public function isMarked()
    {
        if (auth('api')->check()){
            return ! ! $this->userBookMarks()->where('user_id', auth()->guard('api')->user()->id)->count();
        } else {
            return false;
        }
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function userBookMarks()
    {
        return $this->belongsToMany(User::class, 'user_question');
    }
}
