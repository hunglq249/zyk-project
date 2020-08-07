@extends('layouts.client')

@section('page_title')
    Chart
@endsection

@section('view')
    <div class="container-fluid">
        <div class="section section-chart">
            <div class="section-header">
                <h3>Chart</h3>
            </div>

            <div class="section-body">
                <div class="test-chart">
                    <div class="chart-append chart-append-lg">
                        <canvas id="chartOne">
                            Browser doesn't support canvas
                        </canvas>
                    </div>

                    <div class="chart-code overflow-y">
                        <code>
                            const chartOne = new Chart('#chartOne');
                        </code>
                    </div>
                </div>

                <div class="test-chart">
                    <div class="chart-append chart-append-lg">
                        <div class="chart" id="chartMonth"></div>
                    </div>

                    <div class="chart-code overflow-y">
                        <code>
                            let calendarMonth = new Chart('#calendarMonth',{
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
            const chartOne = new Chart('#chartOne');
        })
    </script>
@endsection
