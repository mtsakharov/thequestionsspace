<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Create a new user instance after a valid registration.
     * @param Request $request
     * @return mixed
     */
    protected function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $credentials = [
            'email' => $request['email'],
            'password' => $request['password'],
        ];

        if ($validator->fails())
        {
            return response()->json(['errors' => $validator->errors()], 401);
        }

        else {
            if (auth()->attempt($credentials)) {

                $token = auth()->user()->createToken('Laravel Password Grant Client')->accessToken;

                return response()->json(['token' => $token], 200);
            } else {
                return response()->json(['errors' => ['email' => 'Invalicdmcdd credetials']], 401);
            }
        }

    }
}
