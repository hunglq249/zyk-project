/*
=========================================================
ZYK SCRIPTS

Author: hungluong
=========================================================
*/

/*
=========================================================
ZYK GLOBAL VARIABLES
=========================================================
*/

const ZYK_DATA_KEY = 'zyk';

/*
=========================================================
UTIL
=========================================================
*/

const zykKeys = {
    escapeKey: 27
};

const zykVar = {
    calendarLang: {
        en: {
            today: 'Today',

            daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            daysOfWeekShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            daysOfWeekLetters: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],

            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

            views: ['month', 'week', 'day']
        },
        vi: {
            today: 'Hôm nay',

            daysOfWeek: ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'],
            daysOfWeekShort: ['Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'CN'],
            daysOfWeekLetters: ['Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'CN'],

            months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            monthsShort: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', '12'],

            views: ['Tháng', 'Tuần', 'Ngày']
        }
    },
    basicLang: {
        en: {
            next: 'Next',
            prev: 'Prev'
        },
        vi: {
            next: 'Next',
            prev: 'Prev'
        }
    }
};

const zykApp = {
    typeOf(obj) {
        return {}.toString
            .call(obj)
            .match(/\s([a-z]+)/i)[1]
            .toLowerCase();
    },

    configSpread(source) {
        let obj = [];
        for (let i = 0; i < arguments.length; i++) {
            let sourceArg = arguments[i] != null ? arguments[i] : {};

            if (this.typeOf(sourceArg) == 'object') {
                obj.push(sourceArg);
            }
        }

        source = obj.reduce(function (r, c) {
            return Object.assign(r, c);
        }, {});

        return source;
    },

    bodyBlock(option) {
        if (option) {
            $('body').addClass('overflow-on');
        } else {
            $('body').removeClass('overflow-on');
        }
    },

    checkPopper() {
        let hasPopper = false;

        if (typeof Popper == 'object') {
            hasPopper = true;
        }

        if (!hasPopper) {
            throw new TypeError('Require Popper js');
        }
    }
};

/*
=========================================================
CALENDAR
=========================================================
*/
class Calendar {
    constructor(target, options) {
        let defaultOptions = {
            view: 'month',
            lang: 'en',
            bordered: false,

            header: {
                controls: ['today'],
                title: true,
                views: ['month', 'week', 'day']
            },

            body: {
                tableHeader: {
                    type: 'daysOfWeek'
                },
                tableBody: {
                    disablePast: false
                }
            },

            buttonClass: {
                default: 'btn btn-sm btn-default',
                active: 'btn btn-sm btn-primary'
            },

            icons: {
                prev: 'els el-lg el-caret-left',
                next: 'els el-lg el-caret-right'
            },

            dayRatio: 0.5,
            dayFormat: 'd/m/y',

            date: null,
            month: null,
            year: null,

            events: [],
            eventOnClick: false,
            eventOnClickNext: false,
            eventOnClickPrev: false,
            eventOnClickToday: false
        };

        this.config = {
            ...defaultOptions,
            ...options
        };

        this.date = new Date();
        this.currentDate = this.getDate();
        this.currentMonth = this.getMonth();
        this.currentYear = this.getYear();

        this.contentText = zykVar.calendarLang[this.config.lang];

        this.target = target;

        this.render(target);
    }

    render(element) {
        const _this = this;

        // RESET CALENDAR INNER HTML
        $(element).html('');

        // ADD BORDER FOR CALENDAR
        if (_this.config.bordered) {
            $(element).addClass('calendar-bordered');
        }

        // APPEND CALENDAR HEADER
        if (_this.config.header && _this.config.header != '') {
            $(element).append('<div class="calendar-header"></div>');
            $(element).find('.calendar-header').html(_this.getCalendarHeader());
        }

        // APPEND CALENDAR BODY
        let calendarBodyExtra = '';

        if (this.config.view == 'week') {
            calendarBodyExtra = 'calendar-body-week';
        } else if (this.config.view == 'day') {
            calendarBodyExtra = 'calendar-body-day';
        }

        $(element).append(`<div class="calendar-body ${calendarBodyExtra} overflow-y"></div>`);
        $(element).find('.calendar-body').html(_this.getCalendarBody());

        this.setTableColSize();

        this.getEvents();

        this.initActions();
    }

    getYear() {
        let year = this.config.year == null ? this.date.getFullYear() : this.config.year;

        return year;
    }

    getPrevYear() {
        let year = this.currentYear;

        let prevYear = year - 1;

        return prevYear;
    }

    getNextYear() {
        let year = this.currentYear;

        let nextYear = year + 1;

        return nextYear;
    }

    getMonth() {
        let month = this.config.month == null ? this.date.getMonth() : this.config.month;

        return month;
    }

    getPrevMonth() {
        let prevMonth;

        let currentMonth = this.currentMonth;

        if (currentMonth > 0) {
            prevMonth = currentMonth - 1;

            return prevMonth;
        } else {
            prevMonth = 11;

            return prevMonth;
        }
    }

    getNextMonth() {
        let nextMonth;

        let currentMonth = this.currentMonth;

        if (currentMonth < 11) {
            nextMonth = currentMonth + 1;

            return nextMonth;
        } else {
            nextMonth = 0;

            return nextMonth;
        }
    }

    getDate() {
        let date = this.config.date == null ? this.date.getDate() : this.config.date;

        return date;
    }

    getToday(date, month, year) {
        const _this = this;

        if (date == this.date.getDate() && month == this.date.getMonth() && year == this.date.getFullYear()) {
            return true;
        } else {
            return false;
        }
    }

    getDaysInMonth(month, year) {
        return 32 - new Date(year, month, 32).getDate();
    }

    getDaysInWeek(date = this.currentDate, month = this.currentMonth, year = this.currentYear) {
        const _this = this;

        let daysInWeek = [];

        let dayInWeek;

        if (date > _this.getDaysInMonth(month, year)) {
            date = date - _this.getDaysInMonth(month, year);
        }

        if (new Date(`${year}-${month + 1}-${date}`).getDay() - 1 < 0) {
            dayInWeek = 6;
        } else {
            dayInWeek = new Date(`${year}-${month + 1}-${date}`).getDay() - 1;
        }

        for (let i = 0; i < 7; i++) {
            let offset = date - dayInWeek;

            //daysInWeek[i] = i + offset

            if (i + offset > _this.getDaysInMonth(month, year)) {
                daysInWeek[i] = i + offset - _this.getDaysInMonth(month, year);
            } else {
                daysInWeek[i] = i + offset;
            }
        }

        return daysInWeek;
    }

    getFirstDay(month, year) {
        return new Date(year, month).getDay();
    }

    getCalendarHeader() {
        const _this = this;

        let calendarHeader = '';

        if (_this.config.header && _this.config.header != '') {
            $.each(_this.config.header, (key) => {
                calendarHeader += `
                    <div class="calendar-header-${key}">
                        ${_this.getCalendarHeaderElements(key)}
                    </div>
                `;
            });
        }

        return calendarHeader;
    }

    getCalendarHeaderElements(part) {
        const _this = this;

        let partElements = ``;

        if (part == 'controls') {
            if (_this.config.header && _this.config.header != '') {
                if (_this.config.header.controls.indexOf('today') > -1) {
                    partElements += `
                        <button class="${_this.config.buttonClass.default} btn-calendar-today" type="button">
                            ${_this.contentText.today}
                        </button>
                    `;
                }
            } else {
                throw new TypeError('Calendar configs header controls failed!');
            }
        } else if (part == 'title') {
            if (_this.date != null || _this.config.header.title) {
                if (_this.config.view == 'month') {
                    partElements += `
                        <button class="${_this.config.buttonClass.default} btn-calendar-prev" type="button">
                            <i class="${_this.config.icons.prev}"></i>
                        </button>
                    `;

                    if (_this.config.view == 'month') {
                        let monthpickerButtons = '';

                        $.each(_this.contentText.monthsShort, function (key, value) {
                            monthpickerButtons += `
                                <button class="${_this.config.buttonClass.default} btn-calendar-monthpicker" data-month="${key}" type="button">
                                    ${value}
                                </button>
                            `;
                        });
                        partElements += `
                            <div class="dropdown">
                                <button class="${_this.config.buttonClass.default}" data-toggle="dropdown" data-placement="bottom" type="button">
                                    <h6>
                                        ${_this.contentText.months[_this.currentMonth]} ${_this.currentYear}
                                    </h6>
                                </button>

                                <div class="dropdown-menu">
                                    <div class="calendar-monthpicker-wrapper">
                                        <div class="calendar-monthpicker-header">
                                            <button class="${_this.config.buttonClass.default} btn-calendar-monthpicker-year-prev" type="button">
                                                <i class="els el-lg el-caret-left"></i>
                                            </button>

                                            <h6 class="subtitle-md">
                                                ${_this.currentYear}
                                            </h6>

                                            <button class="${_this.config.buttonClass.default} btn-calendar-monthpicker-year-next" type="button">
                                                <i class="els el-lg el-caret-right"></i>
                                            </button>
                                        </div>
                                        <div class="calendar-monthpicker-body">
                                            ${monthpickerButtons}
                                        </div>
                                    </div>

                                    <input type="hidden" value="${_this.currentMonth}">
                                    <input type="hidden" value="${_this.currentYear}">
                                </div>
                            </div>
                        `;
                    } else {
                        partElements += `
                            <h6>
                                ${_this.contentText.months[_this.currentMonth]} ${_this.currentYear}
                            </h6>
                        `;
                    }

                    partElements += `
                        <button class="${_this.config.buttonClass.default} btn-calendar-next" type="button">
                            <i class="${_this.config.icons.next}"></i>
                        </button>
                    `;
                } else if (_this.config.view == 'week') {
                    if (_this.config.dayFormat == 'd/m/y') {
                        partElements += `
                            <h6>${_this.getDaysInWeek()[0]} - ${_this.getDaysInWeek()[6]} ${_this.contentText.months[_this.currentMonth]} ${_this.currentYear}</h6>
                        `;
                    } else if (_this.config.dayFormat == 'm/d/y') {
                        partElements += `
                            <h6>${_this.contentText.months[_this.currentMonth]} ${_this.getDaysInWeek()[0]} - ${_this.getDaysInWeek()[6]}, ${_this.currentYear}</h6>
                        `;
                    } else {
                        partElements += `
                            <h6>${_this.getDaysInWeek()[0]} - ${_this.getDaysInWeek()[6]} ${_this.contentText.months[_this.currentMonth]} ${_this.currentYear}</h6>
                        `;

                        console.log("Calendar Day Format isn't not supported! Calendar Day Format changed into 'd/m/y '");
                    }
                }
            } else if (_this.date == null) {
                throw new TypeError("Can't get Date from your computer!");
            }
        } else if (part == 'views') {
            let buttons = '';

            if (_this.config.header.views && _this.config.header.views != '') {
                $.each(_this.config.header.views, (key, value) => {
                    if (_this.config.header.views.indexOf(value) > -1) {
                        buttons += `<button class="${_this.config.view == value ? _this.config.buttonClass.active : _this.config.buttonClass.default} btn-calendar-view" type="button" data-view="${value}">${value}</button>`;
                    }
                });
            }

            partElements += `
                <div class="btn-group">
                    ${buttons}
                </div>
            `;
        }

        return partElements;
    }

    getCalendarBody() {
        const _this = this;

        let tableHeader = '';
        let tableHeaderContent = '';
        let tableBody = '';

        if (this.config.view == 'month') {
            if (Object.keys(_this.contentText).indexOf(_this.config.body.tableHeader.type) > -1) {
                $.each(_this.contentText[_this.config.body.tableHeader.type], (key, value) => {
                    tableHeaderContent += _this.getTableCol(value, '', '', false);
                });

                tableHeader += _this.getTableRow(tableHeaderContent);
            } else {
                throw new TypeError('There is no type of Calendar Table Header Type');
            }
        } else if (this.config.view == 'week') {
            tableHeaderContent += _this.getTableCol('', '', '', false, 'calendar-table-col-hour');

            $.each(_this.contentText[_this.config.body.tableHeader.type], (key, value) => {
                tableHeaderContent += _this.getTableCol(value, '', '', false, 'calendar-table-col-day');
            });

            tableHeaderContent += _this.getTableCol('', '', '', false, 'calendar-table-col-hour');
            $.each(_this.getDaysInWeek(), function (key, value) {
                tableHeaderContent += _this.getTableCol(value, _this.currentMonth, _this.currentYear, false);
            });

            tableHeader += _this.getTableRow(tableHeaderContent);
        } else if (this.config.view == 'day') {
        }

        tableBody += _this.getTable(_this.config.view);

        let table = `
            <div class="calendar-table">
                <div class="calendar-table-header">${tableHeader}</div>
                <div class="calendar-table-body">${tableBody}</div>
            </div>
        `;

        return table;
    }

    getTable(view, month = this.currentMonth, year = this.currentYear) {
        const _this = this;

        let tableContent = '';

        if (view == 'month') {
            let date = 1;
            let firstDay;

            if (_this.getFirstDay(month, year) - 1 < 0) {
                firstDay = 6;
            } else {
                firstDay = _this.getFirstDay(month, year) - 1;
            }

            for (let r = 0; r < 6; r++) {
                let rowContent = '';

                for (let c = 0; c < 7; c++) {
                    if (r == 0 && c < firstDay) {
                        // GET DATE OF PREV MONTH ON VIEW
                        let prevDays;

                        if (month == 0) {
                            prevDays = _this.getDaysInMonth(_this.getPrevMonth(), _this.getPrevYear());

                            rowContent += _this.getTableCol(prevDays + firstDay * -1 + 1 + c, _this.getPrevMonth(), _this.getPrevYear());
                        } else {
                            prevDays = _this.getDaysInMonth(_this.getPrevMonth(), year);

                            rowContent += _this.getTableCol(prevDays + firstDay * -1 + 1 + c, _this.getPrevMonth(), year);
                        }

                        prevDays--;
                    } else if (r > 0 && date > _this.getDaysInMonth(month, year)) {
                        // GET DATE OF NEXT MONTH ON VIEW
                        if (month == 11) {
                            rowContent += _this.getTableCol(date - _this.getDaysInMonth(month, year), _this.getNextMonth(), _this.getNextYear());
                        } else {
                            rowContent += _this.getTableCol(date - _this.getDaysInMonth(month, year), _this.getNextMonth(), year);
                        }

                        date++;
                    } else {
                        // GET DATE OF MONTH ON VIEW
                        rowContent += _this.getTableCol(date, month, year);
                        date++;
                    }
                }

                tableContent += _this.getTableRow(rowContent);
            }
        } else if (view == 'week') {
            for (let h = 0; h < 24; h++) {
                let rowContent = '';
                let timeText;
                if (h < 10) {
                    timeText = '0' + h + ':' + '00';
                } else {
                    timeText = h + ':' + '00';
                }

                rowContent += _this.getTableCol(timeText, _this.currentMonth, '', false, 'calendar-table-col-hour');

                for (let c = 0; c < 7; c++) {
                    rowContent += _this.getTableCol('', _this.currentMonth, '');
                }

                tableContent += _this.getTableRow(rowContent);
            }
        }

        return tableContent;
    }

    getTableRow(rowContent) {
        return `
            <div class="calendar-table-row">${rowContent}</div>
        `;
    }

    getTableCol(colContent, month, year, tableBodyDays = true, extraClass = '') {
        const _this = this;

        return `
            <div class = "calendar-table-col ${extraClass} ${tableBodyDays && month != _this.currentMonth ? 'calendar-table-col-disabled' : ''}">
                ${(() => {
                    if (tableBodyDays) {
                        return `
                            <a href="#" class="calendar-table-day ${_this.getToday(colContent, month, year) ? 'calendar-table-today' : ''}" data-calendar-day="${year}-${month + 1 >= 10 ? month + 1 : '0' + (month + 1)}-${colContent >= 10 ? colContent : '0' + colContent}">
                                <span class="day-text">${colContent}</span>
                            </a>
                        `;
                    } else {
                        return `
                            <span class="${_this.getToday(colContent, month, year) ? 'calendar-span-today' : ''}" data-calendar-day="${year}-${month + 1 >= 10 ? month + 1 : '0' + (month + 1)}-${colContent >= 10 ? colContent : '0' + colContent}">
                                ${colContent}
                            </span>
                        `;
                    }
                })()}
            </div>
        `;
    }

    setTableColSize() {
        const _this = this;

        $(this.target)
            .find('.calendar-table-day')
            .each(function () {
                if (_this.config.view == 'month') {
                    if (_this.config.dayRatio != 'auto') {
                        $(this).css({
                            height: $(this).width() * _this.config.dayRatio + 'px'
                        });
                    }
                } else if (_this.config.view == 'week') {
                    $(this).css({
                        height: $(this).width() * 1 + 'px'
                    });
                }
            });
    }

    getEvents() {
        const _this = this;

        let eventsKeys = Object.keys(_this.config.events);
        let eventsLength = eventsKeys.length;

        if (eventsLength > 0) {
            $(_this.target)
                .find('.calendar-table-day')
                .each(function () {
                    let eventDay = $(this).data('calendar-day');

                    if (eventsKeys.indexOf(eventDay) > -1) {
                        $(this).append(`
                        <span class="day-events"></span>
                    `);

                        for (let i = 0; i < Object.keys(_this.config.events[eventDay]).length; i++) {
                            $(this).find('span.day-events').append(`
                            <i>
                                ${Object.keys(_this.config.events[eventDay][i]).length}
                            </i>
                        `);
                        }
                    }
                });
        }

        $(_this.target)
            .find('.calendar-table-day')
            .each(function () {
                $(this)
                    .unbind()
                    .on('click', function () {
                        if (_this.config.eventOnClick) {
                            _this.config.eventOnClick(this);
                        }
                    });
            });
    }

    initActions() {
        this.actionHeader();
    }

    actionHeader() {
        this.getCalendarNext();
        this.getCalendarPrev();
        this.getCalendarToday();

        this.changeCalendarView();

        this.monthPicker();
    }

    getCalendarNext() {
        const _this = this;

        $(this.target)
            .find('.btn-calendar-next')
            .unbind()
            .on('click', function () {
                if (_this.config.view == 'month') {
                    if (_this.currentMonth == 11) {
                        _this.currentYear = _this.getNextYear();
                        _this.config.year = _this.currentYear;
                    }

                    _this.currentMonth = _this.getNextMonth();
                    _this.config.month = _this.currentMonth;
                } else if (_this.config.view == 'week') {
                    if (_this.currentDate + 7 > _this.getDaysInMonth(_this.currentMonth, _this.currentYear)) {
                        _this.currentDate = _this.currentDate + 7 - _this.getDaysInMonth(_this.currentMonth, _this.currentYear);
                    } else {
                        _this.currentDate = _this.currentDate + 7;
                    }
                }

                if (typeof _this.currentDate == 'undefined') {
                    _this.currentDate = '';
                }

                if (_this.config.eventOnClickNext) {
                    _this.config.eventOnClickNext(_this.config);
                }

                _this.render(_this.target);
            });
    }

    getCalendarPrev() {
        const _this = this;

        $(this.target)
            .find('.btn-calendar-prev')
            .unbind()
            .on('click', function () {
                if (_this.config.view == 'month') {
                    if (_this.currentMonth == 0) {
                        _this.currentYear = _this.getPrevYear();
                        _this.config.year = _this.currentYear;
                    }

                    _this.currentMonth = _this.getPrevMonth();
                    _this.config.month = _this.currentMonth;
                }

                if (typeof _this.currentDate == 'undefined') {
                    _this.currentDate = '';
                }

                if (_this.config.eventOnClickPrev) {
                    _this.config.eventOnClickPrev(_this.config);
                }

                _this.render(_this.target);
            });
    }

    getCalendarToday() {
        const _this = this;

        $(_this.target)
            .find('.btn-calendar-today')
            .unbind()
            .on('click', function () {
                if (_this.config.view == 'month') {
                    _this.currentMonth = _this.date.getMonth();
                    _this.currentYear = _this.date.getFullYear();

                    _this.config.month = _this.currentMonth;
                    _this.config.year = _this.currentYear;
                }

                if (_this.config.eventOnClickToday) {
                    _this.config.eventOnClickToday(_this.config);
                }

                _this.render(_this.target);
            });
    }

    changeCalendarView() {
        const _this = this;

        $(_this.target)
            .find('.btn-calendar-view')
            .unbind()
            .on('click', function () {
                let dataView = $(this).data('view');

                _this.config.view = dataView;

                _this.render(_this.target);
            });
    }

    monthPicker() {
        const _this = this;

        let year = _this.currentYear;

        $(_this.target)
            .find('.btn-calendar-monthpicker-year-next')
            .unbind()
            .on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                year++;
                $(this).siblings('h6').text(year);
            });

        $(_this.target)
            .find('.btn-calendar-monthpicker-year-prev')
            .unbind()
            .on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                year--;
                $(this).siblings('h6').text(year);
            });

        $(_this.target)
            .find('.btn-calendar-monthpicker')
            .unbind()
            .on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                _this.currentMonth = $(this).data('month');
                _this.currentYear = year;

                _this.render(_this.target);
            });
    }
}

