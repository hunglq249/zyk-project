@extends('layouts.main_layout')

@section('view')
    <div class="view-gen">
        <div class="quarter">
            <div class="quarter-header">
                <h6>
                    Form input
                </h6>
            </div>

            <div class="quarter-body">
                <form id="formGen">
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label>
                                Select component
                            </label>
                            <select class="form-control" id="inputComponentId">
                                <option value="">Please select a component</option>

                                @foreach($components as $key => $component)
                                    <optgroup label="{{ $component['GroupTitle'] }}">
                                        @foreach($component['Features'] as $key => $feature)
                                            <option value="{{ $feature['Id'] }}" data-group-id="{{ $component['GroupId'] }}">
                                                {{ $feature['Title'] }}
                                            </option>
                                        @endforeach
                                    </optgroup>
                                @endforeach
                            </select>
                            <small class="form-text text-danger"></small>
                        </div>
                    </div>

                    <div class="row" id="formConfig">
                        <!-- EXTRA CONFIG APPENDS HERE -->
                    </div>
                </form>
            </div>

            <div class="quarter-footer">
                <button class="btn" onclick="resetForm()" type="button">
                    Reset
                </button>

                <button class="btn btn-primary disabled" id="btnGen" onclick="generateCode()" type="button" disabled>
                    Generate
                </button>
            </div>
        </div>
        
        <div class="quarter quarter-code">
            <code>
                /*
                Code will be append here
                */
            </code>

            <button class="btn btn-default btn-copy" type="button">
                Copy
            </button>
        </div>

        <div class="quarter quarter-demo">
            <p>
                Demo
            </p>
        </div>
        
        <div class="quarter">
            3
        </div>
    </div>
@endsection

@section('css')
    <link rel="stylesheet" href="{{ asset('dist/helper/scss/css/gen_code.min.css') }}">
@endsection

@section('js')
    <script src="{{ asset('dist/js/utils.js') }}"></script>

    <script src="{{ asset('dist/helper/js/gen_code/generate.js') }}"></script>
    <script src="{{ asset('dist/helper/js/gen_code/function.js') }}"></script>
@endsection