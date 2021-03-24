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

    <body class="theme-default" style="background-color: var(--bg-body)">
        <div id="appendUi">
            <!-- CONTENT APPENDS HERE -->
        </div>

        <div class="d-flex flex-column" style="position: fixed; top:50%; left: 0; z-index: 1030">
            <button class="btn btn-primary"
                onclick="updateTest()"
                type="button">
                <i class="fas fa-undo"></i>
            </button>
            <button class="btn btn-secondary"
                onclick="window.location.reload();"
                type="button">
                <i class="fas fa-undo"></i>
            </button>

            <button class="btn btn-secondary"
                onclick="switchTheme();"
                type="button">
                <i class="fas fa-lightbulb"></i>
            </button>
        </div>
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

            $('#tab_1_2').on('show.zyk.tab', function(){
                console.log('show')
            })

            $('#tab_1_2').on('shown.zyk.tab', function(){
                console.log('shown')
            })

            $('#tab_1_2').on('hide.zyk.tab', function(){
                console.log('hide')
            })

            $('#tab_1_2').on('hidden.zyk.tab', function(){
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

            // new TableData('#testTableData', {
            //     border: true,
            //     columns: [
            //         {
            //             label: 'Index',
            //             size: 1
            //         },
            //         {
            //             label: 'Name',
            //             size: 3
            //         },
            //         {
            //             label: 'Date of Birth',
            //             size: '25%'
            //         },
            //         {
            //             label: 'Prop',
            //             size: '33.33%',
            //             textAlign: 'center',
            //             children:[
            //                 {
            //                     label: 'Weight',
            //                     size: 'auto',
            //                     textAlign: 'center',
            //                 },
            //                 {
            //                     label: 'Height',
            //                     size: 'auto',
            //                     textAlign: 'center',
            //                 }
            //             ]
            //         }
            //     ],
            //     data: [
            //         {
            //             index: 1,
            //             name: 'Nguyen Van A',
            //             dob: '12-02-1993',
            //             prop: {
            //                 weight: '80kg',
            //                 height: '170cm'
            //             }
            //         },
            //         {
            //             index: 2,
            //             name: 'Nguyen Van B',
            //             dob: '24-05-1994',
            //             prop: {
            //                 weight: '84kg',
            //                 height: '167cm'
            //             }
            //         },
            //     ],
            //     actions: {
            //         label: 'Actions',
            //         showLabel: true,
            //         edit: `
            //             <button class="btn btn-sm" type="button">
            //                 <i class="elo el-lg el-pencil"></i>
            //             </button>
            //         `,
            //         remove: `
            //             <button class="btn btn-sm" type="button">
            //                 <i class="elo el-lg el-trash"></i>
            //             </button>
            //         `,
            //     }
            // });

            // new TableData('#testTableData1', {
            //     border: true,
            //     columns: [
            //         {
            //             label: 'Col 1',
            //             size: 4
            //         },
            //         {
            //             label: 'Col 2',
            //             size: 8
            //         }
            //     ]
            // });
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
