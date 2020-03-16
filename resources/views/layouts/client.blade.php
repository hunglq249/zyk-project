<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/plugins/bootstrap/css/bootstrap.min.css">

    <!-- Font Awesome CSS -->
    <link rel="stylesheet" href="/plugins/fa/css/all.min.css">

    <!-- Zayeki CSS -->
    <link rel="stylesheet" href="/dist/css/zayeki.css">

    <!-- Style CSS -->
    <link rel="stylesheet" href="/dist/css/style.css">

    @yield('css')

    <title>@yield('page_title')</title>
</head>

<body class="overflow-y">
    @include('layouts.header')

    <div class="wrapper">
        <div class="main-content">
            @include('layouts.navside')

            @yield('view')
        </div>
    </div>

    @include('layouts.footer')

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="/plugins/jquery/jquery-3.4.1.min.js"></script>
    <script src="/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Common functions -->
    <script src="/dist/js/common.js"></script>

    <!-- Zayeki Script -->
    <script src="/dist/js/zayeki.js"></script>

    @yield('js')
</body>

</html>