/*
=========================================================
PAGINATION
=========================================================
*/
class Pagination {
    constructor(element, options) {
        let defaultOptions = {
            current: 1,
            limit: 10,
            action: 'javascipt:void(0);',
            extendParams: false
        };

        this.config = {
            ...defaultOptions,
            ...options
        };

        this.lang = zykVar.basicLang.en;

        this.element = element;

        this.render();
    }

    render() {
        const _this = this;

        $(this.element).html(_this.template());
    }

    template() {
        const _this = this;

        let template = `
            <a href="#" class="pagination-item pagination-item-prev btn"
                onclick="${_this.config.action}(${_this.config.current - 1}, ${_this.config.extendParams ? _this.config.extendParams : ''})"
                role="button" ${_this.config.current == 1 ? 'style="display: none;"' : ''}>
                <i class="els el-lg el-caret-left"></i> ${_this.lang.next}
            </a>

            ${this.getListPages()}

            <a href="#" class="pagination-item pagination-item-next btn"
                onclick="${_this.config.action}(${_this.config.current + 1}, ${_this.config.extendParams ? _this.config.extendParams : ''})"
                role="button" ${_this.config.current == _this.config.limit ? 'style="display: none;"' : ''}>
                ${_this.lang.prev} <i class="els el-lg el-caret-right"></i>
            </a>
        `;

        return template;
    }

