<!doctype html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- FONT AWESOME -->
        <link rel="stylesheet" href="{{ asset('plugins/fa/css/all.min.css') }}">

        <!-- MAIN STYLE -->
        <link rel="stylesheet" href="{{ asset('dist/css/zayeki.css') }}">

        <!-- MAIN JS -->
        <script src="{{ asset('plugins/jquery/jquery-3.4.1.min.js') }}"></script>

        <!-- POPPER JS -->
        <script src="https://unpkg.com/@popperjs/core@2"></script>

        <!-- ZAYEKI JS -->
        <script src="{{ asset('dist/js/zayeki.js') }}"></script>

        <!-- COMMON JS -->
        <script src="{{ asset('dist/js/common.js') }}"></script>

        <title>Testing elements</title>
    </head>

    <body style="background-color: var(--bg-body);">
        <div id="appendUi">
            <!-- CONTENT APPENDS HERE -->
        </div>

        <button class="btn btn-primary"
            onclick="updateTest()"
            type="button"
            style="position: fixed; top: 45%; left: 0; z-index: 2000; transform: translateY(-50%)"
        >
            <i class="fas fa-undo"></i>
        </button>
        <button class="btn btn-secondary"
            onclick="window.location.reload();"
            type="button"
            style="position: fixed; top: 55%; left: 0; z-index: 2000; transform: translateY(-50%)"
        >
            <i class="fas fa-undo"></i>
        </button>
    </body>

    <script>
        $(document).ready(function(){
            updateTest();
        })

        function updateTest(){
            const CSRF = $('meta[name="csrf-token"]').attr('content');

            $.ajax({
                type: 'get',
                url: '/updateTest',
                data: {
                    _token: CSRF
                },
                success: function (res) {
                    $('#appendUi').html(res.html);

                    // INIT
                    initTest();

                    let calendar2 = new Calendar('#testCalendar2');
                },
                error: function (xhr, status, statusText) {

                }
            })
        }

        function initTest(){
            initCalendar();

            $('[data-toggle="tooltip"]').tooltip();

            $('#tooltipManual').on('show.zyk.tooltip', function(){
                console.log('show')
            })

            $('#tooltipManual').on('shown.zyk.tooltip', function(){
                console.log('shown')
            })

            $('#tooltipManual').on('hide.zyk.tooltip', function(){
                console.log('hide')
            })

            $('#tooltipManual').on('hidden.zyk.tooltip', function(){
                console.log('hidden')
            })

            new Pagination('.pagination');

            new Breadcrumb([
                {
                    text: 'Home',
                    link: '/home/#',
                },
                {
                    text: 'Link',
                    link: '#',
                }
            ])
        }

        function initCalendar(){
            let eventsByDay = {
                '2020-07-28' : {
                    0 : [
                        {
                            ev_id: 0,
                            title: 'Event #0',
                            startDate: '2020-07-28',
                            start: '20:00',
                            duration: '120'
                        },
                        {
                            ev_id: 1,
                            title: 'Event #1',
                            startDate: '2020-07-28',
                            start: '20:00',
                            duration: '120'
                        }
                    ],
                    1 : []
                },
                '2020-07-29' : {
                    0 : [],
                    1 : [
                        {
                            ev_id: 0,
                            title: 'Event #0',
                            startDate: '2020-07-28',
                            start: '20:00',
                            duration: '120'
                        },
                        {
                            ev_id: 1,
                            title: 'Event #1',
                            startDate: '2020-07-28',
                            start: '20:00',
                            duration: '120'
                        }
                    ]
                },
                '2020-07-30' : {
                    0 : [
                        {
                            ev_id: 0,
                            title: 'Event #0',
                            startDate: '2020-07-28',
                            start: '20:00',
                            duration: '120'
                        }
                    ],
                    1 : [
                        {
                            ev_id: 1,
                            title: 'Event #1',
                            startDate: '2020-07-28',
                            start: '20:00',
                            duration: '120'
                        }
                    ]
                }
            };

            let calendar = new Calendar('#testCalendar', {
                lang: 'vi',
                dayRatio: 1.5,
                bordered: true,
                header: {
                    controls: ['control', 'today'],
                    title: true
                },
                body:{
                    tableHeader:{
                        type: 'daysOfWeekShort'
                    }
                },
                buttonClass: {
                    default: 'btn btn-sm btn-outline-default',
                    active: 'btn btn-sm btn-secondary',
                },

                events: eventsByDay,
                eventOnClick: function(target){
                    let eventKey = $(target).data('calendar-day');

                    let arrIds = [];

                    if (typeof eventsByDay[eventKey] != 'undefined'){
                        $.each(eventsByDay[eventKey], function(index, item){
                            arrIds.push(eventsByDay[eventKey][index]);
                        })

                        getClassOnDay(eventKey, arrIds);
                    } else {
                        getClassOnDay(eventKey);
                    }
                }
            });
        }

        function getClassOnDay(date, arrIds){
            console.log(date, arrIds)

            $('#eventAppend').children('h5').text(new Date(date).toDateString());
        }
    </script>
</html>
