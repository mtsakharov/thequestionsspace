<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {

    $avatars = [
        '/img/avatar-1.jpg',
        '/img/avatar-2.jpg',
        '/img/avatar-3.jpg',
        '/img/avatar-4.jpg',
        '/img/avatar-5.jpg',
        '/img/avatar-6.jpg',
        '/img/avatar-7.jpg',
        '/img/avatar-8.jpg',
        '/img/avatar-9.jpg',
        '/img/avatar-10.jpg',
        '/img/avatar-11.jpg',
        '/img/avatar-12.jpg',
        '/img/avatar-13.jpg',
    ];
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'avatar' => $faker->randomElement($avatars),
        'email_verified_at' => now(),
        'role' => 'user',
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'remember_token' => Str::random(10),
    ];
});