    getListPages() {
        const _this = this;

        let range = 5;

        let from = this.config.current - 2;
        let to = this.config.current + 2;

        let list = '';

        if (this.config.limit > range) {
            if (from <= 1) {
                for (let i = 1; i <= to; i++) {
                    list += `
                            <a href="#" class="pagination-item btn ${i == _this.config.current ? 'active' : ''}" role="button"
                                onclick="${_this.config.action}(${i}, ${_this.config.extendParams ? _this.config.extendParams : ''})"
                                data-pagination-page="${i}">
                                ${i}
                            </a>
                        `;
                }

                list += `
                    <a href="#" class="pagination-item btn disabled" role="button" disabled>...</a>
                `;

                list += `
                    <a href="#" class="pagination-item btn" role="button"
                        onclick="${_this.config.action}(${_this.config.limit}, ${_this.config.extendParams ? _this.config.extendParams : ''})"
                        data-pagination-page="${_this.config.limit}">
                        ${_this.config.limit}
                    </a>
                `;
            } else if (from > 1 && to < _this.config.limit) {
                list += `
                    <a href="#" class="pagination-item btn" role="button"
                        onclick="${_this.config.action}(1, ${_this.config.extendParams ? _this.config.extendParams : ''})"
                        data-pagination-page="1">
                        1
                    </a>
                `;

                list += `
                    <a href="#" class="pagination-item btn disabled" role="button" disabled>...</a>
                `;

                for (let i = from; i <= to; i++) {
                    list += `
                            <a href="#" class="pagination-item btn ${i == _this.config.current ? 'active' : ''}" role="button"
                                onclick="${_this.config.action}(${i}, ${_this.config.extendParams ? _this.config.extendParams : ''})"
                                data-pagination-page="${i}">
                                ${i}
                            </a>
                        `;
                }

                list += `
                    <a href="#" class="pagination-item btn disabled" role="button" disabled>...</a>
                `;

                list += `
                    <a href="#" class="pagination-item btn" role="button"
                        onclick="${_this.config.action}(${_this.config.limit}, ${_this.config.extendParams ? _this.config.extendParams : ''})"
                        data-pagination-page="${_this.config.limit}">
                        ${_this.config.limit}
                    </a>
                `;
            } else if (to >= _this.config.limit) {
                list += `
                    <a href="#" class="pagination-item btn" role="button"
                        onclick="${_this.config.action}(1, ${_this.config.extendParams ? _this.config.extendParams : ''})"
                        data-pagination-page="1">
                        1
                    </a>
                `;

                list += `
                    <a href="#" class="pagination-item btn disabled" role="button" disabled>...</a>
                `;

                for (let i = from; i <= _this.config.limit; i++) {
                    list += `
                            <a href="#" class="pagination-item btn ${i == _this.config.current ? 'active' : ''}" role="button"
                                onclick="${_this.config.action}(${i}, ${_this.config.extendParams ? _this.config.extendParams : ''})"
                                data-pagination-page="${i}">
                                ${i}
                            </a>
                        `;
                }
            }
        } else {
            for (let i = 1; i <= this.config.limit; i++) {
                list += `
                    <a href="#" class="pagination-item btn ${i == _this.config.current ? 'active' : ''}" role="button"
                        onclick="${_this.config.action}(${i}, ${_this.config.extendParams ? _this.config.extendParams : ''})"
                        data-pagination-page="${i}">
                        ${i}
                    </a>
                `;
            }
        }

        return list;
    }
}

/*
=========================================================
DATEPICKER
=========================================================
*/

class Datepicker {
    constructor(target, options) {
        let defaultOptions = {};

        this.config = {
            ...defaultOptions,
            ...options
        };

        this.popoverConfig = {
            trigger: 'manual',
            container: 'body',
            html: true,
            placement: 'bottom',
            template: `
                <div class="popover popover-datepicker" role="tooltip">
                    <div class="arrow"></div>
                    <h3 class="popover-header"></h3>
                    <div class="popover-body"></div>
                </div>
            `
        };

        this.button = target;

        this.fire();
    }

    fire() {
        if ($('body').find('.popover-datepicker').length > 0) {
            $('body').find('.popover-datepicker').remove();
        }

        $(this.button).popover(this.popoverConfig);
        $(this.button).popover('show');

        this.initEvent();
    }

    hide() {
        $(this.button).popover('hide');
    }

    initEvent() {
        const _this = this;

        $(document).on(
            'click.zyk.datepicker',
            function (e) {
                if (!$(document).find('.popover-datepicker').is(e.target) && $(document).find('.popover-datepicker').has(e.target).length === 0) {
                    $(_this.button).popover('hide');
                }
            }.bind(_this)
        );
    }

    template() {}
}

/*
=========================================================
BREADCRUMB
=========================================================
*/

class Breadcrumb {
    constructor(data, options) {
        let defaultOptions = {};

        this.config = {
            ...defaultOptions,
            ...options
        };

        this.render(data);
    }

    render(data) {
        const _this = this;

        $.each(data, (index, item) => {
            $('#breadcrumb').append(_this.template(item));
        });
    }

    template(dataItem) {
        const href = window.location.href;

        return `
            <li class="breadcrumb-item ${dataItem.link == href || dataItem.link + '#' == href || href.indexOf(dataItem.link) > -1 ? 'breadcrumb-active' : ''}">
                <a href="${dataItem.link == href || dataItem.link + '#' == href || href.indexOf(dataItem.link) > -1 ? 'javascript:void(0);' : dataItem.link}">
                    ${dataItem.text}
                </a>
            </li>
        `;
    }
}

/*
=========================================================
TOAST
=========================================================
*/

