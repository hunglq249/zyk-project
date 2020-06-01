@extends('layouts.client')

@section('page_title')
    Timepicker
@endsection

@section('view')
    <div class="container-fluid">
        <div class="section section-timepicker">
            <div class="section-header">
                <h3>Datepicker</h3>
            </div>

            <div class="section-body">
                <div class="test-picker">
                    <div class="picker-append calendar-append-lg">
                        <input type="text" class="form-control datepicker" title="Datepicker">
                    </div>

                    <div class="picker-code overflow-y">
                        <code>
                            let calendar = new Calendar('#calendarDefault');
                        </code>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('js')
    <script>
        $(document).ready(function(){
            $('.datepicker').each(function(){
                $(this).on('click', function(){
                    new Datepicker(this)
                })
            })
        })
    </script>
@endsection