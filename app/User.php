<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'name','avatar', 'role', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

//    /**
//     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
//     */
//    public function bookmarks()
//    {
//        return $this->belongsToMany(User::class, 'bookmarks', 'bookmark_id', 'user_id')->withTimestamps();
//    }
//
//    /**
//     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
//     */
//    public function stars()
//    {
//        return $this->belongsToMany(User::class, 'stars', 'answer_id', 'user_id')->withTimestamps();
//    }
}