class Toast {
    constructor(options) {
        let defaultOptions = {
            placement: {
                y: 'top',
                x: 'center'
            },
            animation: true,
            autohide: true,
            delay: 1000
        };

        this.config = {
            ...defaultOptions,
            ...options
        };

        this.wrapper = $('.toast-wrapper');

        this.render();
    }

    render() {
        const _this = this;

        this.checkWrapperExist();
    }

    checkWrapperExist() {
        const _this = this;

        // if (_this.wrapper.length > 0) {
        // 	_this.wrapper.remove();
        // }

        _this.renderWrapper();
    }

    renderWrapper() {
        const _this = this;

        const wrapper = '<div class="toast-wrapper" style="position: fixed; z-index: 1030"></div>';

        let position = {
            top: 'auto',
            bottom: 'auto',
            left: 'auto',
            right: 'auto'
        };

        if (_this.config.placement.y == 'top') {
            position.top = 0;
        } else if (_this.config.placement.y == 'center') {
            position.top = '50%';
        } else if (_this.placement.y == 'bottom') {
            position.bottom = 0;
        }

        if (_this.config.placement.x == 'left') {
            position.left = 0;
        } else if (_this.config.placement.x == 'center') {
            position.left = '50%';
        } else if (_this.placement.x == 'right') {
            position.right = 0;
        }

        console.log(position, $(wrapper));
        $(wrapper).css({
            top: position.top,
            bottom: position.bottom
        });

        $(wrapper).appendTo('body');
    }
}

/*
=========================================================
TABLE DATA
=========================================================
*/

class TableData {
    constructor(target, options) {
        let defaultOptions = {
            border: false,
            columnSizes: [],

            header: {},
            body: {},
            columns: [],
            data: [],
            actions: false
        };

        this.config = {
            ...defaultOptions,
            ...options
        };

        this.target = target;
        this.render();
    }

    render() {
        const _this = this;

        _this.generateTable();
    }

    generateTable() {
        const _this = this;

        // RESET HTML
        $(_this.target).empty();

        // SET BORDER
        if (_this.config.border) {
            $(_this.target).addClass('list-table-bordered');
        }

        // CACULATE COLUMN SIZE
        _this.calculateColumnSizes();

        // CREATE HEADER
        if (_this.config.header) {
            $(_this.target).append(`<div class="list-items-header"></div>`);

            _this.generateHeader();
        }

        // CREATE BODY
        if (_this.config.body) {
            $(_this.target).append(`<div class="list-items-body"></div>`);

            _this.generateBody();
        }
    }

    calculateColumnSizes() {
        const _this = this;

        let sizes = _this.config.columnSizes;

        // CACULATE ARRAY OF COLUMN SIZE
        _this.config.columns.forEach((column) => {
            if (typeof column.children == 'undefined') {
                let size = _this.convertValueToPercent(column.size);
                sizes.push({
                    size: size
                });
            } else {
                let childSizes = {
                    children: []
                };

                let size = _this.convertValueToPercent(column.size);
                childSizes.size = size;

                column.children.forEach((child) => {
                    let size = _this.convertValueToPercent(child.size);

                    childSizes.children.push({
                        size: size
                    });
                });

                sizes.push(childSizes);
            }
        });

        // CHECK IF TABLE HAS ACTIONS
        if (_this.config.actions) {
            let actionSize = 0;
            let existColumn = 0;

            for (let i = 0; i < sizes.length; i++) {
                let cSize = sizes[i].size;
                cSize = cSize.replace('%', '');
                cSize = Number(cSize);
                existColumn += cSize;
            }

            actionSize = 100 - existColumn;
            actionSize = actionSize.toFixed(2);
            sizes.push({
                size: `${actionSize}%`
            });
        }

        console.log(sizes);
    }

    convertValueToPercent(value) {
        let cValue = '';

        if (typeof value == 'number') {
            let percent = (100 / 12) * value;
            percent = percent.toFixed(2);
            cValue = `${percent}%`;
        } else if (typeof value == 'string') {
            if (value.indexOf('%') > -1) {
                cValue = `${value}`;
            } else if (value.indexOf('px') > -1) {
                value = value.replace('px', '');

                let percent = (Number(value) / $(_this.target).width()) * 100;
                percent = percent.toFixed(2);
                cValue = `${percent}%`;
            } else if (value == 'auto') {
                cValue = 'auto';
            } else {
                throw new TypeError('Invalid unit');
            }
        }

        return cValue;
    }

    generateRow() {
        let row = $(`
			<div class="item-row"></div>
		`);

        return row;
    }

    generateCol() {
        let col = $(`
			<div class="item-col"></div>
		`);

        return col;
    }

    generateHeader() {
        const _this = this;

        // RESET TABLE HEADER
        $(_this.target).find('.list-items-header').empty();

        // RENDER HEADER ROW
        let $row = _this.generateRow();
        let colSizes = _this.config.columnSizes;

        // RENDER HEADER COL
        colSizes.forEach((colSize, index) => {
            let $col = _this.generateCol();

            $col.css({
                'max-width': `${colSize.size}`
            });

            if (typeof colSize.children != 'undefined') {
            }

            // // GENERATE COLUMNS
            // if (typeof colSize == 'number') {
            //     let percent = (100 / 12) * colSize;
            //     $col.css({
            //         'max-width': `${percent}%`
            //     });
            // } else if (typeof colSize == 'string') {
            //     $col.css({
            //         'max-width': `${ccolSize}`
            //     });
            // } else if (typeof colSize == 'object') {
            //     if (typeof colSize.size == 'number') {
            //         $col.css({
            //             'max-width': `${colSize.size}%`
            //         });
            //     } else if (typeof colSize.size == 'string') {
            //         $col.css({
            //             'max-width': `${colSize.size}`
            //         });
            //     }
            // }

            // // PRINT COLUMN LABEL
            // _this.config.columns.forEach((colContent, i) => {
            //     if (i == index) {
            //         if (colContent.label && colContent.label != '') {
            //             $col.append(`
            //                 <p class="p-overline">
            //          			${colContent.label}
            //             	</p>
            //             `);
            //         }
            //     }
            // });

            // // GENERATE COLUMN CHILDREN
            // if (typeof colSize.children != 'undefined') {
            // }

            $row.append($col);
        });

        $(_this.target).find('.list-items-header').append(`
            <div class="item"></div>
        `);

        $(_this.target).find('.list-items-header .item').append($row);
    }

    generateBody() {
        const _this = this;

        // RESET TABLE BODY
        $(_this.target).find('.list-items-body').empty();

        if (_this.config.data.length == 0) {
            $(_this.target).find('.list-items-body').append(`
                <div class="item"></div>
            `);

            let $row = _this.generateRow();
            let $col = _this.generateCol();

            $col.append(`
                <p class="p-overline text-center">
                    No data available
                </p>
            `);

            $row.append($col);

            $(_this.target).find('.list-items-body .item').append($row);
        } else {
            $(_this.target).find('.list-items-body').append(`
                <div class="item"></div>
            `);

            let data = _this.config.data;
            let sizes = _this.config.columnSizes;

            data.forEach((value, index) => {
                let $row = _this.generateRow();

                $.each(value, (k, v) => {
                    let $col = _this.generateCol();

                    $row.append($col);
                });

                if (typeof value == 'number') {
                } else {
                }

                $(_this.target).find('.list-items-body .item').append($row);
            });
        }
    }
}

/*
=========================================================
POPUP
=========================================================
*/

const POPUP_NAME = 'popup';
const POPUP_EVENT_KEY = `${ZYK_DATA_KEY}.${POPUP_NAME}`;

const POPUP_CLASSNAME = {
    SHOW: 'show',
    HIDE: 'hide',
    FADE: 'fade',
    FOCUS: 'focus',
    DARK: 'dark',
    DIALOG: 'popup-dialog',
    BACKDROP: 'popup-backdrop',
    BODY: 'popup-body'
};

const POPUP_SELECTOR = {
    DIALOG: `.${POPUP_CLASSNAME.DIALOG}`,
    BACKDROP: `.${POPUP_CLASSNAME.BACKDROP}`,
    POPUP_BODY: `.${POPUP_CLASSNAME.BODY}`,
    TOGGLE: '[data-toggle="popup"]',
    DISMISS: '[data-dismiss="popup"]'
};

const POPUP_DEFAULT = {
    backdrop: true,
    focus: true,
    keyboard: true
};

const POPUP_DEFAULT_TYPE = {
    backdrop: '(boolean|string)',
    focus: 'boolean',
    keyboard: 'boolean'
};

const POPUP_EVENT = {
    SHOW: `show.${POPUP_EVENT_KEY}`,
    SHOWN: `shown.${POPUP_EVENT_KEY}`,
    HIDE: `hide.${POPUP_EVENT_KEY}`,
    HIDDEN: `hidden.${POPUP_EVENT_KEY}`,
    CLICK_DISMISS: `click.dismiss.${POPUP_EVENT_KEY}`,
    MOUSEDOWN_DISMISS: `mousedown.dismiss.${POPUP_EVENT_KEY}`,
    MOUSEUP_DISMISS: `mouseup.dismiss.${POPUP_EVENT_KEY}`,
    CLICK: `click.${POPUP_EVENT_KEY}`,
    KEYDOWN_DISMISS: `keydown.dismiss.${POPUP_EVENT_KEY}`,
    FOCUSIN: `focusin.${POPUP_EVENT_KEY}`
};

const POPUP_VAR = {
    BACKDROP: null,
    IS_SHOWN: false,
    IGNOREBACKDROPCLICK: false,
    IS_TRANSITION: false,
    TRANSITION: 100
};

