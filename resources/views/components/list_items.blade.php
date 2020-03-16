@extends('layouts.client')

@section('page_title')
    List items
@endsection

@section('view')
    <div class="container-fluid">
        <div class="section section-list-items">
            <div class="section-header">
                <h3>List items</h3>
            </div>

            <div class="section-body">
                <div class="list-items list-switchable view-list overflow-y" id="listItemsExp">
                    <div class="list-control">
                        <div class="list-control-left">
                            <h6>List switchable</h6>
                        </div>

                        <div class="list-control-right">
                            <button class="btn btn-sm btn-list-active" type="button">
                                <i class="fas fa-th-list"></i>
                            </button>

                            <button class="btn btn-sm" type="button">
                                <i class="fas fa-th"></i>
                            </button>
                        </div>
                    </div>
                    <div class="list-header">
                        <div class="item">
                            <div class="item-wrapper">
                                <div class="item-col-1">
                                    Index
                                </div>
                                <div class="item-col-1">
                                    Image
                                </div>
                                <div class="item-col-3">
                                    Name/ Title
                                </div>
                                <div class="item-col-2">
                                    Subtitle
                                </div>
                                <div class="item-col-5">
                                    Description
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="list-body">
                        @for($i = 0; $i < 15; $i++)
                            <div class="item">
                                <a href="#" class="item-wrapper">
                                    <div class="item-col-1">
                                        <span class="item-index">
                                            {{ $i+1 }}
                                        </span>
                                    </div>
                                    <div class="item-col-1">
                                        <div class="mask">
                                            <img src="https://images.unsplash.com/photo-1583870808702-67c85debae3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Image {{ $i + 1}}">
                                        </div>
                                    </div>
                                    <div class="item-col-3">
                                        <span class="item-title">
                                            Name/ Title {{ $i * 2 }}
                                        </span>
                                    </div>
                                    <div class="item-col-2">
                                        <span class="item-subtitle">
                                            Subtitle {{ $i * 2 + 1 }}
                                        </span>
                                    </div>
                                    <div class="item-col-5">
                                        <span class="item-text">
                                            Description of this item  #{{ $i+1 }}
                                        </span>
                                    </div>
                                </a>

                                <div class="item-actions">
                                    <div class="dropdown">
                                        <button class="btn btn-sm" data-toggle="dropdown">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </button>

                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a href="javascript:void(0);" class="dropdown-item">
                                                <i class="fas fa-pencil-alt"></i> Edit
                                            </a>
                                            <a href="javascript:void(0);" class="dropdown-item">
                                                <i class="fas fa-times"></i> Delete
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endfor
                    </div>

                    <div class="list-footer">

                    </div>
                </div>             
            </div>
        </div>
    </div>

    {{-- <div class="popup-backdrop"></div> --}}
@endsection

@section('js')
    <script>
        $(document).ready(function(){
            $('.list-items').listview();
        })
    </script>
@endsection