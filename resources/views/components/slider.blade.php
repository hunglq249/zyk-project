@extends('layouts.client')

@section('page_title')
    Slider
@endsection

@section('view')
    <div class="container-fluid">
        <div class="section section-slider">
            <div class="section-header">
                <h3>Slider</h3>
            </div>

            <div class="section-body">
                <div class="zyk-slider" id="sliderDefault">
                    <div class="slider-inner">
                        <div class="slider-item">
                            <img src="https://images.unsplash.com/photo-1584664862155-6f754011bb1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="slide item 1">
                        </div>

                        <div class="slider-item active">
                            <img src="https://images.unsplash.com/photo-1562887085-cb16e9116582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="slide item 1">
                        </div>

                        <div class="slider-item">
                            <img src="https://images.unsplash.com/photo-1562887245-f2d5024f6134?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="slide item 1">
                        </div>

                        <div class="slider-item">
                            <img src="https://images.unsplash.com/photo-1558981001-5864b3250a69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="slide item 1">
                        </div>

                        <div class="slider-item">
                            <img src="https://images.unsplash.com/photo-1584683661685-04aea7c8735d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="slide item 1">
                        </div>
                    </div>

                    <div class="slider-controls">
                        <div class="slider-control slider-control-prev" data-slider-control="prev">
                            PREV
                        </div>

                        <div class="slider-control slider-control-next" data-slider-control="next">
                            NEXT
                        </div>
                    </div>

                    <div class="slider-indicator">

                    </div>
                </div>

                <div class="zyk-slider" id="slider2">
                    <div class="slider-inner">
                        <div class="slider-item active">
                            <img src="https://images.unsplash.com/photo-1584664862155-6f754011bb1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="slide item 1">
                        </div>

                        <div class="slider-item">
                            <img src="https://images.unsplash.com/photo-1562887085-cb16e9116582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="slide item 1">
                        </div>

                        <div class="slider-item">
                            <img src="https://images.unsplash.com/photo-1562887245-f2d5024f6134?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="slide item 1">
                        </div>
                    </div>

                    <div class="slider-controls">
                        <div class="slider-control slider-control-prev" data-slider-control="prev">
                            PREV
                        </div>

                        <div class="slider-control slider-control-next" data-slider-control="next">
                            NEXT
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('js')
    <script>
        $(document).ready(function(){
            $('#sliderDefault').slider({
                autoplay: false
            });

            $('#slider2').slider({
                autoplay: false,
                loop: false
            });

            $('#sliderDefault').on('switch.zyk.slider', function(e){
                console.log('switch');
            });

            $('#sliderDefault').on('switched.zyk.slider', function(e){
                console.log('switched');
            });
        })
    </script>
@endsection