var Popup = (function () {
    function Popup(element, config) {
        this.config = this.getConfig(config);

        this.backdrop = POPUP_VAR.BACKDROP;
        this.isShown = POPUP_VAR.IS_SHOWN;
        this.ignoreBackdropClick = POPUP_VAR.IGNOREBACKDROPCLICK;
        this.isTransition = POPUP_VAR.IS_TRANSITION;

        this.element = element;
        this.dialog = element.querySelector(POPUP_SELECTOR.DIALOG);

        this.hasFade = $(this.element).hasClass(POPUP_CLASSNAME.FADE);
    }

    const _proto = Popup.prototype;

    _proto.getConfig = function getConfig(config) {
        config = zykApp.configSpread(POPUP_DEFAULT, config);

        return config;
    };

    _proto.toggle = function toggle(target) {
        return this.isShown ? this.hide() : this.show(target);
    };

    _proto.show = function show(target) {
        const _this = this;

        if (this.isShown) {
            return;
        }

        // Block body
        zykApp.bodyBlock(true);

        let showEvent = $.Event(POPUP_EVENT.SHOW, {
            target: target
        });

        $(this.element).trigger(showEvent);

        this.isShown = true;

        this.keepOnViewPort();

        this.setEscapeEvent();

        $(this.element).one(POPUP_EVENT.CLICK_DISMISS, POPUP_SELECTOR.DISMISS, function (e) {
            return _this.hide(e);
        });

        $(this.dialog).off(POPUP_EVENT.CLICK_DISMISS);
        $(this.dialog).on(POPUP_EVENT.CLICK_DISMISS, function (e) {
            if ($(_this.dialog).is(e.target)) {
                return _this.hide(e);
            }
        });

        this.showBackdrop(function () {
            return _this.showElement(target);
        });
    };

    _proto.hide = function hide(e) {
        const _this = this;

        if (e) {
            e.preventDefault();
        }

        let hideEvent = $.Event(POPUP_EVENT.HIDE);

        $(this.element).trigger(hideEvent);

        this.isShown = false;

        this.hideElement();
    };

    _proto.showElement = function showElement(target) {
        const _this = this;

        this.element.style.display = 'block';

        if (this.hasFade) {
            setTimeout(function () {
                $(_this.element).addClass(POPUP_CLASSNAME.SHOW);
            }, POPUP_VAR.TRANSITION);
        } else {
            $(this.element).addClass(POPUP_CLASSNAME.SHOW);
        }

        if ($(this.element).attr('tabindex') == null) {
            $(this.element).attr('tabindex', -1);
        }

        if (this.config.focus) {
            this.forceFocus();
        }

        let shownEvent = $.Event(POPUP_EVENT.SHOWN, {
            target: target
        });

        $(_this.element).trigger(shownEvent);
    };

    _proto.hideElement = function hideElement() {
        const _this = this;

        $(this.element).removeClass(POPUP_CLASSNAME.SHOW);

        if (this.hasFade) {
            setTimeout(function () {
                _this.element.style.display = 'none';
            }, POPUP_VAR.TRANSITION);
        } else {
            this.element.style.display = 'none';
        }

        this.removeBackdrop();

        $(this.element).trigger(POPUP_EVENT.HIDDEN);

        // Unlock body
        zykApp.bodyBlock(false);
    };

    _proto.showBackdrop = function showBackdrop(callback) {
        const _this = this;

        let focus = $(this.element).hasClass(POPUP_CLASSNAME.FOCUS);

        if (this.isShown && this.config.backdrop) {
            this.backdrop = $(`<div class="${POPUP_CLASSNAME.BACKDROP}"></div>`);

            if (focus) {
                $(this.backdrop).addClass(POPUP_CLASSNAME.FOCUS);
            }

            // Append POPUP BACKDROP to BODY
            $(this.backdrop).appendTo($('body'));

            if (this.hasFade) {
                setTimeout(function () {
                    $(_this.backdrop).addClass(POPUP_CLASSNAME.FADE);
                }, POPUP_VAR.TRANSITION);
            } else {
                $(this.backdrop).addClass(POPUP_CLASSNAME.SHOW);
            }

            $(this.backdrop).on(POPUP_EVENT.CLICK_DISMISS, function (e) {
                if (_this.config.backdrop == 'static') {
                    return;
                } else {
                    _this.hide();
                }
            });
        }

        if (callback) {
            callback();
        }
    };

    _proto.removeBackdrop = function removeBackdrop() {
        const _this = this;

        if (this.backdrop) {
            $(this.backdrop).remove();

            this.backdrop = null;
        }
    };

    _proto.keepOnViewPort = function keepOnViewPort() {
        const _this = this;

        let offsetTop = $(this.element).offset().top;
        let vpHeight = window.innerHeight;

        if (offsetTop > vpHeight) {
            let scrollTop = offsetTop - (vpHeight * 10) / 100;

            $(window).scrollTop(scrollTop);
        }
    };

    _proto.forceFocus = function forceFocus() {
        const _this = this;

        $(this.element).focus();

        // $(document).off(POPUP_EVENT.FOCUSIN);
        // $(document).on(POPUP_EVENT.FOCUSIN, function(e){
        //     console.log(e);
        //     if (document !== e.target && _this.element !== e.target && $(_this.element).has(e.target).length === 0){
        //         $(_this.element).focus();
        //     }
        // })
    };

    _proto.setEscapeEvent = function setEscapeEvent() {
        const _this = this;

        if (this.isShown && this.config.keyboard) {
            $(this.element).one(POPUP_EVENT.KEYDOWN_DISMISS, function (e) {
                if (e.which === zykKeys.escapeKey) {
                    e.preventDefault();

                    _this.hide();
                }
            });
        } else if (!this.isShown) {
            $(this.element).off(POPUP_EVENT.KEYDOWN_DISMISS);
        }
    };

    Popup.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function () {
            let data = $(this).data(POPUP_EVENT_KEY);

            let _config = zykApp.configSpread(POPUP_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {});

            if (!data) {
                data = new Popup(this, _config);
                $(this).data(POPUP_EVENT_KEY, data);
            }

            if (typeof config == 'string') {
                if (typeof data[config] == 'undefined') {
                    throw new TypeError('No method named ' + '"' + config + '"');
                }

                data[config](target);
            } else if (_config.toggle) {
                data.show(target);
            }
        });
    };

    return Popup;
})();

$(document).on(POPUP_EVENT.CLICK, POPUP_SELECTOR.TOGGLE, function (e) {
    const _this = this;

    let target = $(this).data('target');

    let config = $(target).data(POPUP_EVENT_KEY) ? 'toggle' : zykApp.configSpread($(target).data(), $(this).data());

    if (this.tagName == 'A') {
        e.preventDefault();
    }

    var $target = $(target).one(POPUP_EVENT.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
            return;
        }

        $target.one(POPUP_EVENT.HIDDEN, function () {
            // if($(_this).is(':visible')){
            //     console.log('visible');
            // }
        });
    });

    Popup.jqueryInterface.call($(target), config, this);
});

$.fn[POPUP_NAME] = Popup.jqueryInterface;
$.fn[POPUP_NAME].constructor = Popup;

/*
=========================================================
CHECKBOX, RADIO, SWITCH
=========================================================
*/

const CHECK_NAME = 'check';
const CHECK_EVENT_KEY = `${ZYK_DATA_KEY}.${CHECK_NAME}`;

const CHECK_TYPE = {
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    SWITCH: 'switch'
};

const CHECK_EVENT = {
    CLICK: `click.${CHECK_EVENT_KEY}`,
    CHECK: `check.${CHECK_EVENT_KEY}`,
    UNCHECK: `uncheck.${CHECK_EVENT_KEY}`,
    CHANGE: `change.${CHECK_EVENT_KEY}`
};

const CHECK_DEFAULT = {};

const CHECK_ICONS = {
    ICON_CHECKBOX_UNCHECK: 'elo el-lg el-square',
    ICON_CHECKBOX_CHECK: 'els el-lg el-check-square',
    ICON_RADIO_UNCHECK: 'elo el-lg el-circle',
    ICON_RADIO_CHECK: 'els el-lg el-check-circle'
};

const CHECK_SELECTOR = {
    TOGGLE: '[data-toggle="check"]'
};

