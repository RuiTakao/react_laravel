<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PortFoilosController extends Controller
{
    public function __construct()
    {
    }

    public function index($name = null)
    {
        return view('portfolios')->with(['name' => $name]);
    }
}
