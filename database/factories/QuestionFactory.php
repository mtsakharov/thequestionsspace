<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Question::class, function (Faker $faker) {
    return [
        'body' => $faker->text,
        'views' => 0,
        'image' => $faker->imageUrl(1200, 300),
        'category_id' => \App\Category::inRandomOrder()->first()->id,
    ];
});