var Check = (function () {
    function Check(element, options) {
        this.config = this.getConfig(options);

        this.element = element;
    }

    const _proto = Check.prototype;

    _proto.getConfig = function getConfig(config) {
        config = zykApp.configSpread(CHECK_DEFAULT, config);

        return config;
    };

    _proto.toggle = function toggle() {
        const _this = this;

        let type = $(_this.element).data('type');
        let disabled = $(_this.element).attr('disabled');

        const $input = $(_this.element).siblings('input');
        let prop = $input.prop('checked');

        if (disabled) {
            return;
        } else {
            if (type == CHECK_TYPE.CHECKBOX) {
                if (prop == false) {
                    $input.prop('checked', true);
                    $(_this.element).find('i').removeClass(CHECK_ICONS.ICON_CHECKBOX_UNCHECK).addClass(CHECK_ICONS.ICON_CHECKBOX_CHECK);

                    $(_this.element).trigger(CHECK_EVENT.CHANGE);
                    $(_this.element).trigger(CHECK_EVENT.CHECK);
                } else {
                    $input.prop('checked', false);
                    $(_this.element).find('i').removeClass(CHECK_ICONS.ICON_CHECKBOX_CHECK).addClass(CHECK_ICONS.ICON_CHECKBOX_UNCHECK);

                    $(_this.element).trigger(CHECK_EVENT.CHANGE);
                    $(_this.element).trigger(CHECK_EVENT.UNCHECK);
                }
            } else if (type == CHECK_TYPE.SWITCH) {
                if (prop == false) {
                    $(_this.element).find('.btn-switch').addClass('active');
                    $input.prop('checked', true);

                    $(_this.element).trigger(CHECK_EVENT.CHANGE);
                    $(_this.element).trigger(CHECK_EVENT.CHECK);
                } else {
                    $(_this.element).find('.btn-switch').removeClass('active');
                    $input.prop('checked', false);

                    $(_this.element).trigger(CHECK_EVENT.CHANGE);
                    $(_this.element).trigger(CHECK_EVENT.UNCHECK);
                }
            } else if (type == CHECK_TYPE.RADIO) {
                if (prop == true) {
                    return;
                } else {
                    $(_this.element).closest('.form-check-group').find('i').removeClass(CHECK_ICONS.ICON_RADIO_CHECK).addClass(CHECK_ICONS.ICON_RADIO_UNCHECK);
                    $(_this.element).find('i').removeClass(CHECK_ICONS.ICON_RADIO_UNCHECK).addClass(CHECK_ICONS.ICON_RADIO_CHECK);

                    $(_this.element).closest('.form-check-group').find('input[type="radio"]').prop('checked', false);
                    $input.prop('checked', true);

                    $(_this.element).trigger(CHECK_EVENT.CHANGE);
                    $(_this.element).trigger(CHECK_EVENT.CHECK);
                }
            }
        }
    };

    Check.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function () {
            let data = $(this).data(CHECK_EVENT_KEY);

            let _config = zykApp.configSpread(CHECK_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {});

            if (!data) {
                data = new Check(this, _config);
                $(this).data(CHECK_EVENT_KEY, data);
            }

            if (typeof config == 'string') {
                if (typeof data[config] == 'undefined') {
                    throw new TypeError('No method named ' + '"' + config + '"');
                }

                data[config]();
            } else if (_config.toggle) {
                data.toggle();
            }
        });
    };

    return Check;
})();

$(document).on(CHECK_EVENT.CLICK, CHECK_SELECTOR.TOGGLE, function (e) {
    let config = $(this).data(CHECK_EVENT_KEY) ? 'toggle' : $(this).data();

    if (this.tagName == 'A') {
        e.preventDefault();
    }

    Check.jqueryInterface.call($(this), config, this);
});

$.fn[CHECK_NAME] = Check.jqueryInterface;
$.fn[CHECK_NAME].constructor = Check;

/*
=========================================================
LIST TREE
=========================================================
*/

const LIST_TREE_NAME = 'listtree';
const LIST_TREE_EVENT_KEY = `${ZYK_DATA_KEY}.${LIST_TREE_NAME}`;

const LIST_TREE_EVENT = {
    CLICK: `click.${LIST_TREE_EVENT_KEY}`,
    SHOW: `show.${LIST_TREE_EVENT_KEY}`,
    SHOWN: `shown.${LIST_TREE_EVENT_KEY}`,
    HIDE: `hide.${LIST_TREE_EVENT_KEY}`,
    HIDDEN: `hidden.${LIST_TREE_EVENT_KEY}`
};

const LIST_TREE_SELECTOR = {
    TOGGLE: '[data-toggle="list-tree"]',
    WRAPPER: '.item-wrapper-',
    ROW: '.item-row',
    ICON: 'i'
};

const LIST_TREE_CLASS = {
    ROTATED: 'rotated'
};

const LIST_TREE_DEFAULT = {};

var ListTree = (function () {
    function ListTree(element, options) {
        this.config = this.getConfig(options);

        this.element = element;
        this.row = $(this.element).closest(LIST_TREE_SELECTOR.ROW);
    }

    const _proto = ListTree.prototype;

    _proto.getConfig = function getConfig(config) {
        config = zykApp.configSpread(LIST_TREE_DEFAULT, config);

        return config;
    };

    _proto.toggle = function toggle() {
        const _this = this;

        let level = $(_this.element).data('level');

        $(_this.row)
            .find(LIST_TREE_SELECTOR.WRAPPER + level)
            .slideToggle();
        $(_this.element).find(LIST_TREE_SELECTOR.ICON).toggleClass(LIST_TREE_CLASS.ROTATED);
    };

    ListTree.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function () {
            let data = $(this).data(LIST_TREE_EVENT_KEY);

            let _config = zykApp.configSpread(LIST_TREE_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {});

            if (!data) {
                data = new ListTree(this, _config);
                $(this).data(LIST_TREE_EVENT_KEY, data);
            }

            if (typeof config == 'string') {
                if (typeof data[config] == 'undefined') {
                    throw new TypeError('No method named ' + '"' + config + '"');
                }

                data[config]();
            } else if (_config.toggle) {
                data.toggle();
            }
        });
    };

    return ListTree;
})();

$(document).on(LIST_TREE_EVENT.CLICK, LIST_TREE_SELECTOR.TOGGLE, function (e) {
    let config = $(this).data(LIST_TREE_EVENT_KEY) ? 'toggle' : $(this).data();

    if (this.tagName == 'A') {
        e.preventDefault();
    }

    ListTree.jqueryInterface.call($(this), config, this);
});

$.fn[LIST_TREE_NAME] = ListTree.jqueryInterface;
$.fn[LIST_TREE_NAME].constructor = ListTree;

/*
=========================================================
COLLAPSE
=========================================================
*/

const COLLAPSE_NAME = 'collapse';
const COLLAPSE_EVENT_KEY = `${ZYK_DATA_KEY}.${COLLAPSE_NAME}`;

const COLLAPSE_EVENT = {
    CLICK: `click.${COLLAPSE_EVENT_KEY}`,
    SHOW: `show.${COLLAPSE_EVENT_KEY}`,
    SHOWN: `shown.${COLLAPSE_EVENT_KEY}`,
    HIDE: `hide.${COLLAPSE_EVENT_KEY}`,
    HIDDEN: `hidden.${COLLAPSE_EVENT_KEY}`
};

const COLLAPSE_SELECTOR = {
    TOGGLE: '[data-toggle="collapse"]',
    COLLAPSE: '.collapse',
    ICON: 'i'
};

const COLLAPSE_CLASS = {
    ROTATED: 'rotated',

    SHOW: 'show'
};

const COLLAPSE_DEFAULT = {
    DURATION: 300
};

var Collapse = (function () {
    function Collapse(element, options) {
        this.config = this.getConfig(options);

        this.element = element;

        this.accordion = $(this.element).data('parent');

        this.isShown = '';
    }

    const _proto = Collapse.prototype;

    _proto.getConfig = function getConfig(config) {
        config = zykApp.configSpread(COLLAPSE_DEFAULT, config);

        return config;
    };

    _proto.toggle = function toggle(target) {
        if ($(this.element).data('show')) {
            this.isShown = true;
        } else {
            this.isShown = false;
        }

        return this.isShown ? this.hide(target) : this.show(target);
    };

    _proto.show = function show(target) {
        const _this = this;

        if (_this.isShown) {
            return;
        }

        _this.reset();

        let targetId = $(target).data('target');

        $(_this.element).trigger(COLLAPSE_EVENT.SHOW);

        $(_this.accordion).find(targetId).slideDown(COLLAPSE_DEFAULT.DURATION);

        setTimeout(function () {
            $(_this.accordion).find(targetId).addClass(COLLAPSE_CLASS.SHOW);
        }, COLLAPSE_DEFAULT.DURATION);

        $(target).find(COLLAPSE_SELECTOR.ICON).addClass(COLLAPSE_CLASS.ROTATED);

        $(_this.element).data('show', true);

        $(_this.element).trigger(COLLAPSE_EVENT.SHOWN);
    };

    _proto.hide = function hide(target) {
        const _this = this;

        let targetId = $(target).data('target');

        $(_this.element).trigger(COLLAPSE_EVENT.HIDE);

        $(_this.accordion).find(targetId).slideUp(COLLAPSE_DEFAULT.DURATION);

        setTimeout(function () {
            $(_this.accordion).find(targetId).removeClass(COLLAPSE_CLASS.SHOW);
        }, COLLAPSE_DEFAULT.DURATION);

        $(target).find(COLLAPSE_SELECTOR.ICON).removeClass(COLLAPSE_CLASS.ROTATED);

        $(_this.element).data('show', false);

        $(_this.element).trigger(COLLAPSE_EVENT.HIDDEN);
    };

    _proto.reset = function reset() {
        $(this.accordion).find(COLLAPSE_SELECTOR.COLLAPSE).slideUp(COLLAPSE_DEFAULT.DURATION);

        setTimeout(function () {
            $(this.accordion).find(COLLAPSE_SELECTOR.COLLAPSE).removeClass(COLLAPSE_CLASS.SHOW);
        }, COLLAPSE_DEFAULT.DURATION);

        $(this.accordion).find(COLLAPSE_SELECTOR.ICON).removeClass(COLLAPSE_CLASS.ROTATED);

        $(this.accordion).find(COLLAPSE_SELECTOR.COLLAPSE).data('show', false);
    };

    Collapse.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function () {
            let data = $(this).data(COLLAPSE_EVENT_KEY);

            let _config = zykApp.configSpread(COLLAPSE_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {});

            if (!data) {
                data = new Collapse(this, _config);
                $(this).data(COLLAPSE_EVENT_KEY, data);
            }

            if (typeof config == 'string') {
                if (typeof data[config] == 'undefined') {
                    throw new TypeError('No method named ' + '"' + config + '"');
                }

                data[config](target);
            } else if (_config.toggle) {
                data.toggle(target);
            }
        });
    };

    return Collapse;
})();

