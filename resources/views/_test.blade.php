<div class="container" style="min-height: 100vh; padding: 3rem 0">
    {{-- <div class="list-items list-switch mb-8" data-view="grid">
        <div class="list-items-control">
            <button class="btn" data-toggle="listview" data-view="list" type="button">
                <i class="fas fa-list"></i>
            </button>
            <button class="btn" data-toggle="listview" data-view="grid" type="button">
                <i class="fas fa-th"></i>
            </button>
        </div>

        <div class="list-items-header">
            <div class="item-row">
                <div class="item-col-1">
                    <p class="p-overline">
                        #
                    </p>
                </div>
                <div class="item-col-1">
                    <p class="p-overline">
                        #
                    </p>
                </div>
            </div>
        </div>

        <div class="list-items-body">
            @for($i=0;$i<6;$i++)
                <div class="item-row">
                    <div class="item-col-1 item-index">
                        <p>
                            {{$i+1}}
                        </p>
                    </div>
                    <div class="item-col-3 item-cover">
                        <p>
                            Cover
                        </p>
                        <div class="mask">
                            <img src="https://images.unsplash.com/photo-1593854152006-6dbc3e036ed8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="Image">
                        </div>
                    </div>
                </div>
            @endfor
        </div>
    </div> --}}

    <div class="test-slider" style="padding: 4rem 0;">
        <div class="zykowl" id="zykowlDefault">
            @for($i = 0; $i < 12; $i++)
                <div style="width: 300px; height: 200px; background-color: blue"></div>
            @endfor
        </div>
    </div>

    <div class="test-popup" style="padding: 4rem 0;">
        <button class="btn btn-outline-default" data-toggle="popup" data-target="#popupDefault">
            Call default popup
        </button>

        <div class="popup fade popup-full" id="popupDefault">
            <div class="popup-dialog">
                <div class="popup-content">
                    <div class="popup-header">
                        <div class="container">
                            <div class="popup-header-left">
                                <h6>Popup</h6>
                                <h6 class="sutitle-sm">
                                    Popup subtitle
                                </h6>
                            </div>

                            <div class="popup-header-right">
                                <button class="btn" data-dismiss="popup" type="button">
                                    <i class="elo el-2x el-close"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="popup-body">
                        <div class="container">
                            <p>Content</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button class="btn btn-outline-default" data-toggle="popup" data-target="#popupWidth50">
            Call default popup 50% width
        </button>

        <div class="popup fade" id="popupWidth50">
            <div class="popup-dialog popup-dialog-50">
                <div class="popup-content">
                    <div class="popup-header">
                        <h6>Popup</h6>

                        <button class="btn" data-dismiss="popup" type="button">
                            <i class="elo el-2x el-close"></i>
                        </button>
                    </div>

                    <div class="popup-body">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac dui ullamcorper, tincidunt metus id, fermentum tellus. Duis a congue nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer hendrerit porta tellus vulputate tempus. Ut aliquam justo et volutpat sollicitudin. Donec a nisl sit amet mi auctor mattis. Nulla ultrices metus non tellus bibendum suscipit. Nulla vestibulum porttitor elit, nec tempus leo tempus laoreet. Pellentesque accumsan odio in lorem volutpat, sed accumsan ipsum euismod. Fusce quis nisi fringilla ex commodo convallis. Fusce eu nisl vel est blandit consequat a vitae tortor. Etiam condimentum pellentesque vehicula.
                        </p>

                        <p>
                            Vivamus vestibulum, arcu in posuere porta, lorem nunc tempor est, ut elementum tellus purus a lorem. Nam id neque nisl. Nulla in sem quam. Integer porttitor dictum sapien. Donec quis sagittis mauris. Nulla a pretium risus. Proin non elit eu augue rutrum tempus. Quisque congue magna vitae tortor aliquet, at rutrum magna pulvinar. Sed tempus mi ac neque efficitur gravida. Duis lacinia imperdiet risus, vestibulum faucibus est volutpat semper. Curabitur posuere augue feugiat consequat finibus. Mauris rutrum in est a interdum. Vivamus accumsan dictum felis, vel tristique massa scelerisque quis. Sed laoreet, enim consectetur feugiat efficitur, risus risus cursus neque, non mattis lorem diam vitae diam. Proin maximus magna eu congue euismod.
                        </p>

                        <p>
                            Morbi nibh arcu, consectetur a lacus at, ultricies tincidunt odio. Nullam libero mauris, condimentum ac turpis non, mattis pulvinar nulla. Nulla feugiat lectus quis sagittis aliquam. Nulla a risus eu odio facilisis auctor. Nulla dolor massa, tristique nec fermentum quis, bibendum vel augue. Suspendisse sapien metus, porttitor non lacus ac, dictum vehicula libero. Suspendisse potenti. Nullam ultricies purus at mauris consequat convallis. Duis maximus mauris id odio auctor venenatis. Morbi nibh dui, dignissim at metus sit amet, consequat semper ipsum. Nullam dapibus dolor a nibh mollis molestie. Nullam a massa facilisis mauris maximus aliquet. Nulla facilisi. Phasellus nec molestie risus. Sed sit amet enim arcu.
                        </p>

                        <p>
                            Aliquam venenatis pellentesque eros, eget vestibulum justo lobortis nec. Integer consequat, nisi nec dictum hendrerit, nisi sem malesuada mi, eu porta ex leo ac nulla. Aliquam id erat pulvinar, dictum eros eu, hendrerit diam. Aenean faucibus sem eget erat mollis vulputate. Vestibulum ut orci metus. Sed neque turpis, tincidunt ac eleifend eget, tincidunt non elit. Sed quis orci eget sem porta tristique. Etiam dictum nunc at quam venenatis aliquet. In finibus hendrerit orci, a elementum sapien sagittis nec. Sed sit amet risus odio. Quisque ac fringilla arcu. Quisque vehicula vitae odio sed egestas. Ut at mollis dolor, ac mattis ex.
                        </p>

                        <p>
                            In non nisl feugiat, auctor nunc vel, sodales ex. Curabitur sed lorem ante. Fusce eu ante neque. Praesent non tellus eget lorem gravida varius. Morbi ut massa ut ligula posuere elementum ut ac turpis. Pellentesque pellentesque fringilla sapien id mattis. Nulla placerat tincidunt malesuada. Mauris a orci mi. In a risus vitae mi tempus pretium ac at nulla. Vivamus ac ante porta nisi mollis volutpat quis ac urna. Phasellus nulla dolor, imperdiet sit amet elit at, dignissim feugiat nibh.
                        </p>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac dui ullamcorper, tincidunt metus id, fermentum tellus. Duis a congue nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer hendrerit porta tellus vulputate tempus. Ut aliquam justo et volutpat sollicitudin. Donec a nisl sit amet mi auctor mattis. Nulla ultrices metus non tellus bibendum suscipit. Nulla vestibulum porttitor elit, nec tempus leo tempus laoreet. Pellentesque accumsan odio in lorem volutpat, sed accumsan ipsum euismod. Fusce quis nisi fringilla ex commodo convallis. Fusce eu nisl vel est blandit consequat a vitae tortor. Etiam condimentum pellentesque vehicula.
                        </p>

                        <p>
                            Vivamus vestibulum, arcu in posuere porta, lorem nunc tempor est, ut elementum tellus purus a lorem. Nam id neque nisl. Nulla in sem quam. Integer porttitor dictum sapien. Donec quis sagittis mauris. Nulla a pretium risus. Proin non elit eu augue rutrum tempus. Quisque congue magna vitae tortor aliquet, at rutrum magna pulvinar. Sed tempus mi ac neque efficitur gravida. Duis lacinia imperdiet risus, vestibulum faucibus est volutpat semper. Curabitur posuere augue feugiat consequat finibus. Mauris rutrum in est a interdum. Vivamus accumsan dictum felis, vel tristique massa scelerisque quis. Sed laoreet, enim consectetur feugiat efficitur, risus risus cursus neque, non mattis lorem diam vitae diam. Proin maximus magna eu congue euismod.
                        </p>

                        <p>
                            Morbi nibh arcu, consectetur a lacus at, ultricies tincidunt odio. Nullam libero mauris, condimentum ac turpis non, mattis pulvinar nulla. Nulla feugiat lectus quis sagittis aliquam. Nulla a risus eu odio facilisis auctor. Nulla dolor massa, tristique nec fermentum quis, bibendum vel augue. Suspendisse sapien metus, porttitor non lacus ac, dictum vehicula libero. Suspendisse potenti. Nullam ultricies purus at mauris consequat convallis. Duis maximus mauris id odio auctor venenatis. Morbi nibh dui, dignissim at metus sit amet, consequat semper ipsum. Nullam dapibus dolor a nibh mollis molestie. Nullam a massa facilisis mauris maximus aliquet. Nulla facilisi. Phasellus nec molestie risus. Sed sit amet enim arcu.
                        </p>

                        <p>
                            Aliquam venenatis pellentesque eros, eget vestibulum justo lobortis nec. Integer consequat, nisi nec dictum hendrerit, nisi sem malesuada mi, eu porta ex leo ac nulla. Aliquam id erat pulvinar, dictum eros eu, hendrerit diam. Aenean faucibus sem eget erat mollis vulputate. Vestibulum ut orci metus. Sed neque turpis, tincidunt ac eleifend eget, tincidunt non elit. Sed quis orci eget sem porta tristique. Etiam dictum nunc at quam venenatis aliquet. In finibus hendrerit orci, a elementum sapien sagittis nec. Sed sit amet risus odio. Quisque ac fringilla arcu. Quisque vehicula vitae odio sed egestas. Ut at mollis dolor, ac mattis ex.
                        </p>

                        <p>
                            In non nisl feugiat, auctor nunc vel, sodales ex. Curabitur sed lorem ante. Fusce eu ante neque. Praesent non tellus eget lorem gravida varius. Morbi ut massa ut ligula posuere elementum ut ac turpis. Pellentesque pellentesque fringilla sapien id mattis. Nulla placerat tincidunt malesuada. Mauris a orci mi. In a risus vitae mi tempus pretium ac at nulla. Vivamus ac ante porta nisi mollis volutpat quis ac urna. Phasellus nulla dolor, imperdiet sit amet elit at, dignissim feugiat nibh.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <button class="btn btn-outline-default" data-toggle="popup" data-target="#popupWidth75">
            Call default popup 75% width
        </button>

        <div class="popup fade" id="popupWidth75">
            <div class="popup-dialog popup-dialog-75">
                <div class="popup-content">
                    <div class="popup-header">
                        <h6>Popup</h6>

                        <button class="btn" data-dismiss="popup" type="button">
                            <i class="elo el-2x el-close"></i>
                        </button>
                    </div>

                    <div class="popup-body">
                        <p>Content</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="test-calendar">
        <div class="row">
            <div class="col-md-6">
                <div class="calendar" id="testCalendar"></div>
            </div>

            <div class="col-md-6">
                <div id="eventAppend">
                    <h5></h5>
                    

                </div>
            </div>

            <div class="col-md-12">
                <div class="calendar" id="testCalendar2"></div>
            </div>
        </div>
    </div>

    <div class="test mt-8 mb-8 mx-auto w-50">
        <div class="dropdown dropright mb-4">
            <button class="btn btn-primary"
                data-toggle="dropdown"
                data-offset="16, 32">
                Button dropdown offset [16, 32]
            </button>

            <div class="dropdown-menu">
                <a href="#" class="dropdown-item" onclick="console.log('1')">
                    Dropdown item #1
                </a>
                <a href="#" class="dropdown-item dropdown-item-between">
                    Dropdown item #2
                    <i class="elo el-lg el-caret-right"></i>
                </a>
            </div>
        </div>

        <div class="dropdown dropright mb-4">
            <button class="btn btn-success dropdown-toggle"
                data-toggle="dropdown">
                Button dropdown
            </button>

            <div class="dropdown-menu">
                <a href="#" class="dropdown-item" onclick="console.log('2')">
                    Dropdown item #1
                </a>
                <a href="#" class="dropdown-item dropdown-item-between">
                    Dropdown item #2
                    <i class="elo el-lg el-caret-right"></i>
                </a>
            </div>
        </div>

        <div class="dropdown mb-4">
            <button class="btn btn-warning disabled"
                data-toggle="dropdown" disabled>
                Button dropdown
            </button>

            <div class="dropdown-menu">
                <a href="#" class="dropdown-item" onclick="console.log('3')">
                    Dropdown item #1
                </a>
                <a href="#" class="dropdown-item dropdown-item-between">
                    Dropdown item #2
                    <i class="elo el-lg el-caret-right"></i>
                </a>
            </div>
        </div>

        <div class="dropdown dropup mb-4">
            <button class="btn btn-warning dropdown-toggle"
                data-toggle="dropdown">
                Form dropdown
            </button>

            <div class="dropdown-menu dropdown-menu-right" style="width: 500px">
                <div class="form-wrapper" style="width: 100%; padding: 0.75rem">
                    <form action="" autocomplete="off">
                        <div class="row">
                            <div class="form-group col-md-4">
                                <label>Name</label>
                                <input type="text" class="form-control" placeholder="Name">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Email</label>
                                <input type="email" class="form-control" placeholder="Email">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Gender</label>
                                <select class="form-control">
                                    <option value="0">Undefined</option>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                </select>
                            </div>
                            <div class="form-group col-md-12">
                                <button class="btn btn-primary" type="submit">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        @for($i=0;$i<3;$i++)
            <div class="col-md-4">
                <div class="card @if($i==2) card-no-shadow @endif">
                    <div class="card-header">
                        <div class="mask">
                            <img src="https://images.unsplash.com/photo-1593854152006-6dbc3e036ed8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="Image">
                        </div>
                    </div>

                    <div class="card-body">
                        <h6 class="subtitle-md">
                            This is Card Title
                        </h6>

                        <p>
                            This is Card Praragraph
                        </p>
                    </div>
                </div>
            </div>
        @endfor
    </div>

    <div class="list-table-responsive" style="margin-bottom: 2rem">
        <div class="list-items list-table list-table-borderless">
            <div class="list-items-header">
                <div class="item-row">
                    <div class="item-col-1">
                        <p class="p-overline">
                            #
                        </p>
                    </div>
                    <div class="item-col-2">
                        <p class="p-overline">
                            Title 1
                        </p>
                    </div>
                    <div class="item-col-2">
                        <p class="p-overline">
                            Somthing more
                        </p>
                    </div>
                    <div class="item-col-3">
                        <div class="item-row">
                            <div class="item-col-12">
                                <p class="p-overline text-center">
                                    Title 2
                                </p>
                            </div>
                            <div class="item-col">
                                <p class="p-overline text-center">
                                    Option 1
                                </p>
                            </div>
                            <div class="item-col">
                                <p class="p-overline text-center">
                                    Option 2
                                </p>
                            </div>
                            <div class="item-col">
                                <p class="p-overline text-center">
                                    Option 3
                                </p>
                            </div>
                            <div class="item-col">
                                <p class="p-overline text-center">
                                    Option 4
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="item-col-2 item-before-actions">
                        <p class="p-overline">
                            Title 3
                        </p>
                    </div>
                    <div class="item-col-2 item-actions"></div>
                </div>
            </div>
            <div class="list-items-body">
                @for($i=0;$i<15;$i++)
                    <div class="item-row">
                        <div class="item-col-1">
                            <p>
                                {{$i+1}}
                            </p>
                        </div>
                        <div class="item-col-2">
                            <div class="d-flex align-items-center">
                                <h6 class="subtitle-md">
                                    Title 1
                                </h6>
                            </div>
                        </div>
                        <div class="item-col-2">
                            <div class="d-flex align-items-center">
                                <p>
                                    Title {{$i+1}}
                                </p>
                                <a href="#" style="margin-left: 0.5rem; font-size: 0.875rem">
                                    <i class="elo el-lg el-circle"></i>
                                </a>
                            </div>
                        </div>
                        <div class="item-col-3">
                            <div class="item-row">
                                <div class="item-col">
                                    <p class="text-center">
                                        Option 1
                                    </p>
                                </div>
                                <div class="item-col">
                                    <p class="text-center">
                                        Option 2
                                    </p>
                                </div>
                                <div class="item-col">
                                    <p class="text-center">
                                        Option 3
                                    </p>
                                </div>
                                <div class="item-col">
                                    <p class="text-center">
                                        Option 4
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="item-col-2 item-before-actions">
                            <p>
                                Title 3
                            </p>
                        </div>
                        <div class="item-col-2 item-actions">
                            <div class="btn-group">
                                <button class="btn btn-sm" type="button">
                                    <i class="elo el-lg el-pencil-alt"></i>
                                </button>
                                <button class="btn btn-sm" type="button">
                                    <i class="elo el-lg el-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                @endfor
            </div>
        </div>
    </div>

    <div class="list-items list-tree" style="margin-bottom: 2rem">
        <div class="list-items-header">
            <div class="item-row">
                <div class="item-col-7 item-wrapper-control">
                    <p class="p-overline">
                        Title
                    </p>
                </div>
                <div class="item-col-4">
                    <p class="p-overline">
                        Description
                    </p>
                </div>
                <div class="item-col-1"></div>
            </div>
        </div>

        <div class="list-items-body">
            @for($i=0;$i<13;$i++)
            <div class="item-row">
                <div class="item-col-7 item-wrapper-control">
                    <h6 class=" subtitle-md">
                        <a href="#" data-toggle="list-tree" data-level="1">
                            <i class="elo el-lg el-caret-right"></i>
                        </a>
                        <a href="#">
                            Title I
                        </a>
                    </h6>
                </div>
                <div class="item-col-4">
                    <p>
                        Description
                    </p>
                </div>
                <div class="item-col-1 item-actions">
                    <div class="form-check-group">
                        <div class="form-check">
                            <input type="radio">
                            <label data-toggle="check" data-type="radio">
                                <i class="elo el-lg el-circle"></i>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="item-wrapper item-wrapper-1">
                    <div class="item-row">
                        <div class="item-col-7 item-wrapper-control">
                            <h6 class=" subtitle-md">
                                <a href="#" data-toggle="list-tree" data-level="2">
                                    <i class="elo el-lg el-caret-right"></i>
                                </a>
                                <a href="#">
                                    Title II
                                </a>
                            </h6>
                        </div>
                        <div class="item-col-4">
                            <p>
                                Description
                            </p>
                        </div>
                        <div class="item-col-1 item-actions">
                            <div class="form-check-group">
                                <div class="form-check">
                                    <input type="radio">
                                    <label data-toggle="check" data-type="radio">
                                        <i class="elo el-lg el-circle"></i>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="item-wrapper item-wrapper-2">
                            <div class="item-row">
                                <div class="item-col-7 item-wrapper-control">
                                    <h6 class=" subtitle-md">
                                        <a href="#" data-toggle="list-tree" data-level="3">
                                            <i class="elo el-lg el-caret-right"></i>
                                        </a>
                                        <a href="#">
                                            Title III
                                        </a>
                                    </h6>
                                </div>
                                <div class="item-col-4">
                                    <p>
                                        Description
                                    </p>
                                </div>
                                <div class="item-col-1 item-actions">
                                    <div class="form-check-group">
                                        <div class="form-check">
                                            <input type="radio">
                                            <label data-toggle="check" data-type="radio">
                                                <i class="elo el-lg el-circle"></i>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="item-wrapper item-wrapper-3">
                                    <div class="item-row">
                                        <div class="item-col-7 item-wrapper-control">
                                            <h6 class=" subtitle-md">
                                                Title IV
                                            </h6>
                                        </div>
                                        <div class="item-col-4">
                                            <p>
                                                Description
                                            </p>
                                        </div>
                                        <div class="item-col-1 item-actions">
                                            <div class="form-check-group">
                                                <div class="form-check">
                                                    <input type="radio">
                                                    <label data-toggle="check" data-type="radio">
                                                        <i class="elo el-lg el-circle"></i>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @endfor
        </div>
    </div>

    <div class="accordion" id="accordionExample">
        @for($i=0;$i<3;$i++)
            <div class="card">
                <div class="card-header">
                    <a href="#" data-toggle="collapse" data-target="#collapse{{$i+1}}">
                        <h6>
                            Heading {{$i+1}}
                        </h6>

                        <i class="elo el-lg el-caret-right @if($i==0) rotated @endif"></i>
                    </a>
                </div>

                <div class="collapse @if($i==0) show @endif" id="collapse{{$i+1}}" data-parent="#accordionExample" data-show="{{ $i==0 ? 'true' : 'false' }}">
                    <div class="card-body">
                        <p class="mb-4">
                            Sed lacinia eleifend aliquet. Cras ac accumsan ipsum, nec imperdiet eros. Praesent diam nulla, cursus eget congue in, malesuada vitae nulla. Curabitur tempus nunc eget odio tempor accumsan et nec nibh. Fusce neque dolor, condimentum in massa et, sagittis ornare orci. Donec consectetur eu ex vitae egestas. Morbi orci sem, porta id porttitor vel, mattis a mi. Praesent et erat condimentum, feugiat purus quis, porta nunc. Donec vel consectetur metus. Nulla sed scelerisque risus. Pellentesque quis dapibus lorem, eget suscipit ipsum. Vestibulum pretium dui sed molestie dapibus. Quisque lobortis mi auctor dui suscipit porta. Nulla facilisi.
                        </p>
                        <p class="mb-4">
                            Sed lacinia eleifend aliquet. Cras ac accumsan ipsum, nec imperdiet eros. Praesent diam nulla, cursus eget congue in, malesuada vitae nulla. Curabitur tempus nunc eget odio tempor accumsan et nec nibh. Fusce neque dolor, condimentum in massa et, sagittis ornare orci. Donec consectetur eu ex vitae egestas. Morbi orci sem, porta id porttitor vel, mattis a mi. Praesent et erat condimentum, feugiat purus quis, porta nunc. Donec vel consectetur metus. Nulla sed scelerisque risus. Pellentesque quis dapibus lorem, eget suscipit ipsum. Vestibulum pretium dui sed molestie dapibus. Quisque lobortis mi auctor dui suscipit porta. Nulla facilisi.
                        </p>
                    </div>
                </div>
            </div>
        @endfor
    </div>
</div>
