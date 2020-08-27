<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- ZAYEKI CSS -->
        <link rel="stylesheet" href="{{ asset('dist/css/zayeki.min.css') }}">

        @yield('css')

        <title>GENERATE DEFAULT CODE</title>
    </head>

    <body>
        @yield('view')

        <!-- JQUERY JS -->
        <script src="{{ asset('plugins/jquery/jquery-3.4.1.min.js') }}"></script>
        
        <!-- POPPER JS -->
        <script src="https://unpkg.com/@popperjs/core@2"></script>

        <!-- ZAYEKI JS -->
        <script src="{{ asset('dist/js/zayeki.js') }}"></script>

        @yield('js')
    </body>
</html>