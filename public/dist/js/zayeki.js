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

const DATA_KEY = 'zyk';

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
        let obj = [];
        for (let i = 0; i< arguments.length; i++){
            let sourceArg = arguments[i] != null ? arguments[i] : {}

            if(this.typeOf(sourceArg) == 'object'){
                obj.push(sourceArg);
            }
        }

        source = obj.reduce(function(r, c){
            return Object.assign(r, c);
        }, {});

        return source;
    },

    bodyBlock(option){
        if(option){
            $('body').removeClass('overflow-on');
            $('body').addClass('overflow-off');
        } else {
            $('body').removeClass('overflow-off');
            $('body').addClass('overflow-on');
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
        };

        this.config = {
            ...defaultOptions,
            ...options
        };

        this.$btn = $('.btn-poal');

        this.fire();
    }

    fire() {
        $('body').append(this.template());

        let _self = this;

        setTimeout(() => {
            _self.transition()
        }, 100)

        this.initEvent();
    }

    transition() {
        $(document).find('.poal').addClass('show');
    }

    initEvent() {
        $(document).on('click', '.btn-cancel', this.dismiss.bind(this));
        $(document).on('click', '.btn-confirm', this.confirm.bind(this));
        $(document).on('click', '.poal-backdrop', this.dismiss.bind(this));
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
        return popup;
    }

    dismiss(e){
        $(e.target).closest('.poal').remove();
    }

    confirm(e){
        $(e.target).closest('.poal').remove();

        this.callbackConfirm();
    }

    callbackConfirm(){
        console.log('callback');
    }
}

let guide_data = {};
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
POPUP
=========================================================
*/

const POPUP_NAME = 'popup';
const POPUP_EVENT_KEY = `${DATA_KEY}.${POPUP_NAME}`;

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

    _proto.getConfig = function getConfig(config){
        config = zykUtil.configSpread(POPUP_DEFAULT, config);

        return config;
    }

    _proto.toggle = function toggle(target){
        return this.isShown ? this.hide() : this.show(target);
    }

    _proto.show = function show(target) {
        const _this = this;

        // Block body
        zykUtil.bodyBlock(true);

        let showEvent = $.Event(POPUP_EVENT.SHOW, {
            target: target
        });

        $(this.element).trigger(showEvent);

        this.isShown = true;

        this.keepOnViewPort();

        this.setEscapeEvent();

        $(this.element).one(POPUP_EVENT.CLICK_DISMISS, POPUP_SELECTOR.DISMISS, function(e){
            return _this.hide(e);
        });

        $(this.dialog).off(POPUP_EVENT.CLICK_DISMISS);
        $(this.dialog).on(POPUP_EVENT.CLICK_DISMISS, function (e) {
            if($(_this.dialog).is(e.target)){
                return _this.hide(e);
            }
        });

        this.showBackdrop(function(){
            return _this.showElement(target);
        });
    }

    _proto.hide = function hide(e){
        const _this = this;

        if(e){
            e.preventDefault();
        }

        let hideEvent = $.Event(POPUP_EVENT.HIDE);

        $(this.element).trigger(hideEvent);

        this.isShown = false;

        this.hideElement();
    }

    _proto.showElement = function showElement(target){
        const _this = this;

        this.element.style.display = 'block';

        if (this.hasFade) {
            setTimeout(function(){
                $(_this.element).addClass(POPUP_CLASSNAME.SHOW);
            }, POPUP_VAR.TRANSITION)
        } else {
            $(this.element).addClass(POPUP_CLASSNAME.SHOW);
        }

        if($(this.element).attr('tabindex') == null){
            $(this.element).attr('tabindex', -1)
        }

        if(this.config.focus){
            this.forceFocus();
        }

        let shownEvent = $.Event(POPUP_EVENT.SHOWN, {
            target: target
        })

        $(_this.element).trigger(shownEvent);
    }

    _proto.hideElement = function hideElement(){
        const _this = this;

        $(this.element).removeClass(POPUP_CLASSNAME.SHOW);

        if (this.hasFade) {
            setTimeout(function(){
                _this.element.style.display = 'none';
            }, POPUP_VAR.TRANSITION)
        } else {
            this.element.style.display = 'none';
        }

        this.removeBackdrop();

        $(this.element).trigger(POPUP_EVENT.HIDDEN);

        // Unlock body
        zykUtil.bodyBlock(false);
    }

    _proto.showBackdrop = function showBackdrop(callback){
        const _this = this;

        let focus = $(this.element).hasClass(POPUP_CLASSNAME.FOCUS);

        if(this.isShown && this.config.backdrop){
            this.backdrop = $(`<div class="${POPUP_CLASSNAME.BACKDROP}"></div>`);

            if(focus){
                $(this.backdrop).addClass(POPUP_CLASSNAME.FOCUS);
            }

            // Append POPUP BACKDROP to BODY
            $(this.backdrop).appendTo($('body'));

            if (this.hasFade) {
                setTimeout(function(){
                    $(_this.backdrop).addClass(POPUP_CLASSNAME.FADE)
                }, POPUP_VAR.TRANSITION)
            } else {
                $(this.backdrop).addClass(POPUP_CLASSNAME.SHOW);
            }

            $(this.backdrop).on(POPUP_EVENT.CLICK_DISMISS, function (e) {
                if(_this.config.backdrop == 'static'){
                    return;
                } else{
                    _this.hide();
                }
            })
        }

        if(callback){
            callback();
        }
    }

    _proto.removeBackdrop = function removeBackdrop(){
        const _this = this;

        if(this.backdrop){
            $(this.backdrop).remove();

            this.backdrop = null;
        }
    }

    _proto.keepOnViewPort = function keepOnViewPort(){
        const _this = this;

        let offsetTop = $(this.element).offset().top;
        let vpHeight = window.innerHeight;

        if(offsetTop > vpHeight){
            let scrollTop = offsetTop - vpHeight * 10 / 100;

            $(window).scrollTop(scrollTop);
        }
    }

    _proto.forceFocus = function forceFocus(){
        const _this = this;

        $(this.element).focus();

        // $(document).off(POPUP_EVENT.FOCUSIN);
        // $(document).on(POPUP_EVENT.FOCUSIN, function(e){
        //     console.log(e);
        //     if (document !== e.target && _this.element !== e.target && $(_this.element).has(e.target).length === 0){
        //         $(_this.element).focus();
        //     }
        // })
    }

    _proto.setEscapeEvent = function setEscapeEvent(){
        const _this = this;

        if(this.isShown && this.config.keyboard){
            $(this.element).one(POPUP_EVENT.KEYDOWN_DISMISS, function(e){
                if(e.which === zykKeys.escapeKey){
                    e.preventDefault();

                    _this.hide();
                }
            })
        } else if (!this.isShown){
            $(this.element).off(POPUP_EVENT.KEYDOWN_DISMISS);
        }
    }

    Popup.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function(){
            let data = $(this).data(POPUP_EVENT_KEY);

            let _config = zykUtil.configSpread(POPUP_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {});

            if(!data){
                data = new Popup(this, _config);
                $(this).data(POPUP_EVENT_KEY, data);
            }

            if(typeof config == 'string'){
                if(typeof data[config] == 'undefined'){
                    throw new TypeError('No method named ' + '"' + config + '"');
                }

                data[config](target);
            } else if(_config.toggle){
                data.show(target);
            }
        })
    }

    return Popup;
}();

