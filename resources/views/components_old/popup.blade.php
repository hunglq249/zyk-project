@extends('layouts.client')

@section('page_title')
    Popup
@endsection

@section('view')
    <div class="container-fluid">
        <div class="section section-popup">
            <div class="section-header">
                <h3>Popup</h3>
            </div>

            <div class="section-body">
                <div>
                    <div class="exp-wrapper" style="width: 600px; height: 600px; background-color: lightgray; display: flex; justify-content: center; align-items: center;">
                        <h6>Example Wrapper | This is the wrapper has popup inside</h6>

                        <div class="popup fade focus" id="popupDefault">
                            <div class="popup-dialog">
                                <div class="popup-content">
                                    <div class="popup-header">
                                        <h5>Popup Title</h5>
                                    </div>

                                    <div class="popup-body">
                                        <p>Popup Content</p>
                                    </div>

                                    <div class="popup-footer">
                                        <button class="btn" type="button" data-dismiss="popup">
                                            Cancel
                                        </button>

                                        <button class="btn btn-primary" type="button">
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="document">
                        <button class="btn btn-default" data-toggle="popup" data-target="#popupDefault">
                            Call Default Popup on Example Wrapper
                        </button>
                    </div>
                </div>

                <div>
                    <div class="exp-wrapper" style="width: 600px; height: 600px; background-color: lightgray; display: flex; justify-content: center; align-items: center;">
                        <h6>Scrollable Popup</h6>

                        <div class="popup" id="popupScroll" data-keyboard="true">
                            <div class="popup-dialog">
                                <div class="popup-content">
                                    <div class="popup-header">
                                        <h5>Popup Title</h5>
                                    </div>

                                    <div class="popup-body overflow-y">
                                        <p>Morbi congue bibendum massa et tincidunt. Ut vel tellus urna. Nam dictum felis vitae elit placerat imperdiet. Phasellus iaculis nec arcu sit amet scelerisque. Sed sed sapien et erat sagittis egestas. Curabitur eu turpis id dolor aliquam ultrices. Morbi eget purus eu orci sodales volutpat vitae quis odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris augue odio, blandit vel ultricies in, efficitur ut risus. In eget aliquet elit, eget posuere lorem.</p>
                                        <p>Ut ut gravida odio, vitae pharetra elit. Donec accumsan aliquet dictum. Vivamus hendrerit accumsan eros id pharetra. Aenean justo ex, gravida a facilisis quis, feugiat vitae lectus. Vestibulum bibendum pellentesque ex. Nunc in ipsum dapibus, bibendum eros eu, interdum ligula. Suspendisse at risus turpis. Pellentesque bibendum tristique posuere. Aliquam sit amet sodales justo, et pretium nulla.</p>
                                        <p>Mauris vitae dui vitae sem ultricies auctor. Aliquam aliquet imperdiet dolor, eu maximus leo feugiat sit amet. Donec id efficitur orci. Mauris ut lacus a nibh molestie consequat. Pellentesque interdum, tellus ac tempor dignissim, purus dolor pulvinar est, in consectetur dui turpis non purus. Donec eu nulla ante. Maecenas sit amet consequat diam.</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed diam eget erat dictum facilisis eget non justo. Donec ac sem in justo vehicula elementum. Nam nec ex facilisis, lacinia mauris quis, sagittis augue. Quisque tincidunt vel ex quis commodo. Suspendisse rutrum vestibulum leo quis condimentum. Fusce consectetur, sem mollis elementum feugiat, elit velit placerat nisl, eu vestibulum mi diam eu ex. Curabitur sodales arcu magna, ut malesuada dolor congue at. Quisque non tellus eget augue commodo faucibus. Sed aliquam mi lectus, et gravida purus malesuada ut. Cras non volutpat nulla. Nunc leo ante, vestibulum consectetur nisl ac, mollis tincidunt dolor. Morbi blandit nisl at arcu facilisis semper. Ut maximus leo ut ante condimentum, nec auctor felis eleifend. Morbi et nisl vel purus egestas tristique sit amet vel libero. Suspendisse vel rhoncus velit.</p>
                                        <p>Nullam sit amet fringilla neque. Sed dictum, nibh quis pharetra porta, dui lectus vestibulum ipsum, in imperdiet diam ipsum id lectus. Donec nec tempor est. Curabitur porttitor tempor justo, ut ornare nisl ultrices eu. Proin pellentesque, ex id tempor blandit, lectus magna aliquet mauris, vel ultricies turpis tellus at lectus. Duis eu libero magna. Donec a hendrerit ipsum, gravida ullamcorper diam. Quisque metus nulla, eleifend sit amet placerat sed, feugiat sit amet justo. Vivamus ac facilisis arcu, in luctus diam. Nam mollis posuere enim, sit amet elementum lacus dictum non. Proin id dolor quis diam malesuada tincidunt et non magna.</p>
                                    </div>

                                    <div class="popup-footer">
                                        <button class="btn" type="button" data-dismiss="popup">
                                            Cancel
                                        </button>

                                        <button class="btn btn-primary" type="button">
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="document">
                        <button class="btn btn-default" data-toggle="popup" data-target="#popupScroll">
                            Call Scrollable Popup
                        </button>
                    </div>
                </div>

                <div>
                    <div class="exp-wrapper" style="width: 600px; height: 600px; background-color: lightgray; display: flex; justify-content: center; align-items: center;">
                        <h6>Popup with 75% width</h6>

                        <button class="btn btn-default" data-toggle="popup" data-target="#popup75Width">
                            Call Popup
                        </button>

                        <div class="popup focus" id="popup75Width">
                            <div class="popup-dialog popup-dialog-75">
                                <div class="popup-content">
                                    <div class="popup-header">
                                        <h5>Popup 75% width</h5>
                                    </div>

                                    <div class="popup-body overflow-y">
                                        <p>Morbi congue bibendum massa et tincidunt. Mauris augue odio, blandit vel ultricies in, efficitur ut risus. In eget aliquet elit, eget posuere lorem.</p>
                                    </div>

                                    <div class="popup-footer">
                                        <button class="btn" type="button" data-dismiss="popup">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="exp-wrapper" style="width: 600px; height: 600px; background-color: lightgray; display: flex; justify-content: center; align-items: center;">
                        <button class="btn btn-default" data-toggle="popup" data-target="#popupTop">
                            Call Popup Top
                        </button>

                        <button class="btn btn-default" data-toggle="popup" data-target="#popupBottom">
                            Call Popup Bottom
                        </button>

                        <div class="popup fade focus" id="popupTop">
                            <div class="popup-dialog popup-dialog-75 popup-dialog-top">
                                <div class="popup-content">
                                    <div class="popup-header">
                                        <h5>Popup Top</h5>
                                    </div>

                                    <div class="popup-footer">
                                        <button class="btn" type="button" data-dismiss="popup">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="popup fade focus" id="popupBottom">
                            <div class="popup-dialog popup-dialog-75 popup-dialog-bottom">
                                <div class="popup-content">
                                    <div class="popup-header">
                                        <h5>Popup Bottom</h5>
                                    </div>

                                    <div class="popup-footer">
                                        <button class="btn" type="button" data-dismiss="popup">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h6>Even Popup can call within an element. It means popup will have full-screen size of window</h6>
                    <button class="btn btn-primary" data-toggle="popup" data-target="#popupFullScreen">
                        Call full-screen popup
                    </button>
                </div>

                <div class="popup fade focus" id="popupFullScreen">
                    <div class="popup-dialog">
                        <div class="popup-content">
                            <div class="popup-header">
                                <h5>Popup full-screen</h5>
                            </div>

                            <div class="popup-footer">
                                <button class="btn" type="button" data-dismiss="popup">
                                    Cancel
                                </button>
                            </div>
                        </div>
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

        })
    </script>
@endsection
