<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Category::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'image' => $faker->imageUrl(1200, 300),
        'views' => 0
    ];
});
