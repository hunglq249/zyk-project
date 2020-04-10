@extends('layouts.client')

@section('page_title')
    Guide
@endsection

@section('view')
    <div class="container-fluid">
        <div class="section section-guide">
            <div class="section-header">
                <h3>Guide</h3>
            </div>

            <div class="section-body">
                <button class="btn btn-success" id="buttonSuccess" type="button" data-guide="true" data-guide-id="1">
                    Button success
                </button>

                <button class="btn btn btn-primary" id="buttonPrimary" type="button" data-guide="true" data-guide-id="2">
                    Button primary
                </button>

                <button class="btn btn-default" type="button"
                    style="position: absolute; top: 50%; left: 300px; z-index: 1">
                    Button default
                </button>

                <button class="btn btn-link" id="buttonLink" type="button"
                    style="position: absolute; bottom: 35%; right: 200px; z-index: 1">
                    Button link
                </button>

                <p class="p-sm"
                    style="margin-left: 100px; margin-top: 50px">
                    Ut mattis pharetra mi, sit amet rutrum tellus interdum sed. Nam laoreet pretium mollis. Curabitur accumsan diam est, eget dignissim elit egestas mollis. Maecenas vel condimentum nulla. Vestibulum non congue urna, in auctor metus. Curabitur vestibulum pellentesque mauris nec commodo. Aenean elementum convallis sapien, sit amet vestibulum nisi tincidunt et. Nam blandit tortor risus, eget pellentesque turpis eleifend vitae. Mauris facilisis odio id blandit hendrerit. Ut eu tortor fermentum, tristique dui at, condimentum urna.
                </p>

                <p class="p-sm" 
                    style="position: absolute; top: 75%; left: 500px; z-index: 13">
                    Ut mattis pharetra mi, sit amet rutrum tellus interdum sed. Nam laoreet pretium mollis. Curabitur accumsan diam est, eget dignissim elit egestas mollis. Maecenas vel condimentum nulla. Vestibulum non congue urna, in auctor metus. Curabitur vestibulum pellentesque mauris nec commodo. Aenean elementum convallis sapien, sit amet vestibulum nisi tincidunt et. Nam blandit tortor risus, eget pellentesque turpis eleifend vitae. Mauris facilisis odio id blandit hendrerit. Ut eu tortor fermentum, tristique dui at, condimentum urna.
                </p>
            </div>
        </div>
    </div>
@endsection