$(document).on(COLLAPSE_EVENT.CLICK, COLLAPSE_SELECTOR.TOGGLE, function (e) {
    let target = $(this).data('target');

    let config = $(target).data(COLLAPSE_EVENT_KEY) ? 'toggle' : zykApp.configSpread($(target).data(), $(this).data());

    if (this.tagName == 'A') {
        e.preventDefault();
    }

    Collapse.jqueryInterface.call($(target), config, this);
});

$.fn[COLLAPSE_NAME] = ListTree.jqueryInterface;
$.fn[COLLAPSE_NAME].constructor = ListTree;

/*
=========================================================
DROPDOWN
=========================================================
*/

const DROPDOWN_NAME = 'collapse';
const DROPDOWN_EVENT_KEY = `${ZYK_DATA_KEY}.${DROPDOWN_NAME}`;

const DROPDOWN_EVENT = {
    CLICK: `click.${DROPDOWN_EVENT_KEY}`,
    SHOW: `show.${DROPDOWN_EVENT_KEY}`,
    SHOWN: `shown.${DROPDOWN_EVENT_KEY}`,
    HIDE: `hide.${DROPDOWN_EVENT_KEY}`,
    HIDDEN: `hidden.${DROPDOWN_EVENT_KEY}`
};

const DROPDOWN_CLASS = {
    MENU: 'dropdown-menu',
    MENURIGHT: 'dropdown-menu-right',
    SHOW: 'show',

    DROPUP: 'dropup',
    DROPLEFT: 'dropleft',
    DROPRIGHT: 'dropright'
};

const DROPDOWN_SELECTOR = {
    TOGGLE: '[data-toggle="dropdown"]',
    MENU: `.${DROPDOWN_CLASS.MENU}`
};

const DROPDOWN_PLACEMENT = {
    DOWN: 'bottom-start',
    DOWNEND: 'bottom-end',
    UP: 'top-start',
    UPEND: 'top-end',
    LEFT: 'left-start',
    RIGHT: 'right-start'
};

const DROPDOWN_DEFAULT = {
    placement: DROPDOWN_PLACEMENT.DOWN,
    flip: true,
    offset: [0, 0],
    boundary: 'viewport'
};

var Dropdown = (function () {
    function Dropdown(element, options) {
        this.config = this.getConfig(options);

        this.element = element;
        this.parent = this.element.parentElement;
        this.menu = this.parent.querySelector(DROPDOWN_SELECTOR.MENU);
        this.popper = null;

        this.isShown = false;
    }

    const _proto = Dropdown.prototype;

    _proto.getConfig = function getConfig(config) {
        config = zykApp.configSpread(DROPDOWN_DEFAULT, config);

        return config;
    };

    _proto.toggle = function toggle() {
        let isActive = $(this.menu).hasClass(DROPDOWN_CLASS.SHOW);

        Dropdown.clearMenus();

        if (isActive) {
            return;
        }

        this.show();
    };

    _proto.show = function show() {
        const _this = this;

        zykApp.checkPopper();

        _this.popper = Popper.createPopper(_this.element, _this.menu, _this.getPopperConfig());

        $(_this.menu).addClass(DROPDOWN_CLASS.SHOW);
        $(_this.parent).trigger(DROPDOWN_EVENT.SHOWN);

        _this.isShown = true;
    };

    _proto.hide = function hide() {
        const _this = this;

        if (_this.popper) {
            _this.popper.destroy();
        }

        $(_this.menu).removeClass(DROPDOWN_CLASS.SHOW);
        $(_this.parent).trigger(DROPDOWN_EVENT.HIDDEN);

        _this.isShown = false;
    };

    _proto.getOffset = function getOffset() {
        const _this = this;

        let offset = _this.config.offset;

        if (typeof offset == 'string') {
            offset.replace(',', ' ');
            offset = offset.split(',').map(Number);
        }

        return offset;
    };

    _proto.getPlacement = function getPlacement() {
        const _this = this;

        let placement = DROPDOWN_DEFAULT.placement;

        if ($(_this.parent).hasClass(DROPDOWN_CLASS.DROPUP)) {
            placement = DROPDOWN_PLACEMENT.UP;

            if ($(_this.menu).hasClass(DROPDOWN_CLASS.MENURIGHT)) {
                placement = DROPDOWN_PLACEMENT.UPEND;
            }
        } else if ($(_this.parent).hasClass(DROPDOWN_CLASS.DROPLEFT)) {
            placement = DROPDOWN_PLACEMENT.LEFT;
        } else if ($(_this.parent).hasClass(DROPDOWN_CLASS.DROPRIGHT)) {
            placement = DROPDOWN_PLACEMENT.RIGHT;
        } else if ($(_this.menu).hasClass(DROPDOWN_CLASS.MENURIGHT)) {
            placement = DROPDOWN_PLACEMENT.DOWNEND;
        } else {
            placement = _this.config.placement;
        }

        return placement;
    };

    _proto.getPopperConfig = function getPopperConfig() {
        const _this = this;

        let popperConfig = {
            placement: _this.getPlacement(),
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: _this.getOffset()
                    }
                },
                {
                    name: 'flip',
                    enabled: _this.config.flip,
                    option: {
                        boundary: _this.config.boundary
                    }
                }
            ]
        };

        return popperConfig;
    };

    Dropdown.jqueryInterface = function jqueryInterface(config) {
        return this.each(function () {
            let data = $(this).data(DROPDOWN_EVENT_KEY);

            let _config = $(this).data(DROPDOWN_EVENT_KEY) ? $(this).data(DROPDOWN_EVENT_KEY) : zykApp.configSpread(DROPDOWN_DEFAULT, $(this).data());

            if (!data) {
                data = new Dropdown(this, _config);
                $(this).data(DROPDOWN_EVENT_KEY, data);
            }

            if (typeof config == 'string') {
                if (typeof data[config] == 'undefined') {
                    throw new TypeError('No method named ' + '"' + config + '"');
                }

                data[config]();
            }
        });
    };

    Dropdown.clearMenus = function clearMenus(event) {
        let toggles = [].slice.call(document.querySelectorAll(DROPDOWN_SELECTOR.TOGGLE));

        for (let i = 0; i < toggles.length; i++) {
            let parent = $(toggles[i]).parent();
            let context = $(toggles[i]).data(DROPDOWN_EVENT_KEY);

            if (!context) {
                continue;
            }

            let dropdownMenu = context.menu;

            if (!$(dropdownMenu).hasClass(DROPDOWN_CLASS.SHOW)) {
                continue;
            }

            if (event && event.type === 'click' && /input|textarea|select/i.test(event.target.tagName)) {
                continue;
            }

            if (context.popper) {
                context.popper.destroy();
            }

            context.isShown = false;

            $(dropdownMenu).removeClass(DROPDOWN_CLASS.SHOW);
            $(parent).trigger(DROPDOWN_EVENT.HIDDEN);
        }
    };

    return Dropdown;
})();

$(document)
    .on(DROPDOWN_EVENT.CLICK, Dropdown.clearMenus)
    .on(DROPDOWN_EVENT.CLICK, DROPDOWN_SELECTOR.TOGGLE, function (e) {
        e.preventDefault();
        e.stopPropagation();

        Dropdown.jqueryInterface.call($(this), 'toggle');
    });

$.fn[DROPDOWN_NAME] = Dropdown.jqueryInterface;
$.fn[DROPDOWN_NAME].constructor = Dropdown;

/*
=========================================================
TOOLTIP
=========================================================
*/

const TOOLTIP_NAME = 'tooltip';
const TOOLTIP_EVENT_KEY = `${ZYK_DATA_KEY}.${TOOLTIP_NAME}`;

const TOOLTIP_EVENT = {
    MOUSEENTER: `mouseenter.${TOOLTIP_EVENT_KEY}`,
    MOUSELEAVE: `mouseleave.${TOOLTIP_EVENT_KEY}`,
    CLICK: `click.${TOOLTIP_EVENT_KEY}`,
    SHOW: `show.${TOOLTIP_EVENT_KEY}`,
    SHOWN: `shown.${TOOLTIP_EVENT_KEY}`,
    HIDE: `hide.${TOOLTIP_EVENT_KEY}`,
    HIDDEN: `hidden.${TOOLTIP_EVENT_KEY}`
};

const TOOLTIP_CLASS = {
    TOOLTIP: 'tooltip'
};

const TOOLTIP_SELECTOR = {
    TOGGLE: '[data-toggle="tooltip"]',
    TOOLTIP: `.${TOOLTIP_CLASS.TOOLTIP}`
};

const TOOLTIP_PLACEMENT = {
    BOTTOM: 'bottom',
    TOP: 'top',
    LEFT: 'left',
    RIGHT: 'right'
};

const TOOLTIP_TRIGGER = {
    CLICK: 'click',
    HOVER: 'hover',
    MANUAL: 'manual'
};

const TOOLTIP_DEFAULT = {
    placement: TOOLTIP_PLACEMENT.TOP,
    flip: true,
    offset: [0, 0],
    trigger: TOOLTIP_TRIGGER.HOVER,
    html: false,
    template: `
        <div class="tooltip" role="tooltip">
            <div class="tooltip-inner"></div>
        </div>
    `,
    boundary: 'viewport'
};