$(document).on(POPUP_EVENT.CLICK, POPUP_SELECTOR.TOGGLE, function (e) {
    const _this = this;

    let target = $(this).data('target');

    let config = $(target).data(POPUP_EVENT_KEY) ? 'toggle' : zykUtil.configSpread($(target).data(), $(this).data());

    if(this.tagName == 'a'){
        e.preventDefault();
    }

    var $target = $(target).one(POPUP_EVENT.SHOW, function (showEvent) {
        if(showEvent.isDefaultPrevented()){
            return;
        }

        $target.one(POPUP_EVENT.HIDDEN, function(){
            // if($(_this).is(':visible')){
            //     console.log('visible');
            // }
        })
    });

    Popup.jqueryInterface.call($(target), config, this);
});

$.fn[POPUP_NAME] = Popup.jqueryInterface;
$.fn[POPUP_NAME].constructor = Popup;


/*
=========================================================
LISTVIEW
=========================================================
*/

const LISTVIEW_NAME = 'listview';
const LISTVIEW_EVENT_KEY = `${DATA_KEY}.${LISTVIEW_NAME}`;

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
};

const LISTVIEW_EVENT = {
    switch: `switch.${LISTVIEW_EVENT_KEY}`,
    switched: `switched.${LISTVIEW_EVENT_KEY}`
}

var Listview = function () {
    function Listview(element, config) {
        this.element = element
    }

    const _proto = Listview.prototype;

    Listview.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function () {
            let listviewId = $(this).attr('id');
            let listviewMode = localStorage.getItem('listviewMode' + listviewId);

            if(!listviewMode){
                listviewMode = LISTVIEW_VIEW_OPTIONS.LIST;
                localStorage.setItem('listviewMode' + listviewId, listviewMode);

                $(this).addClass('view-' + listviewMode);
            } else{
                console.log('co cmnr con dau nua')
            }
            console.log($(this));
        })
    }

    return Listview;
}();

$.fn[LISTVIEW_NAME] = Listview.jqueryInterface;
$.fn[LISTVIEW_NAME].constructor = Listview;

