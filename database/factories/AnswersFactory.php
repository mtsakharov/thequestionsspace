<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Answer::class, function (Faker $faker) {
    return [
        'body' => $faker->paragraph,
        'question_id' => \App\Question::inRandomOrder()->first()->id,
    ];
});
