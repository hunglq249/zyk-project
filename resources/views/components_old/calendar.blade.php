@extends('layouts.client')

@section('page_title')
    Calendar
@endsection

@section('view')
    <div class="container-fluid">
        <div class="section section-calendar">
            <div class="section-header">
                <h3>Calendar</h3>
            </div>

            <div class="section-body">
                <div class="test-calendar">
                    <div class="calendar-append calendar-append-lg">
                        <div class="calendar" id="calendarDefault"></div>
                    </div>

                    <div class="calendar-code overflow-y">
                        <code>
                            let calendar = new Calendar('#calendarDefault');
                        </code>
                    </div>
                </div>

                <div class="test-calendar">
                    <div class="calendar-append calendar-append-lg">
                        <div class="calendar" id="calendarMonth"></div>
                    </div>

                    <div class="calendar-code overflow-y">
                        <code>
                            let calendarMonth = new Calendar('#calendarMonth',{
                                header: {
                                    'controls': ['control'],
                                    'title': true
                                },
                            });
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
            let calendar = new Calendar('#calendarDefault');

            let calendarMonth = new Calendar('#calendarMonth',{
                header: {
                    'controls': ['control'],
                    'title': true
                },
            });
        })
    </script>
@endsection
