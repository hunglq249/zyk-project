<nav class="nav-side">
    <a href="/components/alerts" class="nav-side-item @if(Request::segment(1) == 'components' && Request::segment(2) == 'alerts') active @endif">
        Alerts
    </a>

    <a href="/components/buttons" class="nav-side-item @if(Request::segment(1) == 'components' && Request::segment(2) == 'buttons') active @endif">
        Buttons
    </a>

    <a href="/components/badges" class="nav-side-item @if(Request::segment(1) == 'components' && Request::segment(2) == 'badges') active @endif">
        Badges
    </a>

    <a href="/components/header" class="nav-side-item @if(Request::segment(1) == 'components' && Request::segment(2) == 'header') active @endif">
        Header
    </a>

    <a href="/components/list-items" class="nav-side-item @if(Request::segment(1) == 'components' && Request::segment(2) == 'list-items') active @endif">
        List items
    </a>

    <a href="/components/popup" class="nav-side-item @if(Request::segment(1) == 'components' && Request::segment(2) == 'popup') active @endif">
        Popup
    </a>

    <a href="/components/theme" class="nav-side-item @if(Request::segment(1) == 'components' && Request::segment(2) == 'theme') active @endif">
        Theme
    </a>

    <a href="/components/type" class="nav-side-item @if(Request::segment(1) == 'components' && Request::segment(2) == 'type') active @endif">
        Typography
    </a>
</nav>