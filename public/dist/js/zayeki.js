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

const DATA_KEY = 'zyk'

/*
=========================================================
UTIL
=========================================================
*/

const zykKeys = {
    escapeKey: 27
}

const zykUtil = {
    typeOf(obj){
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
    },

    configSpread(source) {
        let obj = []
        for (let i = 0; i< arguments.length; i++){
            let sourceArg = arguments[i] != null ? arguments[i] : {}

            if(this.typeOf(sourceArg) == 'object'){
                obj.push(sourceArg)
            }
        }

        source = obj.reduce(function(r, c){
            return Object.assign(r, c)
        }, {})

        return source
    },

    bodyBlock(option){
        if(option){
            $('body').removeClass('overflow-on')
            $('body').addClass('overflow-off')
        } else {
            $('body').removeClass('overflow-off')
            $('body').addClass('overflow-on')
        }
    }
}

/*
=========================================================
Helper functions
=========================================================
*/

/*
=========================================================
POAL (POPUP ALERTS)
=========================================================
*/
class Poal {
    constructor(options) {
        let defaultOptions = {
            'type': 'default',
            'title': 'This is Alert Title',
            'message': 'This is the Alert\'s message',

            'cancelButtonClass': 'btn-default',
            'cancelButtonText': 'Cancel',
            'confirmButtonClass': 'btn-success',
            'confirmButtonText': 'Confirm',
        }

        this.config = {
            ...defaultOptions,
            ...options
        }

        this.$btn = $('.btn-poal')

        this.fire()
    }

    fire() {
        $('body').append(this.template())

        let _self = this

        setTimeout(() => {
            _self.transition()
        }, 100)

        this.initEvent()
    }

    transition() {
        $(document).find('.poal').addClass('show')
    }

    initEvent() {
        $(document).on('click', '.btn-cancel', this.dismiss.bind(this))
        $(document).on('click', '.btn-confirm', this.confirm.bind(this))
        $(document).on('click', '.poal-backdrop', this.dismiss.bind(this))
    }

