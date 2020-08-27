<?php

namespace App\Http\Controllers;

use App\Common;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class GenHelperController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index(){
        $components = Common::ZykComponents();

        return view('helper.gen_code', compact('components'));
    }

    public function getComponentConfig(){
        $components = Common::ZykComponents();

        $group = request()->get('group');
        $id = request()->get('id');

        $feature = $components[$group]['Features'][$id];

        $html = view('helper._ajax._config', compact('feature'))->render();

        return response()->json(['html' => $html]);
    }
}