/*
=========================================================
NAV HEADER
=========================================================
*/
const NAVHEADER_NAME = 'navheader';
const NAVHEADER_EVENT_KEY = `${DATA_KEY}.${NAVHEADER_NAME}`;

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
        };

        this.options = {
            ...defaultOptions,
            ...options
        };

        this.element = element;

        this.btnExpand = $(this.element).find(NAVHEADER_CLASSNAME.BTN_EXPAND);
        this.navMenu = $(this.element).find(NAVHEADER_CLASSNAME.NAV_MENU);

        this.init();
    }

    init(){
        const _this = this;

        $(document).on(NAVHEADER_EVENTS.CLICK, $(_this.btnExpand), function (e) {
            console.log(_this.btnExpand);
            $(_this.navMenu).toggleClass(NAVHEADER_CLASSNAME.SHOW);
            $(_this.btnExpand).toggleClass(NAVHEADER_CLASSNAME.ACTIVE);

            if ($(_this.btnExpand).hasClass(NAVHEADER_CLASSNAME.ACTIVE)){
                zykUtil.bodyBlock(true);
            } else {
                zykUtil.bodyBlock();
            }
        })
    }
}

/*
=========================================================
SLIDER
=========================================================
*/
const SLIDER_NAME = 'slider';
const SLIDER_EVENT_KEY = `${DATA_KEY}.${SLIDER_NAME}`;

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
};

const SLIDER_EVENT = {
    CLICK: `click.${SLIDER_EVENT_KEY}`,

    SWITCH: `switch.${SLIDER_EVENT_KEY}`,
    SWITCHED: `switched.${SLIDER_EVENT_KEY}`
}