var Tooltip = (function () {
    function Tooltip(element, options) {
        this.config = this.getConfig(options);

        this.element = element;

        this.tip = null;

        this.popper = null;
        this.tooltip = null;

        this.isEnabled = true;
        this.isShown = false;

        this.addListener();
    }

    const _proto = Tooltip.prototype;

    _proto.getConfig = function getConfig(config) {
        let dataAttributes = $(this.element).data();

        config = zykApp.configSpread(TOOLTIP_DEFAULT, dataAttributes, config);

        return config;
    };

    _proto.enabled = function enabled() {
        return (this.isEnabled = true);
    };

    _proto.disabled = function disabled() {
        return (this.isEnabled = false);
    };

    _proto.addListener = function addListener() {
        const _this = this;

        let triggers = _this.getDataAttribute('trigger').split(' ');

        $.each(triggers, function (index, trigger) {
            if (trigger == 'click') {
                $(_this.element).on(TOOLTIP_EVENT.CLICK, function (e) {
                    if (_this.element.tagName == 'A') {
                        e.preventDefault();
                    }

                    return _this.toggle();
                });
            } else if (trigger !== 'manual') {
                let eventIn = TOOLTIP_EVENT.MOUSEENTER;
                let eventOut = TOOLTIP_EVENT.MOUSELEAVE;

                $(_this.element).on(eventIn, function (e) {
                    return _this.enter(e);
                });

                $(_this.element).on(eventOut, function (e) {
                    return _this.leave(e);
                });
            }
        });
    };

    _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $(this.config.template)[0];

        return this.tip;
    };

    _proto.toggle = function toggle() {
        if (!this.isShown) {
            return this.show();
        } else {
            return this.hide();
        }
    };

    _proto.getTipTitle = function getTipTitle() {
        const _this = this;

        let title = $(_this.element).attr('title');

        $(_this.element).attr('data-original-title', title);
        $(_this.element).removeAttr('title');

        return title;
    };

    _proto.fixTitle = function fixTitle() {
        const _this = this;

        if (typeof $(_this.element).attr('data-original-title') != 'undefined') {
            let title = $(_this.element).attr('data-original-title');

            $(_this.element).attr('title', title);
            $(_this.element).removeAttr('data-original-title');
        }
    };

    _proto.enter = function enter() {
        return this.show();
    };

    _proto.leave = function leave() {
        return this.hide();
    };

    _proto.show = function show() {
        const _this = this;

        if (!_this.isEnabled) {
            return;
        }

        _this.clearTooltips();

        let text = _this.getTipTitle();
        let tip = _this.getTipElement();
        let placement = _this.getPlacement();

        if (_this.getDataAttribute('html')) {
            $(tip).find('.tooltip-inner').html(text);
        } else {
            $(tip).find('.tooltip-inner').text(text);
        }

        $(tip).addClass(`tooltip-${placement}`);

        $(_this.element).trigger(TOOLTIP_EVENT.SHOW);

        $(tip).appendTo('body');

        _this.popper = Popper.createPopper(_this.element, tip, _this.getPopperConfig());

        _this.isShown = true;

        $(_this.element).trigger(TOOLTIP_EVENT.SHOWN);
    };

    _proto.hide = function hide() {
        const _this = this;

        $(_this.element).trigger(TOOLTIP_EVENT.HIDE);

        _this.fixTitle();

        $(_this.tip).remove();

        _this.isShown = false;

        $(_this.element).trigger(TOOLTIP_EVENT.HIDDEN);
    };

    _proto.getOffset = function getOffset() {
        const _this = this;

        let offset = _this.getDataAttribute('offset');

        if (typeof offset == 'string') {
            offset.replace(',', ' ');
            offset = offset.split(',').map(Number);
        }

        return offset;
    };

    _proto.getPlacement = function getPlacement() {
        const _this = this;

        let placement = _this.getDataAttribute('placement') ? _this.getDataAttribute('placement') : _this.config.placement;

        return placement;
    };

    _proto.getDataAttribute = function getDataAttribute(attribute) {
        const _this = this;

        let dataAttrs = $(_this.element).data();

        let result = '';

        if (Object.keys(dataAttrs).indexOf(attribute) > -1) {
            result = $(_this.element).data(attribute);
        }

        return result;
    };

    _proto.getPopperConfig = function getPopperConfig() {
        const _this = this;

        let popperConfig = {
            placement: _this.getPlacement(),
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: _this.getOffset()
                    }
                },
                {
                    name: 'flip',
                    enabled: _this.config.flip,
                    option: {
                        boundary: _this.config.boundary
                    }
                }
            ]
        };

        return popperConfig;
    };

    _proto.clearTooltips = function clearTooltip() {
        $('body').find(TOOLTIP_SELECTOR.TOOLTIP).remove();
    };

    Tooltip.jqueryInterface = function jqueryInterface(config) {
        return this.each(function () {
            let data = $(this).data(TOOLTIP_EVENT_KEY);

            let _config = typeof config === 'object' && config;

            if (!data && /dispose|hide/.test(config)) {
                return;
            }

            if (!data) {
                data = new Tooltip(this, _config);
                $(this).data(TOOLTIP_EVENT_KEY, data);
            }

            if (typeof config == 'string') {
                if (typeof data[config] == 'undefined') {
                    throw new TypeError('No method named ' + '"' + config + '"');
                }

                data[config]();
            }
        });
    };

    return Tooltip;
})();

$.fn[TOOLTIP_NAME] = Tooltip.jqueryInterface;
$.fn[TOOLTIP_NAME].constructor = Tooltip;

/*
=========================================================
TAB
=========================================================
*/

const TAB_NAME = 'tab';
const TAB_EVENT_KEY = `${ZYK_DATA_KEY}.${TAB_NAME}`;

const TAB_CLASS = {
    CONTROL: 'tab-controls',
    ITEM: 'tab-item',
    CONTENT: 'tab-content',
    PANE: 'tab-pane',
    ACTIVE: 'active',
    SHOW: 'show',
    FADE: 'fade',
    DISABLED: 'disabled'
};

const TAB_SELECTOR = {
    TOGGLE: '[data-toggle="tab"]',
    CONTROL: `.${TAB_CLASS.CONTROL}`,
    ITEM: `.${TAB_CLASS.ITEM}`,
    CONTENT: `.${TAB_CLASS.CONTENT}`,
    PANE: `.${TAB_CLASS.PANE}`,
    PANECURRENT: `.${TAB_CLASS.PANE}.${TAB_CLASS.SHOW}`
};

const TAB_EVENT = {
    CLICK: `click.${TAB_EVENT_KEY}`,
    SHOW: `show.${TAB_EVENT_KEY}`,
    SHOWN: `shown.${TAB_EVENT_KEY}`,
    HIDE: `hide.${TAB_EVENT_KEY}`,
    HIDDEN: `hidden.${TAB_EVENT_KEY}`
};

const TAB_DEFAULT = {};

var Tab = (function () {
    function Tab(element) {
        this.element = element;

        this.current = this.getCurrent();
    }

    const _proto = Tab.prototype;

    _proto.toggle = function toggle(target) {
        if ($(target).hasClass(TAB_CLASS.DISABLED) || $(target).attr('disabled') || $(target).hasClass(TAB_CLASS.ACTIVE)) {
            return;
        }

        this.show(target);
    };

    _proto.show = function show(target) {
        const _this = this;

        let paneId = $(target).data('target');

        $(paneId).trigger(TAB_EVENT.SHOW);

        _this.hide(_this.current);

        if ($(paneId).hasClass(TAB_CLASS.FADE)) {
            $(paneId).fadeIn();
        } else {
            $(paneId).show();
        }
        $(paneId).addClass(TAB_CLASS.SHOW);

        $(paneId).trigger(TAB_EVENT.SHOWN);

        $(target).parent().find(TAB_SELECTOR.ITEM).removeClass(TAB_CLASS.ACTIVE);
        $(target).addClass(TAB_CLASS.ACTIVE);
    };

    _proto.hide = function hide(target) {
        $(target).trigger(TAB_EVENT.HIDE);

        $(target).parent().find(TAB_SELECTOR.PANE).removeClass(TAB_CLASS.SHOW);
        $(target).parent().find(TAB_SELECTOR.PANE).removeAttr('style');

        $(target).trigger(TAB_EVENT.HIDDEN);
    };

    _proto.getCurrent = function gerCurrent() {
        const _this = this;

        let current = $(_this.element).parent().find(TAB_SELECTOR.PANECURRENT);

        return current;
    };

    Tab.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function () {
            let data = $(this).data(TAB_EVENT_KEY);

            let _config = zykApp.configSpread(TAB_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {});

            if (!data) {
                data = new Tab(this, _config);
                $(this).data(TAB_EVENT_KEY, data);
            }

            if (typeof config == 'string') {
                if (typeof data[config] == 'undefined') {
                    throw new TypeError('No method named ' + '"' + config + '"');
                }

                data[config](target);
            } else if (_config.toggle) {
                data.toggle(target);
            }
        });
    };

    return Tab;
})();

$(document).on(TAB_EVENT.CLICK, TAB_SELECTOR.TOGGLE, function (e) {
    let target = $(this).data('target');

    let config = $(target).data(TAB_EVENT_KEY) ? 'toggle' : zykApp.configSpread($(target).data(), $(this).data());

    if (this.tagName == 'A') {
        e.preventDefault();
    }

    Tab.jqueryInterface.call($(target), config, this);
});

$.fn[TAB_NAME] = Tab.jqueryInterface;
$.fn[TAB_NAME].constructor = Tab;
