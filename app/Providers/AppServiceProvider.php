<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Passport\PassportServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
       PassportServiceProvider::class;
    }

    /*
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