var Slider = function () {
    function Slider(element, config) {
        this.config = this.getConfig(config);
        this.element = element;
        this.slideLength = $(this.element).find(SLIDER_SELECTOR.ITEM).length;

        this.controlNext = $(this.element).find(SLIDER_SELECTOR.CONTROL_NEXT);
        this.controlPrev = $(this.element).find(SLIDER_SELECTOR.CONTROL_PREV);
    }

    const _proto = Slider.prototype;

    _proto.getConfig = function getConfig(config){
        config = zykUtil.configSpread(SLIDER_DEFAULT, config);

        return config;
    }

    _proto.getActiveSlide = function getActiveSlide() {
        let activeSlide = $(this.element).find(SLIDER_SELECTOR.ITEM_ACTIVE);
        return activeSlide;
    }

    _proto.autoplay = function autoplay(target){
        // console.log('AUTOPLAY');

        // this.getPrepare();
        // this.next();
    }

    _proto.getPrepare = function getPrepare(movement){
        const _this = this;

        if (typeof movement == 'string') {
            if (movement == SLIDER_MOVEMENT.NEXT || movement == SLIDER_MOVEMENT.PREV) {
                let activeSlide = this.getActiveSlide();

                if (movement == SLIDER_MOVEMENT.NEXT) {
                    if ($(activeSlide).index() < _this.slideLength - 1) {
                        $(activeSlide)
                            .next()
                            .addClass(SLIDER_CLASSNAME.ITEM_PREPARE)
                            .addClass(SLIDER_CLASSNAME.ITEM_NEXT);
                    } else {
                        if (_this.config.loop == true) {
                            $(_this.element).find(SLIDER_SELECTOR.ITEM_FIRST)
                                .addClass(SLIDER_CLASSNAME.ITEM_PREPARE)
                                .addClass(SLIDER_CLASSNAME.ITEM_NEXT);
                        } else {
                            return;
                        }
                    }

                    setTimeout(function(){
                        _this.switchSlide(SLIDER_MOVEMENT.NEXT)
                    }, 100);
                } else if (movement == SLIDER_MOVEMENT.PREV) {
                    if ($(activeSlide).index() > 0) {
                        $(activeSlide)
                            .prev()
                            .addClass(SLIDER_CLASSNAME.ITEM_PREPARE)
                            .addClass(SLIDER_CLASSNAME.ITEM_PREV);
                    } else if ($(activeSlide).index() == 0) {
                        if (_this.config.loop == true) {
                            $(_this.element).find(SLIDER_SELECTOR.ITEM_LAST)
                                .addClass(SLIDER_CLASSNAME.ITEM_PREPARE)
                                .addClass(SLIDER_CLASSNAME.ITEM_PREV);
                        } else {
                            return;
                        }
                    }

                    setTimeout(function () {
                        _this.switchSlide(SLIDER_MOVEMENT.PREV)
                    }, 100);
                } else {
                    throw new TypeError('Wrong Request');
                }
            }
        } else if (typeof movement == 'number') {
            if (movement < 0) {
                throw new TypeError('Wrong Request');
            }
        }
    }

    _proto.getSliderId = function getSliderId(element){
        let sliderId = $(element).closest('.slider');
        return sliderId;
    }

    _proto.next = function next(target){
        let switchEvent = $.Event(SLIDER_EVENT.SWITCH, {
            target: target
        });

        $(this.element).trigger(switchEvent);

        this.getPrepare(SLIDER_MOVEMENT.NEXT);
    }

    _proto.prev = function prev(target) {
        let switchEvent = $.Event(SLIDER_EVENT.SWITCH, {
            target: target
        });

        $(this.element).trigger(switchEvent);

        this.getPrepare(SLIDER_MOVEMENT.PREV);
    }

    _proto.switchSlide = function switchSlide(movement, target) {
        let activeSlide = this.getActiveSlide();
        activeSlide.removeClass(SLIDER_CLASSNAME.ACTIVE);

        if (typeof movement == 'string') {
            if (movement == SLIDER_MOVEMENT.NEXT) {
                let $currentSlide = $(this.element).find(SLIDER_SELECTOR.ITEM_NEXT);

                $currentSlide
                    .removeClass(SLIDER_CLASSNAME.ITEM_NEXT)
                    .removeClass(SLIDER_CLASSNAME.ITEM_PREPARE)
                    .addClass(SLIDER_CLASSNAME.ACTIVE);
            } else if (movement == SLIDER_MOVEMENT.PREV) {
                let $currentSlide = $(this.element).find(SLIDER_SELECTOR.ITEM_PREV);

                $currentSlide
                    .removeClass(SLIDER_CLASSNAME.ITEM_PREV)
                    .removeClass(SLIDER_CLASSNAME.ITEM_PREPARE)
                    .addClass(SLIDER_CLASSNAME.ACTIVE);
            }
        } else if (typeof movement == 'number') {

        }

        let switchedEvent = $.Event(SLIDER_EVENT.SWITCHED, {
            target: target
        });

        $(this.element).trigger(switchedEvent);

        this.setControlVisible();
    }

    _proto.setControlVisible = function setControlVisible(){
        if(this.config.loop === false){
            if ($(this.getActiveSlide()).index() == this.slideLength - 1) {
                $(this.element).find(SLIDER_SELECTOR.CONTROL_NEXT).hide();
            } else {
                $(this.element).find(SLIDER_SELECTOR.CONTROL_NEXT).show();
            }

            if ($(this.getActiveSlide()).index() == 0) {
                $(this.element).find(SLIDER_SELECTOR.CONTROL_PREV).hide();
            } else {
                $(this.element).find(SLIDER_SELECTOR.CONTROL_PREV).show();
            }
        }
    }

    Slider.jqueryInterface = function jqueryInterface(config, target) {
        return this.each(function () {
            let data = $(this).data(SLIDER_EVENT_KEY);

            let _config = zykUtil.configSpread(SLIDER_DEFAULT, $(this).data(), typeof config == 'object' && config ? config : {});

            if(!data){
                data = new Slider(this, _config);
                $(this).data(SLIDER_EVENT_KEY, data);
            }

            if(typeof config == 'string'){
                if(typeof data[config] == 'undefined'){
                    throw new TypeError('No method named ' + '"' + config + '"');
                }

                data[config](target);
            } else if(data.config.autoplay){
                data.autoplay(target);
            }
        });
    }

    return Slider;
}();

$(document).on(SLIDER_EVENT.CLICK, SLIDER_SELECTOR.CONTROL_NEXT, function (e) {
    let target = $(this).closest(SLIDER_SELECTOR.SLIDER);

    let config = $(target).data(SLIDER_EVENT_KEY) ? $(target).data(SLIDER_EVENT_KEY) : zykUtil.configSpread($(target).data(), $(this).data());

    if(this.tagName == 'a'){
        e.preventDefault();
    }

    let data = $(target).data(SLIDER_EVENT_KEY);
    data.next(target);

    Slider.jqueryInterface.call($(target), config, this);
});

$(document).on(SLIDER_EVENT.CLICK, SLIDER_SELECTOR.CONTROL_PREV, function (e) {
    let target = $(this).closest(SLIDER_SELECTOR.SLIDER);

    let config = $(target).data(SLIDER_EVENT_KEY) ? $(target).data(SLIDER_EVENT_KEY) : zykUtil.configSpread($(target).data(), $(this).data());

    if (this.tagName == 'a') {
        e.preventDefault();
    }

    let data = $(target).data(SLIDER_EVENT_KEY);
    data.prev(target);

    Slider.jqueryInterface.call($(target), config, this);
});

$.fn[SLIDER_NAME] = Slider.jqueryInterface;
$.fn[SLIDER_NAME].constructor = Slider;
