@extends('layouts.client')

@section('page_title')
    Theme
@endsection

@section('view')
    <div class="container-fluid">
        <div class="section section-theme">
            <div class="section-header">
                <h3>Theme</h3>
            </div>

            <div class="section-body">
                <div class="row">
                    <div class="col">
                        <table>
                            <tr>
                                <th>Exp</th>
                                <th>Value</th>
                                <th>Var name</th>
                            </tr>

                            @php
                                $theme = [
                                    'primary' => ['#f26d21'],
                                    'secondary' => ['#2D8692'],
                                    'black' => ['#000'],
                                    'white' => ['#fff'],

                                    'success' => ['#00A65A'],
                                    'warning' => ['#E0A800'],
                                    'danger' => ['#C82333'],
                                    'link' => ['#007DFF'],

                                    'gray-1' => ['#f2f2f7', '#1b1b1d'],
                                    'gray-2' => ['#e5e5ea', '#2c2c2e'],
                                    'gray-3' => ['#d1d1d6', '#3a3a3c'],
                                    'gray-4' => ['#c7c7cc', '#48484a'],
                                    'gray-5' => ['#aeaeb2', '#636366'],
                                    'gray-6' => ['#8e8e93', '#8e8e93'],

                                    'bg-bw' => ['#fff', '#000'],
                                    'border' => ['#c7c7cc', '#48484a'],

                                    'text-title' => ['#000', '#fff'],
                                    'text-subtitle' => ['#3a3a3c', '#d1d1d6'],
                                    'text-paragraph' => ['#636366', '#aeaeb2'],

                                    'btn-default' => ['#e5e5e5', '#080101'],
                                    'btn-default-hover' => ['#f2f2f2', '#1c1c1c'],
                                ];
                            @endphp

                            @foreach($theme as $key => $item)
                                <tr>
                                    <td>
                                        <div class="square" style="background-color: var(--{{ $key }});"></div>
                                    </td>
                                    <td>
                                        @foreach ($item as $value)
                                            {{ $value }}
                                        @endforeach
                                    </td>
                                    <td>--{{ $key }}</td>
                                </tr>
                            @endforeach
                        </table>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="card">
                            <div class="card-header">
                                <h6>Header</h6>

                                <button class="btn btn-sm" type="button">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>

                            <div class="card-body">
                                <h4>Johnny Flores</h4>
                                <h6>1520 Lone Wolf Trail Little Rock, Vermont 69822 United States</h6>

                                <p class="p-sm">
                                    1520 Lone Wolf Trail undefined Little Rock, Vermont 69822 United States
                                    <i class="fas fa-circle"></i>
                                    <i class="fas fa-play"></i>
                                    <i class="fas fa-times"></i>
                                </p>

                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Index</th>
                                            <th>Name</th>
                                            <th>Sex</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>John</td>
                                            <td>Male</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Index</th>
                                            <th>Name</th>
                                            <th>Sex</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>John</td>
                                            <td>Male</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="form-group">
                                    <label>Form</label>
                                    <input type="text" class="form-control">
                                </div>

                                <div class="form-group">
                                    <label>Input Group</label>

                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">$</span>
                                        </div>

                                        <input type="text" class="form-control">

                                        <div class="input-group-append">
                                            <button class="btn" type="button">
                                                Button
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="dropdown">
                                    <button class="btn btn-link dropdown-toggle" data-toggle="dropdown">
                                        Dropdown right here
                                    </button>

                                    <div class="dropdown-menu">
                                        <a href="#" class="dropdown-item">
                                            Hello
                                        </a>
                                        <a href="#" class="dropdown-item">
                                            Bongzua
                                        </a>
                                        <a href="#" class="dropdown-item active">
                                            Xin chao
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="card-footer">
                                <button class="btn btn-primary" type="button">
                                    OK, I got it
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="col theme-dark">
                        <div class="card">
                            <div class="card-header">
                                <h6>Header</h6>

                                <button class="btn btn-sm" type="button">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>

                            <div class="card-body">
                                <h4>Johnny Flores</h4>
                                <h6>1520 Lone Wolf Trail Little Rock, Vermont 69822 United States</h6>

                                <p class="p-sm">
                                    1520 Lone Wolf Trail undefined Little Rock, Vermont 69822 United States
                                    <i class="fas fa-circle"></i>
                                    <i class="fas fa-play"></i>
                                    <i class="fas fa-times"></i>
                                </p>

                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Index</th>
                                            <th>Name</th>
                                            <th>Sex</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>John</td>
                                            <td>Male</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Index</th>
                                            <th>Name</th>
                                            <th>Sex</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>John</td>
                                            <td>Male</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="form-group">
                                    <label>Form</label>
                                    <input type="text" class="form-control">
                                </div>

                                <div class="form-group">
                                    <label>Input Group</label>

                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">$</span>
                                        </div>

                                        <input type="text" class="form-control">

                                        <div class="input-group-append">
                                            <button class="btn" type="button">
                                                Button
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="dropdown">
                                    <button class="btn btn-link dropdown-toggle" data-toggle="dropdown">
                                        Dropdown right here
                                    </button>

                                    <div class="dropdown-menu">
                                        <a href="#" class="dropdown-item">
                                            Hello
                                        </a>
                                        <a href="#" class="dropdown-item">
                                            Bongzua
                                        </a>
                                        <a href="#" class="dropdown-item active">
                                            Xin chao
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="card-footer">
                                <button class="btn btn-primary" type="button">
                                    OK, I got it
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <h4>Johnny Flores</h4>
                        <h6>1520 Lone Wolf Trail Little Rock, Vermont 69822 United States</h6>

                        <p class="p-sm">
                            1520 Lone Wolf Trail undefined Little Rock, Vermont 69822 United States
                            <i class="fas fa-circle"></i>
                            <i class="fas fa-play"></i>
                            <i class="fas fa-times"></i>
                        </p>

                        <div class="form-group">
                            <label>Form</label>
                            <input type="text" class="form-control">
                        </div>

                        <div class="form-group">
                            <label>Input Group</label>

                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">$</span>
                                </div>

                                <input type="text" class="form-control">

                                <div class="input-group-append">
                                    <button class="btn" type="button">
                                        Button
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="dropdown">
                            <button class="btn btn-link dropdown-toggle" data-toggle="dropdown">
                                Dropdown right here
                            </button>

                            <div class="dropdown-menu">
                                <a href="#" class="dropdown-item">
                                    Hello
                                </a>
                                <a href="#" class="dropdown-item">
                                    Bongzua
                                </a>
                                <a href="#" class="dropdown-item active">
                                    Xin chao
                                </a>
                            </div>
                        </div>

                        <button class="btn btn-primary" type="button">
                            OK, I got it
                        </button>
                    </div>

                    <div class="col theme-dark">
                        <h4>Johnny Flores</h4>
                        <h6>1520 Lone Wolf Trail Little Rock, Vermont 69822 United States</h6>

                        <p class="p-sm">
                            1520 Lone Wolf Trail undefined Little Rock, Vermont 69822 United States
                            <i class="fas fa-circle"></i>
                            <i class="fas fa-play"></i>
                            <i class="fas fa-times"></i>
                        </p>

                        <div class="form-group">
                            <label>Form</label>
                            <input type="text" class="form-control">
                        </div>

                        <div class="form-group">
                            <label>Input Group</label>

                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">$</span>
                                </div>

                                <input type="text" class="form-control">

                                <div class="input-group-append">
                                    <button class="btn" type="button">
                                        Button
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="dropdown">
                            <button class="btn btn-link dropdown-toggle" data-toggle="dropdown">
                                Dropdown right here
                            </button>

                            <div class="dropdown-menu">
                                <a href="#" class="dropdown-item">
                                    Hello
                                </a>
                                <a href="#" class="dropdown-item">
                                    Bongzua
                                </a>
                                <a href="#" class="dropdown-item active">
                                    Xin chao
                                </a>
                            </div>
                        </div>

                        <button class="btn btn-primary" type="button">
                            OK, I got it
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
