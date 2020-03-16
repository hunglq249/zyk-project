@extends('layouts.client')

@section('page_title')
    Alerts
@endsection

@section('view')
    <div class="container-fluid">
        <div class="section section-buttons">
            <div class="section-header">
                <h3>Alerts</h3>
            </div>

            <div class="section-body">
                <div class="row">
                    <div class="col-4">
                        <button class="btn btn-sm btn-success btn-poal" type="button" data-id="item1">
                            Alert Success
                        </button>

                        <button class="btn btn-sm btn-danger btn-poal" type="button" data-id="item2">
                            Alert Danger
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('js')
    <script>
        $(document).ready(function(){
            $('.btn-poal.btn-success').on('click', function(){
                let poal = new Poal({
                    'title': 'Success!!!',
                    'message': 'It\'s work'
                });
                //khi confirm bao alert('confirm')
            });

            $('.btn-poal.btn-danger').on('click', function(){
                let poal = new Poal({
                    'title': 'Danger!!!',
                    'message': 'It\'s about to crash'
                });
                // khi confirm refresh trang
            });
        });
    </script>
@endsection

