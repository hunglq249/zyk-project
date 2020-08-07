@extends('layouts.client')

@section('page_title')
    List table
@endsection

@section('view')
    <div class="container-fluid">
        <div class="section section-table">
            <div class="section-header">
                <h3>List table</h3>
            </div>

            <div class="section-body">
                <div class="list-table-responsive">
                    <div class="list-items list-table list-table-bordered list-table-striped">
                        <div class="list-items-header">
                            <div class="item">
                                <div class="item-row">
                                    <div class="item-col-1">
                                        <p class="p-overline">Index</p>
                                    </div>
                                    <div class="item-col-4">
                                        <p class="p-overline">Name</p>
                                    </div>
                                    <div class="item-col-2">
                                        <div class="item-row">
                                            <div class="item-col-6">
                                                <p class="p-overline">Id 1</p>
                                            </div>
                                            <div class="item-col-6">
                                                <p class="p-overline">Id 2</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item-col-4">
                                        <p class="p-overline">Place</p>
                                    </div>
                                    <div class="item-col-1">
                                        <p class="p-overline">Actions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="list-items-body">
                            @for($i=0;$i<15;$i++)
                                <div class="item">
                                    <div class="item-row">
                                        <div class="item-col-1">
                                            <p class="p-sm">{{ $i + 1 }}</p>
                                        </div>
                                        <div class="item-col-4">
                                            <p class="p-sm">Name {{ $i + 1 }}</p>
                                        </div>
                                        <div class="item-col-2">
                                            <div class="item-row">
                                                <div class="item-col-6">
                                                    <p class="p-sm">{{ $i + 1 }}</p>
                                                </div>
                                                <div class="item-col-6">
                                                    <p class="p-sm">{{ $i + 1 }}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item-col-4">
                                            <p class="p-sm">Place #{{ $i + 1 }}</p>
                                        </div>
                                        <div class="item-col-1 float-action">
                                            <div class="btn-group">
                                                <button class="btn" type="button">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="btn" type="button">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endfor
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection