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

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--white);"></div>
                                </td>
                                <td>#fff</td>
                                <td>--white</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--black);"></div>
                                </td>
                                <td>#000</td>
                                <td>--black</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--primary);"></div>
                                </td>
                                <td>#f26d21</td>
                                <td>--primary</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--secondary);"></div>
                                </td>
                                <td>#2D8692</td>
                                <td>--secondary</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--success);"></div>
                                </td>
                                <td>#00A65A</td>
                                <td>--success</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--warning);"></div>
                                </td>
                                <td>#E0A800</td>
                                <td>--warning</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--danger);"></div>
                                </td>
                                <td>#C82333</td>
                                <td>--danger</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--link);"></div>
                                </td>
                                <td>#007DFF</td>
                                <td>--link</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--bg-bw);"></div>
                                </td>
                                <td>#fff/ #000</td>
                                <td>--bg-bw</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--bg-main);"></div>
                                </td>
                                <td>#f2f2f2/ #1c1c1c</td>
                                <td>--bg-main</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--bg-submain);"></div>
                                </td>
                                <td>#e5e5e5/ #080101</td>
                                <td>--bg-submain</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--border);"></div>
                                </td>
                                <td>#3a3a3a/ #d1d1d1</td>
                                <td>--border</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--text-title);"></div>
                                </td>
                                <td>#1c1c1c/ #f2f2f2</td>
                                <td>--text-title</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--text-subtitle);"></div>
                                </td>
                                <td>#484848/ #c7c7c7</td>
                                <td>--text-subtitle</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--text-paragraph);"></div>
                                </td>
                                <td>#636363/ #aeaeae</td>
                                <td>--text-paragraph</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--btn-default);"></div>
                                </td>
                                <td>#e5e5e5/ #080101</td>
                                <td>--btn-default</td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="square" style="background-color: var(--btn-default-hover);"></div>
                                </td>
                                <td>#f2f2f2/ #1c1c1c</td>
                                <td>--btn-default-hover</td>
                            </tr>
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