    template() {
        let popup = `
            <div class="poal poal-${this.config.type}">
                <div class="poal-backdrop"></div>
                <div class="poal-dialog">
                    <div class="poal-content">
                        <div class="poal-header">
                            <h3>
                                ${this.config.title}
                            </h3>
                        </div>

                        <div class="poal-body">
                            <p>
                                ${this.config.message}
                            </p>
                        </div>

                        <div class="poal-actions">
                            <button class="btn ${this.config.cancelButtonClass} btn-cancel" type="button">
                                ${this.config.cancelButtonText}
                            </button>
                            <button class="btn ${this.config.confirmButtonClass} btn-confirm" type="button">
                                ${this.config.confirmButtonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
        return popup
    }

    dismiss(e){
        $(e.target).closest('.poal').remove()
    }

    confirm(e){
        $(e.target).closest('.poal').remove()

        this.callbackConfirm()
    }

    callbackConfirm(){
        console.log('callback')
    }
}

/*
=========================================================
GUIDE
=========================================================
*/

let guide_data = {}
guide_data['buttonPrimary'] = 'This is btn primary'
guide_data['buttonSuccess'] = 'This is btn success'

class Guide {
    constructor(target, options) {
        let defaultOptions = {
            trigger: 'manual',
            container: 'body',
            html: true,
            content: guide_data[target],
            template: `
                <div class="popover popover-guide" role="tooltip">
                    <div class="arrow"></div>
                    <h3 class="popover-header"></h3>
                    <div class="popover-body"></div>
                </div>
            `
        }

        this.config = {
            ...defaultOptions,
            ...options
        }

        this.fire(target)
    }

    fire(element) {
        const _this = this

        // Remove all shown popover
        $('body').find('.popover').remove()

        // Set config for Guide
        $('#' + element).popover(_this.config)

        // Show Guide
        $('#' + element).popover('show')

        // Init hide Guide

        $(document).on('click.el.guide', function (e) {
            if (
                !$('body').find('.popover').is(e.target) &&
                $('body').find('.popover').has(e.target).length === 0
            ) {
                $(document).off('click.el.guide')

                return _this.hide(element)
            }
        })

        $('#' + element).on('click.el.guidedismiss', function () {
            $('#' + element).off('click.el.guidedismiss')

            _this.hide(element)
        })
    }

    hide(element) {
        $('#' + element).popover('hide')
    }
}


/*
=========================================================
CALENDAR
=========================================================
*/
class Calendar{
    constructor(target, options){
        let defaultOptions = {
            view: 'month',
            lang: 'en',

            header: {
                'controls': ['control', 'today'],
                'title': true,
                'views': ['month', 'week', 'day']
            },

            body:{
                'tableHeader': {
                    'type': 'daysOfWeek',
                },
                'tableBody': {
                    'disablePast': false
                }
            },

            buttonClass: {
                'default': 'btn btn-sm btn-default',
                'active': 'btn btn-sm btn-primary',
            },

            icons: {
                'prev': 'fas fa-caret-left',
                'next': 'fas fa-caret-right'
            },

            dayRatio: 0.5,
            dayFormat: 'd/m/y',

            events: [],
            eventOnClick: function(){
                console.log('Click on Event')
            },
        }

        this.config = {
            ...defaultOptions,
            ...options
        }

        this.date = new Date()
        this.currentDate = this.getDate()
        this.currentMonth = this.getMonth()
        this.currentYear = this.getYear()

        this.contentText = zayekiCalendarLang[this.config.lang]

        this.target = target

        this.render(target)
    }

    render(element){
        const _this = this

        // Require zayeki-calendar-lang.js for language in Calendar
        if (typeof zayekiCalendarLang == 'undefined') {
            throw new TypeError('Reuire zayeki-calendar-lang.js')

            return
        }

        // RESET CALENDAR INNER HTML
        $(element).html('')

        // APPEND CALENDAR HEADER
        if (_this.config.header && _this.config.header != '') {
            $(element).append('<div class="calendar-header"></div>')
            $(element).find('.calendar-header').html(_this.getCalendarHeader())
        }

        // APPEND CALENDAR BODY
        let calendarBodyExtra = ''

        if(this.config.view == 'week'){
            calendarBodyExtra = 'calendar-body-week'
        } else if (this.config.view == 'day'){
            calendarBodyExtra = 'calendar-body-day'
        }

        $(element).append(`<div class="calendar-body ${calendarBodyExtra} overflow-y"></div>`)
        $(element).find('.calendar-body').html(_this.getCalendarBody())

        this.setTableColSize()

        this.getEvents()

        this.initActions()
    }


    getYear(){
        let year = this.date.getFullYear()

        return year
    }

    getPrevYear(){
        let year = this.currentYear

        let prevYear = year - 1

        return prevYear
    }

    getNextYear() {
        let year = this.currentYear

        let nextYear = year + 1

        return nextYear
    }

    getMonth(){
        let month = this.date.getMonth()

        return month
    }

    getPrevMonth() {
        let prevMonth

        let currentMonth = this.currentMonth

        if (currentMonth > 0) {
            prevMonth = currentMonth - 1

            return prevMonth
        } else {
            prevMonth = 11

            return prevMonth
        }
    }

    getNextMonth(){
        let nextMonth

        let currentMonth = this.currentMonth

        if (currentMonth < 11) {
            nextMonth = currentMonth + 1

            return nextMonth
        } else {
            nextMonth = 0

            return nextMonth
        }
    }

    getDate(){
        let date = this.date.getDate()

        return date
    }

    getToday(date, month, year){
        const _this = this

        if (
            date == this.date.getDate()
            &&
            month == this.date.getMonth()
            &&
            year == this.date.getFullYear()
        ) {
            return true
        } else {
            return false
        }
    }

    getDaysInMonth(month, year){
        return 32 - new Date(year, month, 32).getDate()
    }

    getDaysInWeek(date = this.currentDate, month = this.currentMonth, year = this.currentYear){
        const _this = this

        let daysInWeek = []

        let dayInWeek

        if(date > _this.getDaysInMonth(month, year)){
            date = date - _this.getDaysInMonth(month, year)
        }

        if (new Date(`${year}-${month + 1}-${date}`).getDay() - 1 < 0){
            dayInWeek = 6
        } else {
            dayInWeek = new Date(`${year}-${month + 1}-${date}`).getDay() - 1
        }

        for(let i = 0; i < 7; i++){
            let offset = date - dayInWeek

            //daysInWeek[i] = i + offset

            if(i + offset > _this.getDaysInMonth(month, year)){
                daysInWeek[i] = i + offset - _this.getDaysInMonth(month, year)
            } else {
                daysInWeek[i] = i + offset
            }
        }

        return daysInWeek
    }

    getFirstDay(month, year){
        return (new Date(year, month)).getDay()
    }

    getCalendarHeader(){
        const _this = this

        let calendarHeader = ''

        if(_this.config.header && _this.config.header != ''){

            $.each(_this.config.header, (key) => {
                calendarHeader += `
                    <div class="calendar-header-${key}">
                        ${_this.getCalendarHeaderElements(key)}
                    </div>
                `
            })
        }

        return calendarHeader
    }

    getCalendarHeaderElements(part){
        const _this = this

        let partElements = ``

        if(part == 'controls'){
            if (_this.config.header && _this.config.header != ''){
                if (_this.config.header.controls.indexOf('control') > -1){
                    partElements += `
                        <div class="btn-group">
                            <button class="${_this.config.buttonClass.default} btn-calendar-prev" type="button">
                                <i class="${_this.config.icons.prev}"></i>
                            </button>

                            <button class="${_this.config.buttonClass.default} btn-calendar-next" type="button">
                                <i class="${_this.config.icons.next}"></i>
                            </button>
                        </div>
                    `
                }

                if (_this.config.header.controls.indexOf('today') > -1) {
                    partElements += `
                        <button class="${_this.config.buttonClass.default} btn-calendar-today" type="button">
                            ${_this.contentText.today}
                        </button>
                    `
                }
            } else {
                throw new TypeError('Calendar configs header controls failed!')
            }
        } else if (part == 'title'){
            if(_this.date != null || _this.config.header.title){
                if(_this.config.view == 'month'){
                    partElements += `
                        <h6>${_this.contentText.months[_this.currentMonth]} ${_this.currentYear}</h6>
                    `
                } else if (_this.config.view == 'week'){
                    if(_this.config.dayFormat == 'd/m/y'){
                        partElements += `
                            <h6>${_this.getDaysInWeek()[0]} - ${_this.getDaysInWeek()[6]} ${_this.contentText.months[_this.currentMonth]} ${_this.currentYear}</h6>
                        `
                    } else if (_this.config.dayFormat == 'm/d/y'){
                        partElements += `
                            <h6>${_this.contentText.months[_this.currentMonth]} ${_this.getDaysInWeek()[0]} - ${_this.getDaysInWeek()[6]}, ${_this.currentYear}</h6>
                        `
                    } else {
                        partElements += `
                            <h6>${_this.getDaysInWeek()[0]} - ${_this.getDaysInWeek()[6]} ${_this.contentText.months[_this.currentMonth]} ${_this.currentYear}</h6>
                        `

                        console.log('Calendar Day Format isn\'t not supported! Calendar Day Format changed into \'d/m/y \'')
                    }
                }
            } else if (_this.date == null) {
                throw new TypeError('Can\'t get Date from your computer!')
            }
        } else if (part == 'views'){
            let buttons = ''

            if (_this.config.header.views && _this.config.header.views != '') {
                $.each(_this.config.header.views, (key, value) => {
                    if (_this.config.header.views.indexOf(value) > -1) {
                        buttons += `<button class="${_this.config.view == value ? _this.config.buttonClass.active : _this.config.buttonClass.default} btn-calendar-view" type="button" data-view="${value}">${value}</button>`
                    }
                })
            }

            partElements += `
                <div class="btn-group">
                    ${buttons}
                </div>
            `
        }

        return partElements
    }

    getCalendarBody() {
        const _this = this

        let tableHeader = ''
        let tableHeaderContent = ''
        let tableBody = ''


        if(this.config.view == 'month'){
            if (Object.keys(_this.contentText).indexOf(_this.config.body.tableHeader.type) > -1) {
                $.each(_this.contentText[_this.config.body.tableHeader.type], (key, value) => {
                    tableHeaderContent += _this.getTableCol(value, '', '', false)
                })

                tableHeader += _this.getTableRow(tableHeaderContent)
            } else {
                throw new TypeError('There is no type of Calendar Table Header Type')
            }

            tableBody += _this.getTable('month')
        } else if (this.config.view == 'week'){
            tableHeaderContent += _this.getTableCol('', '', '', false, 'calendar-table-col-hour')

            $.each(_this.contentText['daysOfWeekShort'], (key, value) => {
                tableHeaderContent += _this.getTableCol(value, '', '', false, 'calendar-table-col-day')
            })

            tableHeaderContent += _this.getTableCol('', '', '', false, 'calendar-table-col-hour')
            $.each(_this.getDaysInWeek(), function(key, value){
                tableHeaderContent += _this.getTableCol(value, _this.currentMonth, _this.currentYear, false)
            })

            tableHeader += _this.getTableRow(tableHeaderContent)

            tableBody += _this.getTable('week')
        } else if (this.config.view == 'day'){

        }

        let table = `
            <div class="calendar-table">
                <div class="calendar-table-header">${tableHeader}</div>
                <div class="calendar-table-body">${tableBody}</div>
            </div>
        `

        return table
    }

    getTable(view, month = this.currentMonth, year = this.currentYear){
        const _this = this

        let tableContent = ''

        if(view == 'month'){
            let date = 1
            let firstDay

            if(_this.getFirstDay(month, year) - 1 < 0){
                firstDay = 6
            } else {
                firstDay = _this.getFirstDay(month, year) - 1
            }

            for (let r = 0; r < 6; r++) {
                let rowContent = ''

                for (let c = 0; c < 7; c++) {
                    if (r == 0 && c < firstDay) {
                        // GET DATE OF PREV MONTH ON VIEW
                        let prevDays

                        if(month == 0){
                            prevDays = _this.getDaysInMonth(_this.getPrevMonth(), _this.getPrevYear())

                            rowContent += _this.getTableCol(prevDays + firstDay * -1 + 1 + c, _this.getPrevMonth(), _this.getPrevYear())
                        } else {
                            prevDays = _this.getDaysInMonth(_this.getPrevMonth(), year)

                            rowContent += _this.getTableCol(prevDays + firstDay * -1 + 1 + c, _this.getPrevMonth(), year)
                        }

                        prevDays--
                    } else if (r > 0 && date > _this.getDaysInMonth(month, year)){
                        // GET DATE OF NEXT MONTH ON VIEW
                        if(month == 11){
                            rowContent += _this.getTableCol(date - _this.getDaysInMonth(month, year), _this.getNextMonth(), _this.getNextYear())
                        } else {
                            rowContent += _this.getTableCol(date - _this.getDaysInMonth(month, year), _this.getNextMonth(), year)
                        }

                        date++
                    } else {
                        // GET DATE OF MONTH ON VIEW
                        rowContent += _this.getTableCol(date, month, year)
                        date++
                    }
                }

                tableContent += _this.getTableRow(rowContent)
            }
        } else if(view == 'week'){
            for(let h = 0; h < 24; h++){
                let rowContent = ''
                let timeText
                if(h < 10){
                    timeText = '0' + h + ':' + '00'
                } else {
                    timeText = h + ':' + '00'
                }

                rowContent += _this.getTableCol(timeText, _this.currentMonth, '', false, 'calendar-table-col-hour')

                    for(let c = 0; c < 7; c++){
                        rowContent += _this.getTableCol('', _this.currentMonth, '')
                    }

                tableContent += _this.getTableRow(rowContent)
            }
        }

        return tableContent
    }

    getTableRow(rowContent){
        return `
            <div class="calendar-table-row">${rowContent}</div>
        `
    }

    getTableCol(colContent, month, year, tableBodyDays = true, extraClass = ''){
        const _this = this

        return `
            <div class = "calendar-table-col ${extraClass} ${(tableBodyDays && month != _this.currentMonth) ? 'calendar-table-col-faded' : ''}">
                ${(() => {
                    if(tableBodyDays){
                        return `
                            <a href="#" class="calendar-table-day ${_this.getToday(colContent, month, year) ? 'calendar-table-today' : ''}" data-calendar-day="${year}-${(month + 1) >= 10 ? month + 1 : '0' + (month + 1)}-${(colContent >= 10) ? colContent : '0' + colContent}">
                                <span>${colContent}</span>
                            </a>
                        `
                    } else {
                        return `<span class="${_this.getToday(colContent, month, year) ? 'calendar-span-today' : ''}" data-calendar-day="${year}-${(month + 1) >= 10 ? month + 1 : '0' + (month + 1)}-${(colContent >= 10) ? colContent : '0' + colContent}">${colContent}</span>`
                    }
                })()}
            </div>
        `
    }

    setTableColSize(){
        const _this = this

        $(this.target).find('.calendar-table-day').each(function(){
            if(_this.config.view == 'month'){
                $(this).css({
                    height: $(this).width() * _this.config.dayRatio + 'px'
                })
            } else if (_this.config.view == 'week'){
                $(this).css({
                    height: $(this).width() * 1 + 'px'
                })
            }

        })
    }

    getEvents(){
        const _this = this

        if (Object.keys(_this.config.events).length > 0) {
            $('.calendar-table-day').each(function () {
                let eventDay = $(this).data('calendar-day')
                if (Object.keys(_this.config.events).indexOf(eventDay) > -1) {
                    $(this).append(`<b>${_this.config.events[eventDay].length} <i class="els el-stream"></i></b>`)
                }

                $(this).unbind().on('click', function () {
                    if (_this.config.eventOnClick) {
                        _this.config.eventOnClick(this)
                    }
                })
            })
        }
    }

    initActions(){
        this.actionHeader()
    }

    actionHeader(){
        this.getCalendarNext()
        this.getCalendarPrev()
        this.getCalendarToday()

        this.changeCalendarView()
    }

    getCalendarNext(){
        const _this = this

        $(this.target).find('.btn-calendar-next').unbind().on('click', function(){
            if(_this.config.view == 'month'){
                if(_this.currentMonth == 11){
                    _this.currentMonth = _this.getNextMonth()
                    _this.currentYear = _this.getNextYear()

                    _this.render(_this.target)
                } else {
                    _this.currentMonth = _this.getNextMonth()

                    _this.render(_this.target)
                }
            } else if(_this.config.view == 'week'){
                if (_this.currentDate + 7 > _this.getDaysInMonth(_this.currentMonth, _this.currentYear)){
                    _this.currentDate = _this.currentDate + 7 - _this.getDaysInMonth(_this.currentMonth, _this.currentYear)
                } else {
                    _this.currentDate = _this.currentDate + 7
                }

                _this.render(_this.target)
            }
        })
    }

    getCalendarPrev() {
        const _this = this

        $(this.target).find('.btn-calendar-prev').unbind().on('click', function () {
            if (_this.config.view == 'month') {
                if (_this.currentMonth == 0) {
                    _this.currentMonth = _this.getPrevMonth()
                    _this.currentYear = _this.getPrevYear()

                    _this.render(_this.target)
                } else {
                    _this.currentMonth = _this.getPrevMonth()

                    _this.render(_this.target)
                }
            }
        })
    }

    getCalendarToday(){
        const _this = this

        $(this.target).find('.btn-calendar-today').unbind().on('click', function () {
            if (_this.config.view == 'month') {
                _this.currentMonth = _this.date.getMonth()
                _this.currentYear = _this.date.getFullYear()

                _this.render(_this.target)
            }
        })
    }

    changeCalendarView(){
        const _this = this

        $(this.target).find('.btn-calendar-view').unbind().on('click', function () {
            let dataView = $(this).data('view')

            _this.config.view = dataView

            // RESET CURRENT TIME WHEN CHANGE VIEW
            // _this.currentDate = _this.date.getDate()
            // _this.currentMonth = _this.date.getMonth()
            // _this.currentYear = _this.date.getYear()

            _this.render(_this.target)
        })
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
            limit: 2,
            action: 'javascipt:void(0);'
        }

        this.config = {
            ...defaultOptions,
            ...options
        }

        this.element = element

        this.render()
    }

    render() {
        const _this = this

        $(this.element).html(_this.template())
    }

    template() {
        const _this = this

        let template = `
            <a href="#" class="pagination-item pagination-item-first btn ${_this.config.current == 1 ? 'disabled' : ''}" role="button" onclick="${_this.config.action}(1)" ${_this.config.current == 1 ? 'disabled' : ''}>
                <i class="els el-go-first"></i>
            </a>
            <a href="#" class="pagination-item pagination-item-prev btn ${_this.config.current == 1 ? 'disabled' : ''}" role="button" onclick="${_this.config.action}(${_this.config.current - 1})" ${_this.config.current == 1 ? 'disabled' : ''}>
                <i class="els el-caret-left"></i>
            </a>

            ${this.getListPages()}

            <a href="#" class="pagination-item pagination-item-next btn ${_this.config.current == _this.config.limit ? 'disabled' : ''}" role="button" onclick="${_this.config.action}(${_this.config.current + 1})" ${_this.config.current == _this.config.limit ? 'disabled' : ''}>
                <i class="els el-caret-right"></i>
            </a>
            <a href="#" class="pagination-item pagination-item-last btn ${_this.config.current == _this.config.limit ? 'disabled' : ''}" onclick="${_this.config.action}(${_this.config.limit})" role="button" ${_this.config.current == _this.config.limit ? 'disabled' : ''}>
                <i class="els el-go-last"></i>
            </a>
        `

        return template
    }

    getListPages() {
        const _this = this

        let range = 5

        let from = this.config.current - 2
        let to = this.config.current + 2

        let list = ''

        if (this.config.limit > range) {
            if (from <= 1) {
                for (let i = 1; i <= to; i++) {
                    list += `
                            <a href="#" class="pagination-item btn ${(i == _this.config.current) ? 'active' : ''}" role="button" onclick="${_this.config.action}(${i})" data-pagination-page="${i}">${i}</a>
                        `
                }

                list += `
                    <a href="#" class="pagination-item btn disabled" role="button" disabled>...</a>
                `
            } else if (from > 1 && to < _this.config.limit) {
                list += `
                    <a href="#" class="pagination-item btn disabled" role="button" disabled>...</a>
                `

                for (let i = from; i <= to; i++) {
                    list += `
                            <a href="#" class="pagination-item btn ${(i == _this.config.current) ? 'active' : ''}" role="button" onclick="${_this.config.action}(${i})" data-pagination-page="${i}">${i}</a>
                        `
                }

                list += `
                    <a href="#" class="pagination-item btn disabled" role="button" disabled>...</a>
                `
            } else if (to >= _this.config.limit) {
                list += `
                    <a href="#" class="pagination-item btn disabled" role="button" disabled>...</a>
                `

                for (let i = from; i <= _this.config.limit; i++) {
                    list += `
                            <a href="#" class="pagination-item btn ${(i == _this.config.current) ? 'active' : ''}" role="button" onclick="${_this.config.action}(${i})" data-pagination-page="${i}">${i}</a>
                        `
                }
            }
        } else {
            for (let i = 1; i <= this.config.limit; i++) {
                list += `
                    <a href="#" class="pagination-item btn ${(i == _this.config.current) ? 'active' : ''}" role="button" onclick="${_this.config.action}(${i})" data-pagination-page="${i}">${i}</a>
                `
            }
        }

        return list
    }
}

/*
=========================================================
DATEPICKER
=========================================================
*/

class Datepicker {
    constructor(target, options){
        let defaultOptions = {

        }

        this.config = {
            ...defaultOptions,
            ...options
        }

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
        }

        this.button = target

        this.fire()
    }

    fire(){
        if ($('body').find('.popover-datepicker').length > 0){
            $('body').find('.popover-datepicker').remove()
        }

        $(this.button).popover(this.popoverConfig)
        $(this.button).popover('show')

        this.initEvent()
    }

    hide(){
        $(this.button).popover('hide')
    }

    initEvent(){
        const _this = this

        $(document).on('click.zyk.datepicker', function (e) {
            if (
                !$(document).find('.popover-datepicker').is(e.target) &&
                $(document).find('.popover-datepicker').has(e.target).length === 0
            ){
                $(_this.button).popover('hide')
            }
        }.bind(_this))
    }

    template(){

    }
}

/*
=========================================================
POPUP
=========================================================
*/

const POPUP_NAME = 'popup'
const POPUP_EVENT_KEY = `${DATA_KEY}.${POPUP_NAME}`

const POPUP_CLASSNAME = {
    SHOW: 'show',
    HIDE: 'hide',
    FADE: 'fade',
    FOCUS: 'focus',
    DARK: 'dark',
    DIALOG: 'popup-dialog',
    BACKDROP: 'popup-backdrop',
    BODY: 'popup-body'
}

const POPUP_SELECTOR = {
    DIALOG: `.${POPUP_CLASSNAME.DIALOG}`,
    BACKDROP: `.${POPUP_CLASSNAME.BACKDROP}`,
    POPUP_BODY: `.${POPUP_CLASSNAME.BODY}`,
    TOGGLE: '[data-toggle="popup"]',
    DISMISS: '[data-dismiss="popup"]',
}

const POPUP_DEFAULT = {
    backdrop: true,
    focus: true,
    keyboard: true,
}

const POPUP_DEFAULT_TYPE = {
    backdrop : '(boolean|string)',
    focus: 'boolean',
    keyboard: 'boolean'
}

const POPUP_EVENT = {
    SHOW : `show.${POPUP_EVENT_KEY}`,
    SHOWN : `shown.${POPUP_EVENT_KEY}`,
    HIDE : `hide.${POPUP_EVENT_KEY}`,
    HIDDEN : `hidden.${POPUP_EVENT_KEY}`,
    CLICK_DISMISS: `click.dismiss.${POPUP_EVENT_KEY}`,
    MOUSEDOWN_DISMISS: `mousedown.dismiss.${POPUP_EVENT_KEY}`,
    MOUSEUP_DISMISS: `mouseup.dismiss.${POPUP_EVENT_KEY}`,
    CLICK: `click.${POPUP_EVENT_KEY}`,
    KEYDOWN_DISMISS: `keydown.dismiss.${POPUP_EVENT_KEY}`,
    FOCUSIN: `focusin.${POPUP_EVENT_KEY}`
}

const POPUP_VAR = {
    BACKDROP: null,
    IS_SHOWN: false,
    IGNOREBACKDROPCLICK: false,
    IS_TRANSITION: false,
    TRANSITION: 100
}

var Popup = function(){
    function Popup(element, config){

        this.config = this.getConfig(config)

        this.backdrop = POPUP_VAR.BACKDROP
        this.isShown = POPUP_VAR.IS_SHOWN
        this.ignoreBackdropClick = POPUP_VAR.IGNOREBACKDROPCLICK
        this.isTransition = POPUP_VAR.IS_TRANSITION

        this.element = element
        this.dialog = element.querySelector(POPUP_SELECTOR.DIALOG)

        this.hasFade = $(this.element).hasClass(POPUP_CLASSNAME.FADE)
    }

    const _proto = Popup.prototype

    _proto.getConfig = function getConfig(config){
        config = zykUtil.configSpread(POPUP_DEFAULT, config)

        return config
    }

    _proto.toggle = function toggle(target){
        return this.isShown ? this.hide() : this.show(target)
    }

    _proto.show = function show(target) {
        const _this = this

        if(this.isShown){
            return;
        }

        // Block body
        zykUtil.bodyBlock(true)

        let showEvent = $.Event(POPUP_EVENT.SHOW, {
            target: target
        })

        $(this.element).trigger(showEvent)

        this.isShown = true

        this.keepOnViewPort()

        this.setEscapeEvent()

        $(this.element).one(POPUP_EVENT.CLICK_DISMISS, POPUP_SELECTOR.DISMISS, function(e){
            return _this.hide(e)
        })

        $(this.dialog).off(POPUP_EVENT.CLICK_DISMISS)
        $(this.dialog).on(POPUP_EVENT.CLICK_DISMISS, function (e) {
            if($(_this.dialog).is(e.target)){
                return _this.hide(e)
            }
        })

        this.showBackdrop(function(){
            return _this.showElement(target)
        })
    }

    _proto.hide = function hide(e){
        const _this = this

        if(e){
            e.preventDefault()
        }

        let hideEvent = $.Event(POPUP_EVENT.HIDE)

        $(this.element).trigger(hideEvent)

        this.isShown = false

        this.hideElement()
    }

    _proto.showElement = function showElement(target){
        const _this = this

        this.element.style.display = 'block'

        if (this.hasFade) {
            setTimeout(function(){
                $(_this.element).addClass(POPUP_CLASSNAME.SHOW)
            }, POPUP_VAR.TRANSITION)
        } else {
            $(this.element).addClass(POPUP_CLASSNAME.SHOW)
        }

        if($(this.element).attr('tabindex') == null){
            $(this.element).attr('tabindex', -1)
        }

        if(this.config.focus){
            this.forceFocus()
        }

        let shownEvent = $.Event(POPUP_EVENT.SHOWN, {
            target: target
        })

        $(_this.element).trigger(shownEvent)
    }

    _proto.hideElement = function hideElement(){
        const _this = this

        $(this.element).removeClass(POPUP_CLASSNAME.SHOW)

        if (this.hasFade) {
            setTimeout(function(){
                _this.element.style.display = 'none'
            }, POPUP_VAR.TRANSITION)
        } else {
            this.element.style.display = 'none'
        }

        this.removeBackdrop()

        $(this.element).trigger(POPUP_EVENT.HIDDEN)

        // Unlock body
        zykUtil.bodyBlock(false)
    }

    _proto.showBackdrop = function showBackdrop(callback){
        const _this = this

        let focus = $(this.element).hasClass(POPUP_CLASSNAME.FOCUS)

        if(this.isShown && this.config.backdrop){
            this.backdrop = $(`<div class="${POPUP_CLASSNAME.BACKDROP}"></div>`)

            if(focus){
                $(this.backdrop).addClass(POPUP_CLASSNAME.FOCUS)
            }

            // Append POPUP BACKDROP to BODY
            $(this.backdrop).appendTo($('body'))

            if (this.hasFade) {
                setTimeout(function(){
                    $(_this.backdrop).addClass(POPUP_CLASSNAME.FADE)
                }, POPUP_VAR.TRANSITION)
            } else {
                $(this.backdrop).addClass(POPUP_CLASSNAME.SHOW)
            }

            $(this.backdrop).on(POPUP_EVENT.CLICK_DISMISS, function (e) {
                if(_this.config.backdrop == 'static'){
                    return
                } else{
                    _this.hide()
                }
            })
        }

        if(callback){
            callback()
        }
    }

    _proto.removeBackdrop = function removeBackdrop(){
        const _this = this

        if(this.backdrop){
            $(this.backdrop).remove()

            this.backdrop = null
        }
    }

    _proto.keepOnViewPort = function keepOnViewPort(){
        const _this = this

        let offsetTop = $(this.element).offset().top
        let vpHeight = window.innerHeight

        if(offsetTop > vpHeight){
            let scrollTop = offsetTop - vpHeight * 10 / 100

            $(window).scrollTop(scrollTop)
        }
    }

    _proto.forceFocus = function forceFocus(){
        const _this = this

        $(this.element).focus()

        // $(document).off(POPUP_EVENT.FOCUSIN)
        // $(document).on(POPUP_EVENT.FOCUSIN, function(e){
        //     console.log(e)
        //     if (document !== e.target && _this.element !== e.target && $(_this.element).has(e.target).length === 0){
        //         $(_this.element).focus()
        //     }
        // })
    }

    _proto.setEscapeEvent = function setEscapeEvent(){
        const _this = this

        if(this.isShown && this.config.keyboard){
            $(this.element).one(POPUP_EVENT.KEYDOWN_DISMISS, function(e){
                if(e.which === zykKeys.escapeKey){
                    e.preventDefault()

                    _this.hide()
                }
            })
        } else if (!this.isShown){
            $(this.element).off(POPUP_EVENT.KEYDOWN_DISMISS)
        }
    }

    Popup.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function(){
            let data = $(this).data(POPUP_EVENT_KEY)

            let _config = zykUtil.configSpread(POPUP_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {})

            if(!data){
                data = new Popup(this, _config)
                $(this).data(POPUP_EVENT_KEY, data)
            }

            if(typeof config == 'string'){
                if(typeof data[config] == 'undefined'){
                    throw new TypeError('No method named ' + '"' + config + '"')
                }

                data[config](target)
            } else if(_config.toggle){
                data.show(target)
            }
        })
    }

    return Popup
}()

$(document).on(POPUP_EVENT.CLICK, POPUP_SELECTOR.TOGGLE, function (e) {
    const _this = this

    let target = $(this).data('target')

    let config = $(target).data(POPUP_EVENT_KEY) ? 'toggle' : zykUtil.configSpread($(target).data(), $(this).data())

    if(this.tagName == 'a'){
        e.preventDefault()
    }

    var $target = $(target).one(POPUP_EVENT.SHOW, function (showEvent) {
        if(showEvent.isDefaultPrevented()){
            return
        }

        $target.one(POPUP_EVENT.HIDDEN, function(){
            // if($(_this).is(':visible')){
            //     console.log('visible')
            // }
        })
    })

    Popup.jqueryInterface.call($(target), config, this)
})

$.fn[POPUP_NAME] = Popup.jqueryInterface
$.fn[POPUP_NAME].constructor = Popup


/*
=========================================================
LISTVIEW
=========================================================
*/

const LISTVIEW_NAME = 'listview'
const LISTVIEW_EVENT_KEY = `${DATA_KEY}.${LISTVIEW_NAME}`

const LISTVIEW_CLASSNAME = {
    CONTROL: 'list-control',
    HEADER: 'list-header',
    BODY: 'list-body',
    FOOTER: 'list-footer',
}

const LISTVIEW_SELECTOR = {
    CONTROL: `.${LISTVIEW_CLASSNAME.CONTROL}`,
    HEADER: `.${LISTVIEW_CLASSNAME.HEADER}`,
    BODY: `.${LISTVIEW_CLASSNAME.BODY}`,
    FOOTER: `.${LISTVIEW_CLASSNAME.FOOTER}`,
}

const LISTVIEW_VIEW_OPTIONS = {
    LIST: 'list',
    GRID: 'grid'
}

const LISTVIEW_DEFAULT = {
    view: 'list'
}

const LISTVIEW_EVENT = {
    switch: `switch.${LISTVIEW_EVENT_KEY}`,
    switched: `switched.${LISTVIEW_EVENT_KEY}`
}

var Listview = function () {
    function Listview(element, config) {
        this.element = element
    }

    const _proto = Listview.prototype

    Listview.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function () {
            let listviewId = $(this).attr('id')
            let listviewMode = localStorage.getItem('listviewMode' + listviewId)

            if(!listviewMode){
                listviewMode = LISTVIEW_VIEW_OPTIONS.LIST
                localStorage.setItem('listviewMode' + listviewId, listviewMode)

                $(this).addClass('view-' + listviewMode)
            } else{
                console.log('co cmnr con dau nua')
            }
            console.log($(this))
        })
    }

    return Listview
}()

$.fn[LISTVIEW_NAME] = Listview.jqueryInterface
$.fn[LISTVIEW_NAME].constructor = Listview

/*
=========================================================
NAV HEADER
=========================================================
*/
const NAVHEADER_NAME = 'navheader'
const NAVHEADER_EVENT_KEY = `${DATA_KEY}.${NAVHEADER_NAME}`

const NAVHEADER_CLASSNAME = {
    NAV_MENU: '.nav-menu',

    BTN_EXPAND: '.btn-expand-nav',

    SHOW: 'show',
    ACTIVE: 'active'
}

const NAVHEADER_EVENTS = {
    CLICK: `click.${NAVHEADER_EVENT_KEY}`
}

class Navheader{
    constructor(element, options) {
        let defaultOptions = {
        }

        this.options = {
            ...defaultOptions,
            ...options
        }

        this.element = element

        this.btnExpand = $(this.element).find(NAVHEADER_CLASSNAME.BTN_EXPAND)
        this.navMenu = $(this.element).find(NAVHEADER_CLASSNAME.NAV_MENU)

        this.init()
    }

    init(){
        const _this = this

        $(document).on(NAVHEADER_EVENTS.CLICK, $(_this.btnExpand), function (e) {
            console.log(_this.btnExpand)
            $(_this.navMenu).toggleClass(NAVHEADER_CLASSNAME.SHOW)
            $(_this.btnExpand).toggleClass(NAVHEADER_CLASSNAME.ACTIVE)

            if ($(_this.btnExpand).hasClass(NAVHEADER_CLASSNAME.ACTIVE)){
                zykUtil.bodyBlock(true)
            } else {
                zykUtil.bodyBlock()
            }
        })
    }
}

/*
=========================================================
SLIDER
=========================================================
*/
const SLIDER_NAME = 'slider'
const SLIDER_EVENT_KEY = `${DATA_KEY}.${SLIDER_NAME}`

const SLIDER_CLASSNAME = {
    ACTIVE: 'active',
    ITEM : 'slider-item',
    ITEM_ACTIVE: 'slider-item.active',
    ITEM_PREV: 'slider-item-prev',
    ITEM_NEXT: 'slider-item-next',
    ITEM_PREPARE: 'slider-item-prepare'
}

const SLIDER_SELECTOR = {
    SLIDER: `.zyk-${SLIDER_NAME}`,

    ITEM : `.${SLIDER_CLASSNAME.ITEM}`,
    ITEM_ACTIVE: `.${SLIDER_CLASSNAME.ITEM_ACTIVE}`,
    ITEM_NEXT: `.${SLIDER_CLASSNAME.ITEM_NEXT}`,
    ITEM_PREV: `.${SLIDER_CLASSNAME.ITEM_PREV}`,
    ITEM_FIRST: `.${SLIDER_CLASSNAME.ITEM}:first-child`,
    ITEM_LAST: `.${SLIDER_CLASSNAME.ITEM}:last-child`,

    CONTROL_NEXT: `[data-slider-control="next"]`,
    CONTROL_PREV: `[data-slider-control="prev"]`,
}

const SLIDER_MOVEMENT = {
    NEXT: 'next',
    PREV: 'prev'
}

const SLIDER_DEFAULT = {
    transition: 1000,
    loop: true,
    autoplay: true,
    indicator: true
}

const SLIDER_EVENT = {
    CLICK: `click.${SLIDER_EVENT_KEY}`,

    SWITCH: `switch.${SLIDER_EVENT_KEY}`,
    SWITCHED: `switched.${SLIDER_EVENT_KEY}`
}

var Slider = function () {
    function Slider(element, config) {
        this.config = this.getConfig(config)
        this.element = element
        this.slideLength = $(this.element).find(SLIDER_SELECTOR.ITEM).length

        this.controlNext = $(this.element).find(SLIDER_SELECTOR.CONTROL_NEXT)
        this.controlPrev = $(this.element).find(SLIDER_SELECTOR.CONTROL_PREV)
    }

    const _proto = Slider.prototype

    _proto.getConfig = function getConfig(config){
        config = zykUtil.configSpread(SLIDER_DEFAULT, config)

        return config
    }

    _proto.getActiveSlide = function getActiveSlide() {
        let activeSlide = $(this.element).find(SLIDER_SELECTOR.ITEM_ACTIVE)
        return activeSlide
    }

    _proto.autoplay = function autoplay(target){
        // console.log('AUTOPLAY')

        // this.getPrepare()
        // this.next()
    }

    _proto.getPrepare = function getPrepare(movement){
        const _this = this

        if (typeof movement == 'string') {
            if (movement == SLIDER_MOVEMENT.NEXT || movement == SLIDER_MOVEMENT.PREV) {
                let activeSlide = this.getActiveSlide()

                if (movement == SLIDER_MOVEMENT.NEXT) {
                    if ($(activeSlide).index() < _this.slideLength - 1) {
                        $(activeSlide)
                            .next()
                            .addClass(SLIDER_CLASSNAME.ITEM_PREPARE)
                            .addClass(SLIDER_CLASSNAME.ITEM_NEXT)
                    } else {
                        if (_this.config.loop == true) {
                            $(_this.element).find(SLIDER_SELECTOR.ITEM_FIRST)
                                .addClass(SLIDER_CLASSNAME.ITEM_PREPARE)
                                .addClass(SLIDER_CLASSNAME.ITEM_NEXT)
                        } else {
                            return
                        }
                    }

                    setTimeout(function(){
                        _this.switchSlide(SLIDER_MOVEMENT.NEXT)
                    }, 100)
                } else if (movement == SLIDER_MOVEMENT.PREV) {
                    if ($(activeSlide).index() > 0) {
                        $(activeSlide)
                            .prev()
                            .addClass(SLIDER_CLASSNAME.ITEM_PREPARE)
                            .addClass(SLIDER_CLASSNAME.ITEM_PREV)
                    } else if ($(activeSlide).index() == 0) {
                        if (_this.config.loop == true) {
                            $(_this.element).find(SLIDER_SELECTOR.ITEM_LAST)
                                .addClass(SLIDER_CLASSNAME.ITEM_PREPARE)
                                .addClass(SLIDER_CLASSNAME.ITEM_PREV)
                        } else {
                            return
                        }
                    }

                    setTimeout(function () {
                        _this.switchSlide(SLIDER_MOVEMENT.PREV)
                    }, 100)
                } else {
                    throw new TypeError('Wrong Request')
                }
            }
        } else if (typeof movement == 'number') {
            if (movement < 0) {
                throw new TypeError('Wrong Request')
            }
        }
    }

    _proto.getSliderId = function getSliderId(element){
        let sliderId = $(element).closest('.slider')
        return sliderId
    }

    _proto.next = function next(target){
        let switchEvent = $.Event(SLIDER_EVENT.SWITCH, {
            target: target
        })

        $(this.element).trigger(switchEvent)

        this.getPrepare(SLIDER_MOVEMENT.NEXT)
    }

    _proto.prev = function prev(target) {
        let switchEvent = $.Event(SLIDER_EVENT.SWITCH, {
            target: target
        })

        $(this.element).trigger(switchEvent)

        this.getPrepare(SLIDER_MOVEMENT.PREV)
    }

    _proto.switchSlide = function switchSlide(movement, target) {
        let activeSlide = this.getActiveSlide()
        activeSlide.removeClass(SLIDER_CLASSNAME.ACTIVE)

        if (typeof movement == 'string') {
            if (movement == SLIDER_MOVEMENT.NEXT) {
                let $currentSlide = $(this.element).find(SLIDER_SELECTOR.ITEM_NEXT)

                $currentSlide
                    .removeClass(SLIDER_CLASSNAME.ITEM_NEXT)
                    .removeClass(SLIDER_CLASSNAME.ITEM_PREPARE)
                    .addClass(SLIDER_CLASSNAME.ACTIVE)
            } else if (movement == SLIDER_MOVEMENT.PREV) {
                let $currentSlide = $(this.element).find(SLIDER_SELECTOR.ITEM_PREV)

                $currentSlide
                    .removeClass(SLIDER_CLASSNAME.ITEM_PREV)
                    .removeClass(SLIDER_CLASSNAME.ITEM_PREPARE)
                    .addClass(SLIDER_CLASSNAME.ACTIVE)
            }
        } else if (typeof movement == 'number') {

        }

        let switchedEvent = $.Event(SLIDER_EVENT.SWITCHED, {
            target: target
        })

        $(this.element).trigger(switchedEvent)

        this.setControlVisible()
    }

    _proto.setControlVisible = function setControlVisible(){
        if(this.config.loop === false){
            if ($(this.getActiveSlide()).index() == this.slideLength - 1) {
                $(this.element).find(SLIDER_SELECTOR.CONTROL_NEXT).hide()
            } else {
                $(this.element).find(SLIDER_SELECTOR.CONTROL_NEXT).show()
            }

            if ($(this.getActiveSlide()).index() == 0) {
                $(this.element).find(SLIDER_SELECTOR.CONTROL_PREV).hide()
            } else {
                $(this.element).find(SLIDER_SELECTOR.CONTROL_PREV).show()
            }
        }
    }

    Slider.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function () {
            let data = $(this).data(SLIDER_EVENT_KEY)

            let _config = zykUtil.configSpread(SLIDER_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {})

            if(!data){
                data = new Slider(this, _config)
                $(this).data(SLIDER_EVENT_KEY, data)
            }

            if(typeof config == 'string'){
                if(typeof data[config] == 'undefined'){
                    throw new TypeError('No method named ' + '"' + config + '"')
                }

                data[config](target)
            } else if(data.config.autoplay){
                data.autoplay(target)
            }
        })
    }

    return Slider
}()

$(document).on(SLIDER_EVENT.CLICK, SLIDER_SELECTOR.CONTROL_NEXT, function (e) {
    let target = $(this).closest(SLIDER_SELECTOR.SLIDER)

    let config = $(target).data(SLIDER_EVENT_KEY) ? $(target).data(SLIDER_EVENT_KEY) : zykUtil.configSpread($(target).data(), $(this).data())

    if(this.tagName == 'a'){
        e.preventDefault()
    }

    let data = $(target).data(SLIDER_EVENT_KEY)
    data.next(target)

    Slider.jqueryInterface.call($(target), config, this)
})

$(document).on(SLIDER_EVENT.CLICK, SLIDER_SELECTOR.CONTROL_PREV, function (e) {
    let target = $(this).closest(SLIDER_SELECTOR.SLIDER)

    let config = $(target).data(SLIDER_EVENT_KEY) ? $(target).data(SLIDER_EVENT_KEY) : zykUtil.configSpread($(target).data(), $(this).data())

    if (this.tagName == 'a') {
        e.preventDefault()
    }

    let data = $(target).data(SLIDER_EVENT_KEY)
    data.prev(target)

    Slider.jqueryInterface.call($(target), config, this)
})

$.fn[SLIDER_NAME] = Slider.jqueryInterface
$.fn[SLIDER_NAME].constructor = Slider

/*
=========================================================
DATEPICKER
=========================================================
*/
// const DATEPICKER_NAME = 'datepicker'
// const DATEPCIKER_EVENT_KEY = `${DATA_KEY}.${DATEPICKER_NAME}`

// const DATEPICKER_SELECTOR = '.datepicker'

// const DATEPICKER_DEFAULT = {
//     IS_SHOWN: false
// }

// const DATEPICKER_EVENT = {
//     CLICK: `click.${DATEPCIKER_EVENT_KEY}`,
//     FOCUS: `focus.${DATEPCIKER_EVENT_KEY}`,
//     BLUR: `blue.${DATEPCIKER_EVENT_KEY}`
// }

// var Datepicker = function(){
//     function Datepicker(element, options){
//         this.config = this.getConfig(options)

//         this.element = element

//         this.is_shown = DATEPICKER_DEFAULT.IS_SHOWN
//     }

//     const _proto = Datepicker.prototype

//     _proto.getConfig = function getConfig(config){
//         config = zykUtil.configSpread(DATEPICKER_DEFAULT, config)

//         return config
//     }

//     _proto.show = function show(target){
//         console.log('show')
//     }

//     Datepicker.jqueryInterface = function jqueryInterface(config, target){
//         return this.each(function(){
//             let data = $(this).data(DATEPCIKER_EVENT_KEY)

//             let _config = zykUtil.configSpread(DATEPICKER_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {})

//             if(!data){
//                 data = new Datepicker(this, _config)
//                 $(this).data(DATEPCIKER_EVENT_KEY, data)
//             }

//             if(typeof config == 'string'){
//                 if(typeof data[config] == 'undefined'){
//                     throw new TypeError('No method named ' + '"' + config + '"')
//                 }

//                 data[config](targer)
//             } else if (_config.datapicker){
//                 data.show(target)
//             }

//             console.log(_config)
//         })
//     }

//     return Datepicker
// }()

// $(document).on(DATEPICKER_EVENT.CLICK, DATEPICKER_SELECTOR, function(e){
//     let target = $(this)

//     let config = $(this).data(DATEPCIKER_EVENT_KEY)

//     Datepicker.jqueryInterface.call($(target), config, this)
// })

// $.fn[DATEPICKER_NAME] = Datepicker.jqueryInterface
// $.fn[DATEPICKER_NAME].constructor = Datepicker
