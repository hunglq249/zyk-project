<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/plugins/bootstrap/css/bootstrap.min.css">

    <!-- Zayeki CSS -->
    <link rel="stylesheet" href="/dist/css/zayeki.css">

    <!-- App CSS -->
    <link rel="stylesheet" href="/dist/css/app.css">

    @yield('css')

    <title>@yield('page_title')</title>
</head>

<body>
    <div class="wrapper">
        @include('layouts.admin_header')

        <div class="main-content">
            @include('layouts.admin_navside')

            @yield('view')
        </div>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="/plugins/jquery/jquery-3.4.1.min.js"></script>
    <script src="/plugins/popper/popper.js"></script>
    <script src="/plugins/bootstrap/js/bootstrap.min.js"></script>

    <!-- Zayeki Script -->
    <script src="/dist/js/zayeki.js"></script>
    @yield('js')
</body>

</html>