/**
 *  jQuery plugin for validation of text inputs and textarea.
 *
 *  Copyright (c) 2019 Aleksey Sirochenko
 *  https://github.com/ALEX-256/
 *
 *  Version 1.0.0
 *
 *  Repository url:
 *  https://github.com/ALEX-256/deRegexValidation
 *  @license
 *  MIT License https://opensource.org/licenses/MIT
 */(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = window['jQuery'];

var EventsEmitter = exports.EventsEmitter = function () {
    function EventsEmitter() {
        var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var plugin = arguments[1];

        _classCallCheck(this, EventsEmitter);

        this.events = {};
        this.events = events;
        this.plugin = plugin;
    }

    _createClass(EventsEmitter, [{
        key: 'triggerInit',
        value: function triggerInit(form) {
            this.emitEvent('init', form);
        }
    }, {
        key: 'triggerBeforeDestroy',
        value: function triggerBeforeDestroy(form) {
            this.emitEvent('beforeDestroy', form);
        }
    }, {
        key: 'triggerBeforeFieldValidation',
        value: function triggerBeforeFieldValidation(form, field) {
            this.emitEvent('beforeFieldValidation', form, field);
        }
    }, {
        key: 'triggerAfterFieldValidation',
        value: function triggerAfterFieldValidation(form, field) {
            this.emitEvent('afterFieldValidation', form, field);
        }
    }, {
        key: 'triggerValidFormSubmit',
        value: function triggerValidFormSubmit(form) {
            this.emitEvent('validFormSubmit', form);
        }
    }, {
        key: 'triggerInvalidFormSubmit',
        value: function triggerInvalidFormSubmit(form) {
            this.emitEvent('invalidFormSubmit', form);
        }
    }, {
        key: 'emitEvent',
        value: function emitEvent(event) {
            if (this.events.hasOwnProperty(event) && typeof this.events[event] === 'function') {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                this.events[event].apply(this.plugin, args);
            }
        }
    }]);

    return EventsEmitter;
}();

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputValidationCfgs = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validationCfgs = require('./validation-cfgs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputValidationCfgs = exports.InputValidationCfgs = function (_ValidationCfgs) {
    _inherits(InputValidationCfgs, _ValidationCfgs);

    function InputValidationCfgs() {
        _classCallCheck(this, InputValidationCfgs);

        return _possibleConstructorReturn(this, (InputValidationCfgs.__proto__ || Object.getPrototypeOf(InputValidationCfgs)).apply(this, arguments));
    }

    _createClass(InputValidationCfgs, [{
        key: 'processValidationCfgs',
        value: function processValidationCfgs(validationCfgs) {
            var cfgs = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = validationCfgs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var cfg = _step.value;

                    if (typeof cfg === 'string' && this.hasCfgByName(cfg)) {
                        cfgs.push(this.getCfgByName(cfg));
                    } else if ((typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) === 'object') {
                        cfgs.push(cfg);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return cfgs;
        }
    }, {
        key: 'setProcessedCfgs',
        value: function setProcessedCfgs(inputCfgs) {
            var intersectedCfgs = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = inputCfgs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var inputCfg = _step2.value;

                    var customCfg = true;
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = this._validationCfgs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var validationCfg = _step3.value;

                            if (inputCfg.name === validationCfg.name) {
                                intersectedCfgs.push($.extend(true, {}, validationCfg, inputCfg));
                                customCfg = false;
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    if (customCfg) {
                        intersectedCfgs.push(inputCfg);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this._validationCfgs = intersectedCfgs;
            this.checkConfigForConsistency();
            this.removeDuplicatedCfgsByNames();
        }
    }]);

    return InputValidationCfgs;
}(_validationCfgs.ValidationCfgs);

},{"./validation-cfgs":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Input = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inputValidationCfgs = require('./input-validation-cfgs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = window['jQuery'];

var Input = exports.Input = function () {
    function Input(input, settings) {
        _classCallCheck(this, Input);

        this._notices = [];
        this._noticesToDelete = [];
        this._input = input;
        this._settings = settings;
        this._validationCfgs = new _inputValidationCfgs.InputValidationCfgs(this._settings.validationCfgs.all);
        this.init();
    }

    _createClass(Input, [{
        key: 'init',
        value: function init() {
            this.setValidationCfgs();
            this.setInputParent();
        }
    }, {
        key: 'validate',
        value: function validate() {
            if (!this._validationCfgs.length) {
                return;
            }
            this.emptyNotices();
            this.checkField();
            this.deleteOldNotices();
            this.addNewNotices();
            this.toggleValidClass();
        }
    }, {
        key: 'emptyNotices',
        value: function emptyNotices() {
            this._notices = [];
            this._noticesToDelete = [];
        }
    }, {
        key: 'setValidationCfgs',
        value: function setValidationCfgs() {
            var validationCfgs = this._input.data(this._settings.dataAttrs.validationCfgs);
            if (typeof validationCfgs === 'string') {
                if (validationCfgs) {
                    try {
                        validationCfgs = JSON.parse(validationCfgs);
                    } catch (e) {
                        validationCfgs = validationCfgs.split(',');
                    }
                } else {
                    return;
                }
            }
            validationCfgs = this._validationCfgs.processValidationCfgs(validationCfgs);
            if (this._settings.validateRequiredFields) {
                validationCfgs.push(this._settings.validationCfgs.getCfgByName('required'));
            }
            this._validationCfgs.setProcessedCfgs(validationCfgs);
        }
    }, {
        key: 'setInputParent',
        value: function setInputParent() {
            this._inputParent = this._input.parents(this._settings.selectors.inputParent).first();
        }
    }, {
        key: 'checkField',
        value: function checkField() {
            var _this = this;

            var index = 1;
            if (this._input.is(':checkbox') && this._validationCfgs.hasCfgByName('required')) {
                var requiredValidationCfg = this._validationCfgs.getCfgByName('required');
                if (this._input.is(':checked')) {
                    this._noticesToDelete.push(index);
                } else {
                    this._notices.push({
                        notice: requiredValidationCfg.notice,
                        index: index
                    });
                }
            } else {
                this._validationCfgs.all.forEach(function (item, i, arr) {
                    index = i + 1;
                    var regExp = void 0;
                    if (_typeof(item.regex) === 'object') {
                        regExp = item.regex;
                    } else {
                        var flags = item.regex.split('/').pop();
                        var regExpStr = item.regex.substring(item.regex.indexOf('/') + 1, item.regex.lastIndexOf('/'));
                        regExp = new RegExp(regExpStr, flags);
                    }
                    if (!regExp.test(_this._input.val())) {
                        _this._notices.push({
                            notice: item.notice,
                            index: index
                        });
                    } else {
                        _this._noticesToDelete.push(index);
                    }
                });
            }
        }
    }, {
        key: 'deleteOldNotices',
        value: function deleteOldNotices() {
            var _this2 = this;

            this._noticesToDelete.forEach(function (noticeIndex, i, arr) {
                _this2._inputParent.find('.' + _this2._settings.cssClasses.noticeIndex + noticeIndex).remove();
            });
        }
    }, {
        key: 'addNewNotices',
        value: function addNewNotices() {
            var _this3 = this;

            this._notices.forEach(function (notice, i, arr) {
                if (!_this3._inputParent.find('.' + _this3._settings.cssClasses.noticeIndex + notice.index).length) {
                    var noticeElem = $('<' + _this3._settings.noticeTagName + '>').addClass(_this3._settings.cssClasses.noticeIndex + notice.index).text(notice.notice);
                    _this3._inputParent.append(noticeElem);
                }
            });
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            return !this._notices.length;
        }
    }, {
        key: 'toggleValidClass',
        value: function toggleValidClass() {
            if (this.isValid()) {
                this._inputParent.addClass(this._settings.cssClasses.inputValid).removeClass(this._settings.cssClasses.inputInvalid);
            } else {
                this._inputParent.removeClass(this._settings.cssClasses.inputValid).addClass(this._settings.cssClasses.inputInvalid);
            }
        }
    }], [{
        key: 'init',
        value: function init(input, settings) {
            input = $(input);
            var obj = input.data(Input._objDataKey);
            if (obj instanceof Input) {
                return obj;
            } else {
                obj = new Input(input, settings);
                input.data(Input._objDataKey, obj);
                return obj;
            }
        }
    }, {
        key: 'destroy',
        value: function destroy(inputEl, settings) {
            var $input = $(inputEl);
            var input = $input.data(Input._objDataKey);
            if (input instanceof Input) {
                $input.removeData(Input._objDataKey);
                $input.removeData(settings.dataAttrs.validationCfgs);
                var inputParent = $input.parents(settings.selectors.inputParent).first();
                inputParent.find('[class*="' + settings.cssClasses.noticeIndex + '"]').remove();
                inputParent.removeClass(Object.values(settings.cssClasses).join(' '));
            }
        }
    }]);

    return Input;
}();

Input._objDataKey = 'de-regex-validation-input-obj';

},{"./input-validation-cfgs":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Settings = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validationCfgs = require('./validation-cfgs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = window['jQuery'];

var Settings = exports.Settings = function () {
    function Settings(settings) {
        _classCallCheck(this, Settings);

        this._defaults = {
            eventNamespace: 'deRegexValidation',
            events: ['input', 'change', 'blur'],
            dataAttrs: {
                validationCfgs: 'validation-cfg'
            },
            cssClasses: {
                formValid: 'form-valid',
                formInvalid: 'form-invalid',
                inputValid: 'input-valid',
                inputInvalid: 'input-invalid',
                noticeIndex: 'validation-notice-'
            },
            selectors: {
                inputParent: '.form-row'
            },
            noticeTagName: 'p',
            preventSubmitOnInvalid: false,
            disableFormOnInvalid: false,
            validateRequiredFields: false,
            userValidationCfgs: [],
            on: {}
        };
        this.init(settings);
    }

    _createClass(Settings, [{
        key: 'init',
        value: function init(settings) {
            this.initDynamicSettings();
            this.initSettings(settings);
            this.initValidationCfgs();
        }
    }, {
        key: 'initDynamicSettings',
        value: function initDynamicSettings() {
            this._defaults.selectors = $.extend(this._defaults.selectors, {
                input: 'input[data-' + this._defaults.dataAttrs.validationCfgs + ']',
                textarea: 'textarea[data-' + this._defaults.dataAttrs.validationCfgs + ']'
            });
        }
    }, {
        key: 'initSettings',
        value: function initSettings(settings) {
            this._settings = $.extend(true, {}, this._defaults, settings);
        }
    }, {
        key: 'initValidationCfgs',
        value: function initValidationCfgs() {
            this._validationCfgs = new _validationCfgs.ValidationCfgs(this._settings.userValidationCfgs);
        }
    }, {
        key: 'eventNamespace',
        get: function get() {
            return this._settings.eventNamespace;
        }
    }, {
        key: 'events',
        get: function get() {
            return this._settings.events;
        }
    }, {
        key: 'dataAttrs',
        get: function get() {
            return this._settings.dataAttrs;
        }
    }, {
        key: 'cssClasses',
        get: function get() {
            return this._settings.cssClasses;
        }
    }, {
        key: 'selectors',
        get: function get() {
            return this._settings.selectors;
        }
    }, {
        key: 'noticeTagName',
        get: function get() {
            return this._settings.noticeTagName;
        }
    }, {
        key: 'preventSubmitOnInvalid',
        get: function get() {
            return this._settings.preventSubmitOnInvalid;
        }
    }, {
        key: 'disableFormOnInvalid',
        get: function get() {
            return this._settings.disableFormOnInvalid;
        }
    }, {
        key: 'validateRequiredFields',
        get: function get() {
            return this._settings.validateRequiredFields;
        }
    }, {
        key: 'userValidationCfgs',
        get: function get() {
            return this._settings.userValidationCfgs;
        }
    }, {
        key: 'validationCfgs',
        get: function get() {
            return this._validationCfgs;
        }
    }, {
        key: 'on',
        get: function get() {
            return this._settings.on;
        }
    }]);

    return Settings;
}();

},{"./validation-cfgs":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidationCfgs = exports.ValidationCfgs = function () {
    function ValidationCfgs(validationCfgs) {
        _classCallCheck(this, ValidationCfgs);

        this._validationCfgs = [{
            name: 'letters',
            regex: /^[a-zA-Z]*$/,
            notice: 'Only letters'
        }, {
            name: 'letters_special',
            regex: /^[a-zA-Z\/\-\s]*$/,
            notice: 'Only letters, spaces / -'
        }, {
            name: 'letters_special_2',
            regex: /^[a-zA-Z\/\-\s\.\,]*$/,
            notice: 'Only words, spaces / - , .'
        }, {
            name: 'digits_only',
            regex: /^\d*$/,
            notice: 'Digits only'
        }, {
            name: 'digits9',
            regex: /^([0-9]{9})?$/,
            notice: 'Exactly 9 digits'
        }, {
            name: 'digits10',
            regex: /^([0-9]{10})?$/,
            notice: 'Exactly 10 digits'
        }, {
            name: 'digits_and_separators_only',
            regex: /^[\d.,]*$/,
            notice: 'Digits and separators only'
        }, {
            name: 'number',
            regex: /^\-?([1-9]+|0[.,]\d+|[1-9]+?[.,]\d+)$/,
            notice: 'Provide valid number'
        }, {
            name: 'letters_digits_only',
            regex: /^[a-zA-Z0-9]*$/,
            notice: 'Only letters, digits, space and -'
        }, {
            name: 'letters_digits_special',
            regex: /^[a-zA-Z\/\-\s0-9]*$/,
            notice: 'Only letters, digits, space / -'
        }, {
            name: 'letters_digits_special_2',
            regex: /^[a-zA-Z\/\-\,\.\s0-9]*$/,
            notice: 'Only letters, digits, space / - , .'
        }, {
            name: 'email',
            regex: /^(\S+@\S+\.\S{2,})?$/,
            notice: 'Provide valid email'
        }, {
            name: 'required',
            regex: /^.+$/,
            notice: 'This field is required'
        }, {
            name: 'password_6',
            regex: /^(.{6,})?$/,
            notice: 'Password requires at least 6 symbols'
        }, {
            name: 'phone',
            regex: /^(\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{5,14})?$/,
            notice: 'Provide phone in the international format'
        }, {
            name: 'hex_value',
            regex: /^(#?[0-9a-f]*)?$/,
            notice: 'Provide valid hex value'
        }, {
            name: 'rgb_color_value',
            regex: /^(rgb\(\s?(1[0-9]{2}|[0-9]|[1-9][0-9]|2([0-4][0-9]|5[0-5]))\s?\,\s?(1[0-9]{2}|[0-9]|[1-9][0-9]|2([0-4][0-9]|5[0-5]))\s?\,\s?(1[0-9]{2}|[0-9]|[1-9][0-9]|2([0-4][0-9]|5[0-5]))\s?\))?$/,
            notice: 'Provide valid rgb color'
        }, {
            name: 'rgba_color_value',
            regex: /^(rgba\(\s?(1[0-9]{2}|[0-9]|[1-9][0-9]|2([0-4][0-9]|5[0-5]))\s?\,\s?(1[0-9]{2}|[0-9]|[1-9][0-9]|2([0-4][0-9]|5[0-5]))\s?\,\s?(1[0-9]{2}|[0-9]|[1-9][0-9]|2([0-4][0-9]|5[0-5]))\s?\,\s?([01]|0\.([1-9]|[0-9][1-9]))\s?\))?$/,
            notice: 'Provide valid rgba color'
        }, {
            name: 'hsl_color_value',
            regex: /^(hsl\(\s?([1-9]?[0-9]|[12][0-9]{2}|3([0-5][0-9]|60))\s?\,\s?([1-9]?[0-9]|100)%\s?\,\s?([1-9]?[0-9]|100)%\s?\))?$/,
            notice: 'Provide valid hsl color'
        }, {
            name: 'hsla_color_value',
            regex: /^(hsla\(\s?([1-9]?[0-9]|[12][0-9]{2}|3([0-5][0-9]|60))\s?\,\s?([1-9]?[0-9]|100)%\s?\,\s?([1-9]?[0-9]|100)%\,\s?(1|0|0\.[0-9]+?)\s?\))?$/,
            notice: 'Provide valid hsla color'
        }];
        this.mergeValidationCfgs(validationCfgs);
    }

    _createClass(ValidationCfgs, [{
        key: 'mergeValidationCfgs',
        value: function mergeValidationCfgs(validationCfgs) {
            if (Array.isArray(validationCfgs) && validationCfgs.length) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = validationCfgs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var cfg = _step.value;

                        this.mergeValidationCfg(cfg);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            this.checkConfigForConsistency();
            this.removeDuplicatedCfgsByNames();
        }
    }, {
        key: 'mergeValidationCfg',
        value: function mergeValidationCfg(cfg) {
            var pushed = false;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.entries(this._validationCfgs)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2),
                        index = _step2$value[0],
                        pluginCfg = _step2$value[1];

                    if (pluginCfg.name === cfg.name) {
                        this._validationCfgs.splice(index, 1, $.extend(true, {}, pluginCfg, cfg));
                        pushed = true;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (!pushed) {
                this._validationCfgs.push(cfg);
            }
        }
    }, {
        key: 'getCfgByName',
        value: function getCfgByName(name) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._validationCfgs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var cfg = _step3.value;

                    if (cfg.name === name) {
                        return cfg;
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: 'hasCfgByName',
        value: function hasCfgByName(name) {
            return !!this.getCfgByName(name);
        }
    }, {
        key: 'checkConfigForConsistency',
        value: function checkConfigForConsistency() {
            var fields = ['regex', 'notice'];
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = Object.entries(this._validationCfgs)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _step4$value = _slicedToArray(_step4.value, 2),
                        index = _step4$value[0],
                        cfg = _step4$value[1];

                    var invalidCfg = false;
                    var absentFields = [];
                    for (var i = 0; i < fields.length; i++) {
                        if (!Object.keys(cfg).includes(fields[i])) {
                            invalidCfg = true;
                            absentFields.push(fields[i]);
                        }
                    }
                    if (invalidCfg) {
                        this._validationCfgs.splice(index, 1);
                        console.warn('This validation cfg is not valid', cfg, 'It has not got such fields as: ' + absentFields.join(', '));
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: 'removeDuplicatedCfgsByNames',
        value: function removeDuplicatedCfgsByNames() {
            var checked = [];
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = Object.entries(this._validationCfgs)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _step5$value = _slicedToArray(_step5.value, 2),
                        index = _step5$value[0],
                        cfg = _step5$value[1];

                    if (checked.includes(cfg.name)) {
                        this._validationCfgs.splice(index, 1);
                    } else {
                        checked.push(cfg.name);
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
    }, {
        key: 'length',
        get: function get() {
            return this._validationCfgs.length;
        }
    }, {
        key: 'all',
        get: function get() {
            return this._validationCfgs;
        }
    }]);

    return ValidationCfgs;
}();

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pluginName = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings = require("./classes/settings");

var _input = require("./classes/input");

var _eventsEmitter = require("./classes/events-emitter");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pluginName = exports.pluginName = 'deRegexValidation';

var DeRegexValidation = function () {
    function DeRegexValidation(form, settings) {
        _classCallCheck(this, DeRegexValidation);

        this.form = $(form);
        this.settings = new _settings.Settings(settings);
        this.eventsEmitter = new _eventsEmitter.EventsEmitter(this.settings.on, this);
        this.init();
        this.eventsEmitter.triggerInit(this.form);
    }

    _createClass(DeRegexValidation, [{
        key: "init",
        value: function init() {
            this.setEventHandlers();
        }
    }, {
        key: "setEventHandlers",
        value: function setEventHandlers() {
            this.onInputEvents();
            this.onFormSubmit();
        }
    }, {
        key: "onInputEvents",
        value: function onInputEvents() {
            var _this = this;

            this.settings.events.forEach(function (event, i, arr) {
                var eventWithNamespace = event + '.' + _this.settings.eventNamespace;
                _this.form.off(eventWithNamespace);
                _this.form.on(eventWithNamespace, _this.settings.selectors.input + "," + _this.settings.selectors.textarea, function (e) {
                    var $input = $(e.currentTarget);
                    _this.eventsEmitter.triggerBeforeFieldValidation(_this.form, $input);
                    var input = _input.Input.init($input, _this.settings);
                    input.validate();
                    _this.markFormValid();
                    _this.disableButtonOnFormInvalid();
                    _this.eventsEmitter.triggerAfterFieldValidation(_this.form, $input);
                });
            });
        }
    }, {
        key: "onFormSubmit",
        value: function onFormSubmit() {
            var _this2 = this;

            this.form.off('submit.' + this.settings.eventNamespace);
            this.form.on('submit.' + this.settings.eventNamespace, function (e) {
                _this2.validateForm();
                _this2.disableButtonOnFormInvalid();
                if (_this2.allInputsValid()) {
                    _this2.eventsEmitter.triggerValidFormSubmit(_this2.form);
                } else {
                    if (_this2.settings.preventSubmitOnInvalid) {
                        e.preventDefault();
                    }
                    _this2.eventsEmitter.triggerInvalidFormSubmit(_this2.form);
                }
            });
        }
    }, {
        key: "markFormValid",
        value: function markFormValid() {
            if (this.allInputsValid()) {
                this.form.addClass(this.settings.cssClasses.formValid).removeClass(this.settings.cssClasses.formInvalid);
            } else {
                this.form.addClass(this.settings.cssClasses.formInvalid).removeClass(this.settings.cssClasses.formValid);
            }
        }
    }, {
        key: "allInputsValid",
        value: function allInputsValid() {
            return !this.form.find(this.settings.selectors.input + ',' + this.settings.selectors.textarea).parents(this.settings.selectors.inputParent).hasClass(this.settings.cssClasses.inputInvalid);
        }
    }, {
        key: "disableButtonOnFormInvalid",
        value: function disableButtonOnFormInvalid() {
            if (this.settings.disableFormOnInvalid) {
                var submitBtn = this.form.find('input[type=submit],button[type=submit],button:not([type])');
                if (this.allInputsValid()) {
                    submitBtn.removeAttr('disabled').prop('disabled', false);
                } else {
                    submitBtn.attr('disabled', true).prop('disabled', true);
                }
            }
        }
    }, {
        key: "validateForm",
        value: function validateForm() {
            var _this3 = this;

            var scrollToInvalid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var inputs = this.form.find(this.settings.selectors.input + ',' + this.settings.selectors.textarea);
            inputs.each(function (i, elem, arr) {
                var $input = $(elem);
                var input = _input.Input.init($input, _this3.settings);
                input.validate();
            });
            this.markFormValid();
            if (scrollToInvalid) {
                this.scrollToInvalid();
            }
        }
    }, {
        key: "scrollToInvalid",
        value: function scrollToInvalid() {
            var invalidInputs = this.form.find('.' + this.settings.cssClasses.inputinvalid);
            var topInvalidInput = void 0;
            invalidInputs.each(function (i, invalidInput) {
                invalidInput = $(invalidInput);
                if (!topInvalidInput) {
                    topInvalidInput = invalidInput;
                } else {
                    if (topInvalidInput.offset().top > invalidInput.offset().top) {
                        topInvalidInput = invalidInput;
                    }
                }
            });
            if (topInvalidInput && topInvalidInput.length) {
                $([document.documentElement, document.body]).animate({
                    scrollTop: topInvalidInput.offset().top - 50
                }, 1000);
            }
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.eventsEmitter.triggerBeforeDestroy(this.form);
            this.offAllInputEvents();
            this.removeAllInputInstances();
            this.removeAllFormCSSClasses();
        }
    }, {
        key: "offAllInputEvents",
        value: function offAllInputEvents() {
            var _this4 = this;

            this.settings.events.forEach(function (event, i, arr) {
                var eventWithNamespace = event + '.' + _this4.settings.eventNamespace;
                _this4.form.off(eventWithNamespace, '**');
            });
            if (this.settings.preventSubmitOnInvalid) {
                this.form.off('submit.' + this.settings.eventNamespace);
            }
        }
    }, {
        key: "removeAllInputInstances",
        value: function removeAllInputInstances() {
            var _this5 = this;

            this.form.find(this.settings.selectors.input + "," + this.settings.selectors.textarea).each(function (i, input) {
                input = $(input);
                _input.Input.destroy(input, _this5.settings);
            });
        }
    }, {
        key: "removeAllFormCSSClasses",
        value: function removeAllFormCSSClasses() {
            this.form.removeClass(Object.values(this.settings.cssClasses).join(' '));
        }
    }]);

    return DeRegexValidation;
}();

$.fn[pluginName] = function (settings) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return this.each(function () {
        var instance = $.data(this, pluginName);
        if (!instance) {
            if (typeof settings === 'string') {
                //we can't invoke plugin method without initialized plugin instance
                return;
            }
            $.data(this, pluginName, new DeRegexValidation(this, settings));
        } else {
            switch (settings) {
                case 'validateForm':
                    instance.validateForm(!!args[0]);
                    break;
                case 'destroy':
                    instance.destroy();
                    break;
            }
        }
    });
};

},{"./classes/events-emitter":1,"./classes/input":3,"./classes/settings":4}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0cy9jbGFzc2VzL2V2ZW50cy1lbWl0dGVyLnRzIiwidHMvY2xhc3Nlcy9pbnB1dC12YWxpZGF0aW9uLWNmZ3MudHMiLCJ0cy9jbGFzc2VzL2lucHV0LnRzIiwidHMvY2xhc3Nlcy9zZXR0aW5ncy50cyIsInRzL2NsYXNzZXMvdmFsaWRhdGlvbi1jZmdzLnRzIiwidHMvcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBLElBQU0sSUFBSSxPQUFPLFFBQVAsQ0FBVjs7SUFFYSxhLFdBQUEsYTtBQUlYLDZCQUFnRDtBQUFBLFlBQXBDLE1BQW9DLHVFQUFmLEVBQWU7QUFBQSxZQUFYLE1BQVc7O0FBQUE7O0FBSHRDLGFBQUEsTUFBQSxHQUFxQixFQUFyQjtBQUlSLGFBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0Q7Ozs7b0NBRVcsSSxFQUFJO0FBQ2QsaUJBQUssU0FBTCxDQUFlLE1BQWYsRUFBdUIsSUFBdkI7QUFDRDs7OzZDQUVvQixJLEVBQUk7QUFDdkIsaUJBQUssU0FBTCxDQUFlLGVBQWYsRUFBZ0MsSUFBaEM7QUFDRDs7O3FEQUU0QixJLEVBQU0sSyxFQUFLO0FBQ3RDLGlCQUFLLFNBQUwsQ0FBZSx1QkFBZixFQUF3QyxJQUF4QyxFQUE4QyxLQUE5QztBQUNEOzs7b0RBRTJCLEksRUFBTSxLLEVBQUs7QUFDckMsaUJBQUssU0FBTCxDQUFlLHNCQUFmLEVBQXVDLElBQXZDLEVBQTZDLEtBQTdDO0FBQ0Q7OzsrQ0FFc0IsSSxFQUFJO0FBQ3pCLGlCQUFLLFNBQUwsQ0FBZSxpQkFBZixFQUFrQyxJQUFsQztBQUNEOzs7aURBRXdCLEksRUFBSTtBQUMzQixpQkFBSyxTQUFMLENBQWUsbUJBQWYsRUFBb0MsSUFBcEM7QUFDRDs7O2tDQUVtQixLLEVBQWM7QUFDaEMsZ0JBQUksS0FBSyxNQUFMLENBQVks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LENBQWMsVUFBNUIsRUFBd0MsSUFBeEMsQ0FBNkMsR0FBN0MsQ0FBdEI7QUFDRDs7Ozs7O0FBR0gsRUFBRSxFQUFGLENBQUssVUFBTCxJQUFtQixVQUFVLFFBQVYsRUFBMkI7QUFBQSxzQ0FBSixJQUFJO0FBQUosWUFBSTtBQUFBOztBQUM1QyxXQUFPLEtBQUssSUFBTCxDQUFVLFlBQUE7QUFDZixZQUFNLFdBQVcsRUFBRSxJQUFGLENBQU8sSUFBUCxFQUFjLFVBQWQsQ0FBakI7QUFFQSxZQUFJLENBQUMsUUFBTCxFQUFlO0FBQ2IsZ0JBQUksT0FBTyxRQUFQLEtBQW9CLFFBQXhCLEVBQWtDO0FBQ2hDO0FBQ0E7QUFDRDtBQUVELGNBQUUsSUFBRixDQUFPLElBQVAsRUFBYSxVQUFiLEVBQXlCLElBQUksaUJBQUosQ0FBc0IsSUFBdEIsRUFBNEIsUUFBNUIsQ0FBekI7QUFFRCxTQVJELE1BUU87QUFDTCxvQkFBUSxRQUFSO0FBQ0UscUJBQUssY0FBTDtBQUNFLDZCQUFTLFlBQVQsQ0FBc0IsQ0FBQyxDQUFDLEtBQUssQ0FBTCxDQUF4QjtBQUNBO0FBQ0YscUJBQUssU0FBTDtBQUNFLDZCQUFTLE9BQVQ7QUFDQTtBQU5KO0FBUUQ7QUFDRixLQXJCTSxDQUFQO0FBc0JELENBdkJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgJCA9IHdpbmRvd1snalF1ZXJ5J107XG5cbmV4cG9ydCBjbGFzcyBFdmVudHNFbWl0dGVyIHtcbiAgcHJvdGVjdGVkIGV2ZW50czogRW1pdEV2ZW50cyA9IHt9O1xuICBwcm90ZWN0ZWQgcGx1Z2luOiBQbHVnaW47XG5cbiAgY29uc3RydWN0b3IoZXZlbnRzOiBFbWl0RXZlbnRzID0ge30sIHBsdWdpbjogYW55KSB7XG4gICAgdGhpcy5ldmVudHMgPSBldmVudHM7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICB0cmlnZ2VySW5pdChmb3JtKSB7XG4gICAgdGhpcy5lbWl0RXZlbnQoJ2luaXQnLCBmb3JtKTtcbiAgfVxuXG4gIHRyaWdnZXJCZWZvcmVEZXN0cm95KGZvcm0pIHtcbiAgICB0aGlzLmVtaXRFdmVudCgnYmVmb3JlRGVzdHJveScsIGZvcm0pO1xuICB9XG5cbiAgdHJpZ2dlckJlZm9yZUZpZWxkVmFsaWRhdGlvbihmb3JtLCBmaWVsZCkge1xuICAgIHRoaXMuZW1pdEV2ZW50KCdiZWZvcmVGaWVsZFZhbGlkYXRpb24nLCBmb3JtLCBmaWVsZCk7XG4gIH1cblxuICB0cmlnZ2VyQWZ0ZXJGaWVsZFZhbGlkYXRpb24oZm9ybSwgZmllbGQpIHtcbiAgICB0aGlzLmVtaXRFdmVudCgnYWZ0ZXJGaWVsZFZhbGlkYXRpb24nLCBmb3JtLCBmaWVsZCk7XG4gIH1cblxuICB0cmlnZ2VyVmFsaWRGb3JtU3VibWl0KGZvcm0pIHtcbiAgICB0aGlzLmVtaXRFdmVudCgndmFsaWRGb3JtU3VibWl0JywgZm9ybSk7XG4gIH1cblxuICB0cmlnZ2VySW52YWxpZEZvcm1TdWJtaXQoZm9ybSkge1xuICAgIHRoaXMuZW1pdEV2ZW50KCdpbnZhbGlkRm9ybVN1Ym1pdCcsIGZvcm0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGVtaXRFdmVudChldmVudCwgLi4uYXJncykge1xuICAgIGlmICh0aGlzLmV2ZW50cy5oYXNPd25Qcm9wZXJ0eShldmVudCkgJiYgdHlwZW9mIHRoaXMuZXZlbnRzW2V2ZW50XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLmFwcGx5KHRoaXMucGx1Z2luLCBhcmdzKTtcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQge1ZhbGlkYXRpb25DZmdzfSBmcm9tIFwiLi92YWxpZGF0aW9uLWNmZ3NcIjtcblxuZXhwb3J0IGNsYXNzIElucHV0VmFsaWRhdGlvbkNmZ3MgZXh0ZW5kcyBWYWxpZGF0aW9uQ2ZncyB7XG5cbiAgcHJvY2Vzc1ZhbGlkYXRpb25DZmdzKHZhbGlkYXRpb25DZmdzKSB7XG4gICAgY29uc3QgY2ZncyA9IFtdO1xuICAgIGZvciAobGV0IGNmZyBvZiB2YWxpZGF0aW9uQ2Zncykge1xuICAgICAgaWYgKHR5cGVvZiBjZmcgPT09ICdzdHJpbmcnICYmIHRoaXMuaGFzQ2ZnQnlOYW1lKGNmZykpIHtcbiAgICAgICAgY2Zncy5wdXNoKHRoaXMuZ2V0Q2ZnQnlOYW1lKGNmZykpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY2ZnID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjZmdzLnB1c2goY2ZnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2ZncztcbiAgfVxuXG4gIHNldFByb2Nlc3NlZENmZ3MoaW5wdXRDZmdzOiBWYWxpZGF0aW9uQ29uZmlncykge1xuICAgIGNvbnN0IGludGVyc2VjdGVkQ2ZncyA9IFtdO1xuICAgIGZvciAoY29uc3QgaW5wdXRDZmcgb2YgaW5wdXRDZmdzKSB7XG4gICAgICBsZXQgY3VzdG9tQ2ZnID0gdHJ1ZTtcbiAgICAgIGZvciAoY29uc3QgdmFsaWRhdGlvbkNmZyBvZiB0aGlzLl92YWxpZGF0aW9uQ2Zncykge1xuICAgICAgICBpZiAoaW5wdXRDZmcubmFtZSA9PT0gdmFsaWRhdGlvbkNmZy5uYW1lKSB7XG4gICAgICAgICAgaW50ZXJzZWN0ZWRDZmdzLnB1c2goJC5leHRlbmQodHJ1ZSwge30sIHZhbGlkYXRpb25DZmcsIGlucHV0Q2ZnKSk7XG4gICAgICAgICAgY3VzdG9tQ2ZnID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjdXN0b21DZmcpIHtcbiAgICAgICAgaW50ZXJzZWN0ZWRDZmdzLnB1c2goaW5wdXRDZmcpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl92YWxpZGF0aW9uQ2ZncyA9IGludGVyc2VjdGVkQ2ZncztcbiAgICB0aGlzLmNoZWNrQ29uZmlnRm9yQ29uc2lzdGVuY3koKTtcbiAgICB0aGlzLnJlbW92ZUR1cGxpY2F0ZWRDZmdzQnlOYW1lcygpO1xuICB9XG59IiwiaW1wb3J0IHtOb3RpY2VzfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jb25maWdcIjtcbmltcG9ydCB7U2V0dGluZ3N9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5pbXBvcnQge0lucHV0VmFsaWRhdGlvbkNmZ3N9IGZyb20gXCIuL2lucHV0LXZhbGlkYXRpb24tY2Znc1wiO1xuXG5sZXQgJCA9IHdpbmRvd1snalF1ZXJ5J107XG5cbmV4cG9ydCBjbGFzcyBJbnB1dCB7XG4gIHByb3RlY3RlZCBzdGF0aWMgX29iakRhdGFLZXkgPSAnZGUtcmVnZXgtdmFsaWRhdGlvbi1pbnB1dC1vYmonO1xuICBwcm90ZWN0ZWQgX2lucHV0O1xuICBwcm90ZWN0ZWQgX3NldHRpbmdzOiBTZXR0aW5ncztcbiAgcHJvdGVjdGVkIF92YWxpZGF0aW9uQ2ZnczogSW5wdXRWYWxpZGF0aW9uQ2ZncztcbiAgcHJvdGVjdGVkIF9pbnB1dFBhcmVudDogYW55O1xuICBwcm90ZWN0ZWQgX25vdGljZXM6IE5vdGljZXMgPSBbXTtcbiAgcHJvdGVjdGVkIF9ub3RpY2VzVG9EZWxldGU6IG51bWJlcltdID0gW107XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGlucHV0LCBzZXR0aW5nczogU2V0dGluZ3MpIHtcbiAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgdGhpcy5fdmFsaWRhdGlvbkNmZ3MgPSBuZXcgSW5wdXRWYWxpZGF0aW9uQ2Zncyh0aGlzLl9zZXR0aW5ncy52YWxpZGF0aW9uQ2Zncy5hbGwpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgc3RhdGljIGluaXQoaW5wdXQsIHNldHRpbmdzOiBTZXR0aW5ncykge1xuICAgIGlucHV0ID0gJChpbnB1dCk7XG5cbiAgICBsZXQgb2JqID0gaW5wdXQuZGF0YShJbnB1dC5fb2JqRGF0YUtleSk7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIElucHV0KSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmogPSBuZXcgSW5wdXQoaW5wdXQsIHNldHRpbmdzKTtcbiAgICAgIGlucHV0LmRhdGEoSW5wdXQuX29iakRhdGFLZXksIG9iaik7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZXN0cm95KGlucHV0RWwsIHNldHRpbmdzOiBTZXR0aW5ncykge1xuICAgIGNvbnN0ICRpbnB1dCA9ICQoaW5wdXRFbCk7XG5cbiAgICBjb25zdCBpbnB1dCA9ICRpbnB1dC5kYXRhKElucHV0Ll9vYmpEYXRhS2V5KTtcbiAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBJbnB1dCkge1xuICAgICAgJGlucHV0LnJlbW92ZURhdGEoSW5wdXQuX29iakRhdGFLZXkpO1xuICAgICAgJGlucHV0LnJlbW92ZURhdGEoc2V0dGluZ3MuZGF0YUF0dHJzLnZhbGlkYXRpb25DZmdzKTtcblxuICAgICAgY29uc3QgaW5wdXRQYXJlbnQgPSAkaW5wdXQucGFyZW50cyhzZXR0aW5ncy5zZWxlY3RvcnMuaW5wdXRQYXJlbnQpLmZpcnN0KCk7XG4gICAgICBpbnB1dFBhcmVudC5maW5kKGBbY2xhc3MqPVwiJHtzZXR0aW5ncy5jc3NDbGFzc2VzLm5vdGljZUluZGV4fVwiXWApLnJlbW92ZSgpO1xuICAgICAgaW5wdXRQYXJlbnQucmVtb3ZlQ2xhc3MoT2JqZWN0LnZhbHVlcyhzZXR0aW5ncy5jc3NDbGFzc2VzKS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0KCkge1xuICAgIHRoaXMuc2V0VmFsaWRhdGlvbkNmZ3MoKTtcbiAgICB0aGlzLnNldElucHV0UGFyZW50KCk7XG4gIH1cblxuICB2YWxpZGF0ZSgpIHtcbiAgICBpZiAoIXRoaXMuX3ZhbGlkYXRpb25DZmdzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmVtcHR5Tm90aWNlcygpO1xuICAgIHRoaXMuY2hlY2tGaWVsZCgpO1xuICAgIHRoaXMuZGVsZXRlT2xkTm90aWNlcygpO1xuICAgIHRoaXMuYWRkTmV3Tm90aWNlcygpO1xuICAgIHRoaXMudG9nZ2xlVmFsaWRDbGFzcygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGVtcHR5Tm90aWNlcygpIHtcbiAgICB0aGlzLl9ub3RpY2VzID0gW107XG4gICAgdGhpcy5fbm90aWNlc1RvRGVsZXRlID0gW107XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0VmFsaWRhdGlvbkNmZ3MoKSB7XG4gICAgbGV0IHZhbGlkYXRpb25DZmdzID0gdGhpcy5faW5wdXQuZGF0YSh0aGlzLl9zZXR0aW5ncy5kYXRhQXR0cnMudmFsaWRhdGlvbkNmZ3MpO1xuXG4gICAgaWYgKHR5cGVvZiB2YWxpZGF0aW9uQ2ZncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICh2YWxpZGF0aW9uQ2Zncykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhbGlkYXRpb25DZmdzID0gSlNPTi5wYXJzZSh2YWxpZGF0aW9uQ2Zncyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uQ2ZncyA9IHZhbGlkYXRpb25DZmdzLnNwbGl0KCcsJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0aW9uQ2ZncyA9IHRoaXMuX3ZhbGlkYXRpb25DZmdzLnByb2Nlc3NWYWxpZGF0aW9uQ2Zncyh2YWxpZGF0aW9uQ2Zncyk7XG5cbiAgICBpZiAodGhpcy5fc2V0dGluZ3MudmFsaWRhdGVSZXF1aXJlZEZpZWxkcykge1xuICAgICAgdmFsaWRhdGlvbkNmZ3MucHVzaCh0aGlzLl9zZXR0aW5ncy52YWxpZGF0aW9uQ2Zncy5nZXRDZmdCeU5hbWUoJ3JlcXVpcmVkJykpO1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbGlkYXRpb25DZmdzLnNldFByb2Nlc3NlZENmZ3ModmFsaWRhdGlvbkNmZ3MpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldElucHV0UGFyZW50KCkge1xuICAgIHRoaXMuX2lucHV0UGFyZW50ID0gdGhpcy5faW5wdXQucGFyZW50cyh0aGlzLl9zZXR0aW5ncy5zZWxlY3RvcnMuaW5wdXRQYXJlbnQpLmZpcnN0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2hlY2tGaWVsZCgpIHtcbiAgICBsZXQgaW5kZXggPSAxO1xuXG4gICAgaWYgKHRoaXMuX2lucHV0LmlzKCc6Y2hlY2tib3gnKSAmJiB0aGlzLl92YWxpZGF0aW9uQ2Zncy5oYXNDZmdCeU5hbWUoJ3JlcXVpcmVkJykpIHtcbiAgICAgIGxldCByZXF1aXJlZFZhbGlkYXRpb25DZmcgPSB0aGlzLl92YWxpZGF0aW9uQ2Zncy5nZXRDZmdCeU5hbWUoJ3JlcXVpcmVkJyk7XG4gICAgICBpZiAodGhpcy5faW5wdXQuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgdGhpcy5fbm90aWNlc1RvRGVsZXRlLnB1c2goaW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fbm90aWNlcy5wdXNoKHtcbiAgICAgICAgICBub3RpY2U6IHJlcXVpcmVkVmFsaWRhdGlvbkNmZy5ub3RpY2UsXG4gICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl92YWxpZGF0aW9uQ2Zncy5hbGwuZm9yRWFjaCgoaXRlbSwgaSwgYXJyKSA9PiB7XG4gICAgICAgIGluZGV4ID0gaSArIDE7XG4gICAgICAgIGxldCByZWdFeHA7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtLnJlZ2V4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHJlZ0V4cCA9IGl0ZW0ucmVnZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgZmxhZ3MgPSBpdGVtLnJlZ2V4LnNwbGl0KCcvJykucG9wKCk7XG4gICAgICAgICAgY29uc3QgcmVnRXhwU3RyID0gaXRlbS5yZWdleC5zdWJzdHJpbmcoaXRlbS5yZWdleC5pbmRleE9mKCcvJykgKyAxLCBpdGVtLnJlZ2V4Lmxhc3RJbmRleE9mKCcvJykpO1xuICAgICAgICAgIHJlZ0V4cCA9IG5ldyBSZWdFeHAocmVnRXhwU3RyLCBmbGFncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlZ0V4cC50ZXN0KHRoaXMuX2lucHV0LnZhbCgpKSkge1xuICAgICAgICAgIHRoaXMuX25vdGljZXMucHVzaCh7XG4gICAgICAgICAgICBub3RpY2U6IGl0ZW0ubm90aWNlLFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fbm90aWNlc1RvRGVsZXRlLnB1c2goaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZGVsZXRlT2xkTm90aWNlcygpIHtcbiAgICB0aGlzLl9ub3RpY2VzVG9EZWxldGUuZm9yRWFjaCgobm90aWNlSW5kZXgsIGksIGFycikgPT4ge1xuICAgICAgdGhpcy5faW5wdXRQYXJlbnQuZmluZCgnLicgKyB0aGlzLl9zZXR0aW5ncy5jc3NDbGFzc2VzLm5vdGljZUluZGV4ICsgbm90aWNlSW5kZXgpLnJlbW92ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZE5ld05vdGljZXMoKSB7XG4gICAgdGhpcy5fbm90aWNlcy5mb3JFYWNoKChub3RpY2UsIGksIGFycikgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9pbnB1dFBhcmVudC5maW5kKCcuJyArIHRoaXMuX3NldHRpbmdzLmNzc0NsYXNzZXMubm90aWNlSW5kZXggKyBub3RpY2UuaW5kZXgpLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBub3RpY2VFbGVtID0gJChgPCR7dGhpcy5fc2V0dGluZ3Mubm90aWNlVGFnTmFtZX0+YCkuYWRkQ2xhc3ModGhpcy5fc2V0dGluZ3MuY3NzQ2xhc3Nlcy5ub3RpY2VJbmRleCArIG5vdGljZS5pbmRleCkudGV4dChub3RpY2Uubm90aWNlKTtcbiAgICAgICAgdGhpcy5faW5wdXRQYXJlbnQuYXBwZW5kKG5vdGljZUVsZW0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuICF0aGlzLl9ub3RpY2VzLmxlbmd0aDtcbiAgfVxuXG4gIHByb3RlY3RlZCB0b2dnbGVWYWxpZENsYXNzKCkge1xuICAgIGlmICh0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgdGhpcy5faW5wdXRQYXJlbnQuYWRkQ2xhc3ModGhpcy5fc2V0dGluZ3MuY3NzQ2xhc3Nlcy5pbnB1dFZhbGlkKS5yZW1vdmVDbGFzcyh0aGlzLl9zZXR0aW5ncy5jc3NDbGFzc2VzLmlucHV0SW52YWxpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lucHV0UGFyZW50LnJlbW92ZUNsYXNzKHRoaXMuX3NldHRpbmdzLmNzc0NsYXNzZXMuaW5wdXRWYWxpZCkuYWRkQ2xhc3ModGhpcy5fc2V0dGluZ3MuY3NzQ2xhc3Nlcy5pbnB1dEludmFsaWQpO1xuICAgIH1cbiAgfVxufSIsImltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jb25maWdcIjtcbmltcG9ydCB7VmFsaWRhdGlvbkNmZ3N9IGZyb20gXCIuL3ZhbGlkYXRpb24tY2Znc1wiO1xuXG5sZXQgJCA9IHdpbmRvd1snalF1ZXJ5J107XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XG4gIHByb3RlY3RlZCBfZGVmYXVsdHM6IENvbmZpZyA9IHtcbiAgICBldmVudE5hbWVzcGFjZTogJ2RlUmVnZXhWYWxpZGF0aW9uJyxcbiAgICBldmVudHM6IFsnaW5wdXQnLCAnY2hhbmdlJywgJ2JsdXInXSxcbiAgICBkYXRhQXR0cnM6IHtcbiAgICAgIHZhbGlkYXRpb25DZmdzOiAndmFsaWRhdGlvbi1jZmcnLFxuICAgIH0sXG4gICAgY3NzQ2xhc3Nlczoge1xuICAgICAgZm9ybVZhbGlkOiAnZm9ybS12YWxpZCcsXG4gICAgICBmb3JtSW52YWxpZDogJ2Zvcm0taW52YWxpZCcsXG4gICAgICBpbnB1dFZhbGlkOiAnaW5wdXQtdmFsaWQnLFxuICAgICAgaW5wdXRJbnZhbGlkOiAnaW5wdXQtaW52YWxpZCcsXG4gICAgICBub3RpY2VJbmRleDogJ3ZhbGlkYXRpb24tbm90aWNlLScsXG4gICAgfSxcbiAgICBzZWxlY3RvcnM6IHtcbiAgICAgIGlucHV0UGFyZW50OiAnLmZvcm0tcm93JyxcbiAgICB9LFxuICAgIG5vdGljZVRhZ05hbWU6ICdwJyxcbiAgICBwcmV2ZW50U3VibWl0T25JbnZhbGlkOiBmYWxzZSxcbiAgICBkaXNhYmxlRm9ybU9uSW52YWxpZDogZmFsc2UsXG4gICAgdmFsaWRhdGVSZXF1aXJlZEZpZWxkczogZmFsc2UsXG4gICAgdXNlclZhbGlkYXRpb25DZmdzOiBbXSxcbiAgICBvbjoge31cbiAgfTtcbiAgcHJvdGVjdGVkIF9zZXR0aW5nczogQ29uZmlnO1xuICBwcm90ZWN0ZWQgX3ZhbGlkYXRpb25DZmdzOiBWYWxpZGF0aW9uQ2ZncztcblxuICBnZXQgZXZlbnROYW1lc3BhY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLmV2ZW50TmFtZXNwYWNlO1xuICB9XG5cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MuZXZlbnRzO1xuICB9XG5cbiAgZ2V0IGRhdGFBdHRycygpIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MuZGF0YUF0dHJzO1xuICB9XG5cbiAgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLmNzc0NsYXNzZXM7XG4gIH1cblxuICBnZXQgc2VsZWN0b3JzKCkge1xuICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5zZWxlY3RvcnM7XG4gIH1cblxuICBnZXQgbm90aWNlVGFnTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3Mubm90aWNlVGFnTmFtZTtcbiAgfVxuXG4gIGdldCBwcmV2ZW50U3VibWl0T25JbnZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5wcmV2ZW50U3VibWl0T25JbnZhbGlkO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVGb3JtT25JbnZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5kaXNhYmxlRm9ybU9uSW52YWxpZDtcbiAgfVxuXG4gIGdldCB2YWxpZGF0ZVJlcXVpcmVkRmllbGRzKCkge1xuICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy52YWxpZGF0ZVJlcXVpcmVkRmllbGRzO1xuICB9XG5cbiAgZ2V0IHVzZXJWYWxpZGF0aW9uQ2ZncygpIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MudXNlclZhbGlkYXRpb25DZmdzO1xuICB9XG5cbiAgZ2V0IHZhbGlkYXRpb25DZmdzKCk6IFZhbGlkYXRpb25DZmdzIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGlvbkNmZ3M7XG4gIH1cblxuICBnZXQgb24oKTogRW1pdEV2ZW50cyB7XG4gICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLm9uO1xuICB9XG5cbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MpIHtcbiAgICB0aGlzLmluaXQoc2V0dGluZ3MpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXQoc2V0dGluZ3MpIHtcbiAgICB0aGlzLmluaXREeW5hbWljU2V0dGluZ3MoKTtcbiAgICB0aGlzLmluaXRTZXR0aW5ncyhzZXR0aW5ncyk7XG4gICAgdGhpcy5pbml0VmFsaWRhdGlvbkNmZ3MoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0RHluYW1pY1NldHRpbmdzKCkge1xuICAgIHRoaXMuX2RlZmF1bHRzLnNlbGVjdG9ycyA9ICQuZXh0ZW5kKHRoaXMuX2RlZmF1bHRzLnNlbGVjdG9ycywge1xuICAgICAgaW5wdXQ6ICdpbnB1dFtkYXRhLScgKyB0aGlzLl9kZWZhdWx0cy5kYXRhQXR0cnMudmFsaWRhdGlvbkNmZ3MgKyAnXScsXG4gICAgICB0ZXh0YXJlYTogJ3RleHRhcmVhW2RhdGEtJyArIHRoaXMuX2RlZmF1bHRzLmRhdGFBdHRycy52YWxpZGF0aW9uQ2ZncyArICddJyxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0U2V0dGluZ3Moc2V0dGluZ3MpIHtcbiAgICB0aGlzLl9zZXR0aW5ncyA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9kZWZhdWx0cywgc2V0dGluZ3MpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRWYWxpZGF0aW9uQ2ZncygpIHtcbiAgICB0aGlzLl92YWxpZGF0aW9uQ2ZncyA9IG5ldyBWYWxpZGF0aW9uQ2Zncyh0aGlzLl9zZXR0aW5ncy51c2VyVmFsaWRhdGlvbkNmZ3MpO1xuICB9XG59IiwiaW1wb3J0IHtWYWxpZGF0aW9uQ29uZmlnLCBWYWxpZGF0aW9uQ29uZmlnc30gZnJvbSBcIi4uL2ludGVyZmFjZXMvY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uQ2ZncyB7XG4gIHByb3RlY3RlZCBfdmFsaWRhdGlvbkNmZ3M6IFZhbGlkYXRpb25Db25maWdzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6ICdsZXR0ZXJzJyxcbiAgICAgIHJlZ2V4OiAvXlthLXpBLVpdKiQvLFxuICAgICAgbm90aWNlOiAnT25seSBsZXR0ZXJzJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2xldHRlcnNfc3BlY2lhbCcsXG4gICAgICByZWdleDogL15bYS16QS1aXFwvXFwtXFxzXSokLyxcbiAgICAgIG5vdGljZTogJ09ubHkgbGV0dGVycywgc3BhY2VzIC8gLSdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdsZXR0ZXJzX3NwZWNpYWxfMicsXG4gICAgICByZWdleDogL15bYS16QS1aXFwvXFwtXFxzXFwuXFwsXSokLyxcbiAgICAgIG5vdGljZTogJ09ubHkgd29yZHMsIHNwYWNlcyAvIC0gLCAuJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2RpZ2l0c19vbmx5JyxcbiAgICAgIHJlZ2V4OiAvXlxcZCokLyxcbiAgICAgIG5vdGljZTogJ0RpZ2l0cyBvbmx5J1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2RpZ2l0czknLFxuICAgICAgcmVnZXg6IC9eKFswLTldezl9KT8kLyxcbiAgICAgIG5vdGljZTogJ0V4YWN0bHkgOSBkaWdpdHMnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZGlnaXRzMTAnLFxuICAgICAgcmVnZXg6IC9eKFswLTldezEwfSk/JC8sXG4gICAgICBub3RpY2U6ICdFeGFjdGx5IDEwIGRpZ2l0cydcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdkaWdpdHNfYW5kX3NlcGFyYXRvcnNfb25seScsXG4gICAgICByZWdleDogL15bXFxkLixdKiQvLFxuICAgICAgbm90aWNlOiAnRGlnaXRzIGFuZCBzZXBhcmF0b3JzIG9ubHknXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnbnVtYmVyJyxcbiAgICAgIHJlZ2V4OiAvXlxcLT8oWzEtOV0rfDBbLixdXFxkK3xbMS05XSs/Wy4sXVxcZCspJC8sXG4gICAgICBub3RpY2U6ICdQcm92aWRlIHZhbGlkIG51bWJlcicsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnbGV0dGVyc19kaWdpdHNfb25seScsXG4gICAgICByZWdleDogL15bYS16QS1aMC05XSokLyxcbiAgICAgIG5vdGljZTogJ09ubHkgbGV0dGVycywgZGlnaXRzLCBzcGFjZSBhbmQgLSdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdsZXR0ZXJzX2RpZ2l0c19zcGVjaWFsJyxcbiAgICAgIHJlZ2V4OiAvXlthLXpBLVpcXC9cXC1cXHMwLTldKiQvLFxuICAgICAgbm90aWNlOiAnT25seSBsZXR0ZXJzLCBkaWdpdHMsIHNwYWNlIC8gLSdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdsZXR0ZXJzX2RpZ2l0c19zcGVjaWFsXzInLFxuICAgICAgcmVnZXg6IC9eW2EtekEtWlxcL1xcLVxcLFxcLlxcczAtOV0qJC8sXG4gICAgICBub3RpY2U6ICdPbmx5IGxldHRlcnMsIGRpZ2l0cywgc3BhY2UgLyAtICwgLidcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdlbWFpbCcsXG4gICAgICByZWdleDogL14oXFxTK0BcXFMrXFwuXFxTezIsfSk/JC8sXG4gICAgICBub3RpY2U6ICdQcm92aWRlIHZhbGlkIGVtYWlsJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3JlcXVpcmVkJyxcbiAgICAgIHJlZ2V4OiAvXi4rJC8sXG4gICAgICBub3RpY2U6ICdUaGlzIGZpZWxkIGlzIHJlcXVpcmVkJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3Bhc3N3b3JkXzYnLFxuICAgICAgcmVnZXg6IC9eKC57Nix9KT8kLyxcbiAgICAgIG5vdGljZTogJ1Bhc3N3b3JkIHJlcXVpcmVzIGF0IGxlYXN0IDYgc3ltYm9scydcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdwaG9uZScsXG4gICAgICByZWdleDogL14oXFwrKDlbOTc2XVxcZHw4Wzk4NzUzMF1cXGR8Nls5ODddXFxkfDVbOTBdXFxkfDQyXFxkfDNbODc1XVxcZHwyWzk4NjU0MzIxXVxcZHw5Wzg1NDMyMTBdfDhbNjQyMV18Nls2NTQzMjEwXXw1Wzg3NjU0MzIxXXw0Wzk4NzY1NDMxMF18M1s5NjQzMjEwXXwyWzcwXXw3fDEpXFxkezUsMTR9KT8kLyxcbiAgICAgIG5vdGljZTogJ1Byb3ZpZGUgcGhvbmUgaW4gdGhlIGludGVybmF0aW9uYWwgZm9ybWF0J1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2hleF92YWx1ZScsXG4gICAgICByZWdleDogL14oIz9bMC05YS1mXSopPyQvLFxuICAgICAgbm90aWNlOiAnUHJvdmlkZSB2YWxpZCBoZXggdmFsdWUnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAncmdiX2NvbG9yX3ZhbHVlJyxcbiAgICAgIHJlZ2V4OiAvXihyZ2JcXChcXHM/KDFbMC05XXsyfXxbMC05XXxbMS05XVswLTldfDIoWzAtNF1bMC05XXw1WzAtNV0pKVxccz9cXCxcXHM/KDFbMC05XXsyfXxbMC05XXxbMS05XVswLTldfDIoWzAtNF1bMC05XXw1WzAtNV0pKVxccz9cXCxcXHM/KDFbMC05XXsyfXxbMC05XXxbMS05XVswLTldfDIoWzAtNF1bMC05XXw1WzAtNV0pKVxccz9cXCkpPyQvLFxuICAgICAgbm90aWNlOiAnUHJvdmlkZSB2YWxpZCByZ2IgY29sb3InLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3JnYmFfY29sb3JfdmFsdWUnLFxuICAgICAgcmVnZXg6IC9eKHJnYmFcXChcXHM/KDFbMC05XXsyfXxbMC05XXxbMS05XVswLTldfDIoWzAtNF1bMC05XXw1WzAtNV0pKVxccz9cXCxcXHM/KDFbMC05XXsyfXxbMC05XXxbMS05XVswLTldfDIoWzAtNF1bMC05XXw1WzAtNV0pKVxccz9cXCxcXHM/KDFbMC05XXsyfXxbMC05XXxbMS05XVswLTldfDIoWzAtNF1bMC05XXw1WzAtNV0pKVxccz9cXCxcXHM/KFswMV18MFxcLihbMS05XXxbMC05XVsxLTldKSlcXHM/XFwpKT8kLyxcbiAgICAgIG5vdGljZTogJ1Byb3ZpZGUgdmFsaWQgcmdiYSBjb2xvcicsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnaHNsX2NvbG9yX3ZhbHVlJyxcbiAgICAgIHJlZ2V4OiAvXihoc2xcXChcXHM/KFsxLTldP1swLTldfFsxMl1bMC05XXsyfXwzKFswLTVdWzAtOV18NjApKVxccz9cXCxcXHM/KFsxLTldP1swLTldfDEwMCklXFxzP1xcLFxccz8oWzEtOV0/WzAtOV18MTAwKSVcXHM/XFwpKT8kLyxcbiAgICAgIG5vdGljZTogJ1Byb3ZpZGUgdmFsaWQgaHNsIGNvbG9yJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdoc2xhX2NvbG9yX3ZhbHVlJyxcbiAgICAgIHJlZ2V4OiAvXihoc2xhXFwoXFxzPyhbMS05XT9bMC05XXxbMTJdWzAtOV17Mn18MyhbMC01XVswLTldfDYwKSlcXHM/XFwsXFxzPyhbMS05XT9bMC05XXwxMDApJVxccz9cXCxcXHM/KFsxLTldP1swLTldfDEwMCklXFwsXFxzPygxfDB8MFxcLlswLTldKz8pXFxzP1xcKSk/JC8sXG4gICAgICBub3RpY2U6ICdQcm92aWRlIHZhbGlkIGhzbGEgY29sb3InLFxuICAgIH0sXG4gIF07XG5cbiAgY29uc3RydWN0b3IodmFsaWRhdGlvbkNmZ3M6IFZhbGlkYXRpb25Db25maWdzKSB7XG4gICAgdGhpcy5tZXJnZVZhbGlkYXRpb25DZmdzKHZhbGlkYXRpb25DZmdzKTtcbiAgfVxuXG4gIGdldCBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRpb25DZmdzLmxlbmd0aDtcbiAgfVxuXG4gIGdldCBhbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRpb25DZmdzO1xuICB9XG5cbiAgbWVyZ2VWYWxpZGF0aW9uQ2Zncyh2YWxpZGF0aW9uQ2ZnczogVmFsaWRhdGlvbkNvbmZpZ3MpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWxpZGF0aW9uQ2ZncykgJiYgdmFsaWRhdGlvbkNmZ3MubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBjZmcgb2YgdmFsaWRhdGlvbkNmZ3MpIHtcbiAgICAgICAgdGhpcy5tZXJnZVZhbGlkYXRpb25DZmcoY2ZnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jaGVja0NvbmZpZ0ZvckNvbnNpc3RlbmN5KCk7XG4gICAgdGhpcy5yZW1vdmVEdXBsaWNhdGVkQ2Znc0J5TmFtZXMoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtZXJnZVZhbGlkYXRpb25DZmcoY2ZnOiBWYWxpZGF0aW9uQ29uZmlnKSB7XG4gICAgbGV0IHB1c2hlZCA9IGZhbHNlO1xuICAgIGZvciAobGV0IFtpbmRleCwgcGx1Z2luQ2ZnXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLl92YWxpZGF0aW9uQ2ZncykpIHtcbiAgICAgIGlmIChwbHVnaW5DZmcubmFtZSA9PT0gY2ZnLm5hbWUpIHtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGlvbkNmZ3Muc3BsaWNlKGluZGV4LCAxLCAkLmV4dGVuZCh0cnVlLCB7fSwgcGx1Z2luQ2ZnLCBjZmcpKTtcbiAgICAgICAgcHVzaGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFwdXNoZWQpIHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRpb25DZmdzLnB1c2goY2ZnKTtcbiAgICB9XG4gIH1cblxuICBnZXRDZmdCeU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgZm9yIChsZXQgY2ZnIG9mIHRoaXMuX3ZhbGlkYXRpb25DZmdzKSB7XG4gICAgICBpZiAoY2ZnLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGNmZztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXNDZmdCeU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuICEhdGhpcy5nZXRDZmdCeU5hbWUobmFtZSk7XG4gIH1cblxuICBjaGVja0NvbmZpZ0ZvckNvbnNpc3RlbmN5KCkge1xuICAgIGNvbnN0IGZpZWxkcyA9IFsncmVnZXgnLCAnbm90aWNlJ107XG4gICAgZm9yIChjb25zdCBbaW5kZXgsIGNmZ10gb2YgT2JqZWN0LmVudHJpZXModGhpcy5fdmFsaWRhdGlvbkNmZ3MpKSB7XG4gICAgICBsZXQgaW52YWxpZENmZyA9IGZhbHNlO1xuICAgICAgbGV0IGFic2VudEZpZWxkcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhjZmcpLmluY2x1ZGVzKGZpZWxkc1tpXSkpIHtcbiAgICAgICAgICBpbnZhbGlkQ2ZnID0gdHJ1ZTtcbiAgICAgICAgICBhYnNlbnRGaWVsZHMucHVzaChmaWVsZHNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW52YWxpZENmZykge1xuICAgICAgICB0aGlzLl92YWxpZGF0aW9uQ2Zncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoaXMgdmFsaWRhdGlvbiBjZmcgaXMgbm90IHZhbGlkJywgY2ZnLCAnSXQgaGFzIG5vdCBnb3Qgc3VjaCBmaWVsZHMgYXM6ICcgKyBhYnNlbnRGaWVsZHMuam9pbignLCAnKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRHVwbGljYXRlZENmZ3NCeU5hbWVzKCkge1xuICAgIGNvbnN0IGNoZWNrZWQgPSBbXTtcblxuICAgIGZvciAoY29uc3QgW2luZGV4LCBjZmddIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuX3ZhbGlkYXRpb25DZmdzKSkge1xuICAgICAgaWYgKGNoZWNrZWQuaW5jbHVkZXMoY2ZnLm5hbWUpKSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRpb25DZmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGVja2VkLnB1c2goY2ZnLm5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IHtWYWxpZGF0aW9uQ29uZmlnc30gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbmZpZyc7XHJcbmltcG9ydCB7U2V0dGluZ3N9IGZyb20gXCIuL2NsYXNzZXMvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHtJbnB1dH0gZnJvbSBcIi4vY2xhc3Nlcy9pbnB1dFwiO1xyXG5pbXBvcnQge0V2ZW50c0VtaXR0ZXJ9IGZyb20gXCIuL2NsYXNzZXMvZXZlbnRzLWVtaXR0ZXJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBwbHVnaW5OYW1lID0gJ2RlUmVnZXhWYWxpZGF0aW9uJztcclxuXHJcbmNsYXNzIERlUmVnZXhWYWxpZGF0aW9uIHtcclxuICBwdWJsaWMgZm9ybTogYW55O1xyXG4gIHB1YmxpYyBzZXR0aW5nczogU2V0dGluZ3M7XHJcbiAgcHVibGljIHZhbGlkYXRpb25DZmdzOiBWYWxpZGF0aW9uQ29uZmlncztcclxuICBwdWJsaWMgZXZlbnRzRW1pdHRlcjogRXZlbnRzRW1pdHRlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoZm9ybSwgc2V0dGluZ3MpIHtcclxuICAgIHRoaXMuZm9ybSA9ICQoZm9ybSk7XHJcbiAgICB0aGlzLnNldHRpbmdzID0gbmV3IFNldHRpbmdzKHNldHRpbmdzKTtcclxuICAgIHRoaXMuZXZlbnRzRW1pdHRlciA9IG5ldyBFdmVudHNFbWl0dGVyKHRoaXMuc2V0dGluZ3Mub24sIHRoaXMpO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgICB0aGlzLmV2ZW50c0VtaXR0ZXIudHJpZ2dlckluaXQodGhpcy5mb3JtKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0KCkge1xyXG4gICAgdGhpcy5zZXRFdmVudEhhbmRsZXJzKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc2V0RXZlbnRIYW5kbGVycygpIHtcclxuICAgIHRoaXMub25JbnB1dEV2ZW50cygpO1xyXG4gICAgdGhpcy5vbkZvcm1TdWJtaXQoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvbklucHV0RXZlbnRzKCkge1xyXG4gICAgdGhpcy5zZXR0aW5ncy5ldmVudHMuZm9yRWFjaCgoZXZlbnQsIGksIGFycikgPT4ge1xyXG4gICAgICBjb25zdCBldmVudFdpdGhOYW1lc3BhY2UgPSBldmVudCArICcuJyArIHRoaXMuc2V0dGluZ3MuZXZlbnROYW1lc3BhY2U7XHJcbiAgICAgIHRoaXMuZm9ybS5vZmYoZXZlbnRXaXRoTmFtZXNwYWNlKTtcclxuICAgICAgdGhpcy5mb3JtLm9uKGV2ZW50V2l0aE5hbWVzcGFjZSwgYCR7dGhpcy5zZXR0aW5ncy5zZWxlY3RvcnMuaW5wdXR9LCR7dGhpcy5zZXR0aW5ncy5zZWxlY3RvcnMudGV4dGFyZWF9YCwgKGUpID0+IHtcclxuICAgICAgICBjb25zdCAkaW5wdXQgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5ldmVudHNFbWl0dGVyLnRyaWdnZXJCZWZvcmVGaWVsZFZhbGlkYXRpb24odGhpcy5mb3JtLCAkaW5wdXQpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gSW5wdXQuaW5pdCgkaW5wdXQsIHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgIGlucHV0LnZhbGlkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5tYXJrRm9ybVZhbGlkKCk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uT25Gb3JtSW52YWxpZCgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzRW1pdHRlci50cmlnZ2VyQWZ0ZXJGaWVsZFZhbGlkYXRpb24odGhpcy5mb3JtLCAkaW5wdXQpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uRm9ybVN1Ym1pdCgpIHtcclxuICAgIHRoaXMuZm9ybS5vZmYoJ3N1Ym1pdC4nICsgdGhpcy5zZXR0aW5ncy5ldmVudE5hbWVzcGFjZSk7XHJcbiAgICB0aGlzLmZvcm0ub24oJ3N1Ym1pdC4nICsgdGhpcy5zZXR0aW5ncy5ldmVudE5hbWVzcGFjZSwgKGUpID0+IHtcclxuICAgICAgICB0aGlzLnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbk9uRm9ybUludmFsaWQoKTtcclxuICAgICAgICBpZiAodGhpcy5hbGxJbnB1dHNWYWxpZCgpKSB7XHJcbiAgICAgICAgICB0aGlzLmV2ZW50c0VtaXR0ZXIudHJpZ2dlclZhbGlkRm9ybVN1Ym1pdCh0aGlzLmZvcm0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5wcmV2ZW50U3VibWl0T25JbnZhbGlkKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZXZlbnRzRW1pdHRlci50cmlnZ2VySW52YWxpZEZvcm1TdWJtaXQodGhpcy5mb3JtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgbWFya0Zvcm1WYWxpZCgpIHtcclxuICAgIGlmICh0aGlzLmFsbElucHV0c1ZhbGlkKCkpIHtcclxuICAgICAgdGhpcy5mb3JtLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MuY3NzQ2xhc3Nlcy5mb3JtVmFsaWQpLnJlbW92ZUNsYXNzKHRoaXMuc2V0dGluZ3MuY3NzQ2xhc3Nlcy5mb3JtSW52YWxpZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZvcm0uYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5jc3NDbGFzc2VzLmZvcm1JbnZhbGlkKS5yZW1vdmVDbGFzcyh0aGlzLnNldHRpbmdzLmNzc0NsYXNzZXMuZm9ybVZhbGlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBhbGxJbnB1dHNWYWxpZCgpIHtcclxuICAgIHJldHVybiAhdGhpcy5mb3JtLmZpbmQodGhpcy5zZXR0aW5ncy5zZWxlY3RvcnMuaW5wdXQgKyAnLCcgKyB0aGlzLnNldHRpbmdzLnNlbGVjdG9ycy50ZXh0YXJlYSlcclxuICAgICAgLnBhcmVudHModGhpcy5zZXR0aW5ncy5zZWxlY3RvcnMuaW5wdXRQYXJlbnQpLmhhc0NsYXNzKHRoaXMuc2V0dGluZ3MuY3NzQ2xhc3Nlcy5pbnB1dEludmFsaWQpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGRpc2FibGVCdXR0b25PbkZvcm1JbnZhbGlkKCkge1xyXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZGlzYWJsZUZvcm1PbkludmFsaWQpIHtcclxuICAgICAgY29uc3Qgc3VibWl0QnRuID0gdGhpcy5mb3JtLmZpbmQoJ2lucHV0W3R5cGU9c3VibWl0XSxidXR0b25bdHlwZT1zdWJtaXRdLGJ1dHRvbjpub3QoW3R5cGVdKScpO1xyXG4gICAgICBpZiAodGhpcy5hbGxJbnB1dHNWYWxpZCgpKSB7XHJcbiAgICAgICAgc3VibWl0QnRuLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3VibWl0QnRuLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSkucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGVGb3JtKHNjcm9sbFRvSW52YWxpZDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBpbnB1dHMgPSB0aGlzLmZvcm0uZmluZCh0aGlzLnNldHRpbmdzLnNlbGVjdG9ycy5pbnB1dCArICcsJyArIHRoaXMuc2V0dGluZ3Muc2VsZWN0b3JzLnRleHRhcmVhKTtcclxuICAgIGlucHV0cy5lYWNoKChpLCBlbGVtLCBhcnIpID0+IHtcclxuICAgICAgY29uc3QgJGlucHV0ID0gJChlbGVtKTtcclxuICAgICAgY29uc3QgaW5wdXQgPSBJbnB1dC5pbml0KCRpbnB1dCwgdGhpcy5zZXR0aW5ncyk7XHJcbiAgICAgIGlucHV0LnZhbGlkYXRlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMubWFya0Zvcm1WYWxpZCgpO1xyXG4gICAgaWYgKHNjcm9sbFRvSW52YWxpZCkge1xyXG4gICAgICB0aGlzLnNjcm9sbFRvSW52YWxpZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHNjcm9sbFRvSW52YWxpZCgpIHtcclxuICAgIGNvbnN0IGludmFsaWRJbnB1dHMgPSB0aGlzLmZvcm0uZmluZCgnLicgKyB0aGlzLnNldHRpbmdzLmNzc0NsYXNzZXMuaW5wdXRpbnZhbGlkKTtcclxuICAgIGxldCB0b3BJbnZhbGlkSW5wdXQ7XHJcbiAgICBpbnZhbGlkSW5wdXRzLmVhY2goKGksIGludmFsaWRJbnB1dCkgPT4ge1xyXG4gICAgICBpbnZhbGlkSW5wdXQgPSAkKGludmFsaWRJbnB1dCk7XHJcbiAgICAgIGlmICghdG9wSW52YWxpZElucHV0KSB7XHJcbiAgICAgICAgdG9wSW52YWxpZElucHV0ID0gaW52YWxpZElucHV0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0b3BJbnZhbGlkSW5wdXQub2Zmc2V0KCkudG9wID4gaW52YWxpZElucHV0Lm9mZnNldCgpLnRvcCkge1xyXG4gICAgICAgICAgdG9wSW52YWxpZElucHV0ID0gaW52YWxpZElucHV0O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRvcEludmFsaWRJbnB1dCAmJiB0b3BJbnZhbGlkSW5wdXQubGVuZ3RoKSB7XHJcbiAgICAgICQoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0pLmFuaW1hdGUoe1xyXG4gICAgICAgIHNjcm9sbFRvcDogdG9wSW52YWxpZElucHV0Lm9mZnNldCgpLnRvcCAtIDUwXHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuZXZlbnRzRW1pdHRlci50cmlnZ2VyQmVmb3JlRGVzdHJveSh0aGlzLmZvcm0pO1xyXG4gICAgdGhpcy5vZmZBbGxJbnB1dEV2ZW50cygpO1xyXG4gICAgdGhpcy5yZW1vdmVBbGxJbnB1dEluc3RhbmNlcygpO1xyXG4gICAgdGhpcy5yZW1vdmVBbGxGb3JtQ1NTQ2xhc3NlcygpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9mZkFsbElucHV0RXZlbnRzKCkge1xyXG4gICAgdGhpcy5zZXR0aW5ncy5ldmVudHMuZm9yRWFjaCgoZXZlbnQsIGksIGFycikgPT4ge1xyXG4gICAgICBjb25zdCBldmVudFdpdGhOYW1lc3BhY2UgPSBldmVudCArICcuJyArIHRoaXMuc2V0dGluZ3MuZXZlbnROYW1lc3BhY2U7XHJcbiAgICAgIHRoaXMuZm9ybS5vZmYoZXZlbnRXaXRoTmFtZXNwYWNlLCAnKionKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnNldHRpbmdzLnByZXZlbnRTdWJtaXRPbkludmFsaWQpIHtcclxuICAgICAgdGhpcy5mb3JtLm9mZignc3VibWl0LicgKyB0aGlzLnNldHRpbmdzLmV2ZW50TmFtZXNwYWNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCByZW1vdmVBbGxJbnB1dEluc3RhbmNlcygpIHtcclxuICAgIHRoaXMuZm9ybS5maW5kKGAke3RoaXMuc2V0dGluZ3Muc2VsZWN0b3JzLmlucHV0fSwke3RoaXMuc2V0dGluZ3Muc2VsZWN0b3JzLnRleHRhcmVhfWApLmVhY2goKGksIGlucHV0KSA9PiB7XHJcbiAgICAgIGlucHV0ID0gJChpbnB1dCk7XHJcbiAgICAgIElucHV0LmRlc3Ryb3koaW5wdXQsIHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVtb3ZlQWxsRm9ybUNTU0NsYXNzZXMoKSB7XHJcbiAgICB0aGlzLmZvcm0ucmVtb3ZlQ2xhc3MoT2JqZWN0LnZhbHVlcyh0aGlzLnNldHRpbmdzLmNzc0NsYXNzZXMpLmpvaW4oJyAnKSk7XHJcbiAgfVxyXG59XHJcblxyXG4kLmZuW3BsdWdpbk5hbWVdID0gZnVuY3Rpb24gKHNldHRpbmdzLCAuLi5hcmdzKSB7XHJcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9ICQuZGF0YSh0aGlzLCAgcGx1Z2luTmFtZSk7XHJcblxyXG4gICAgaWYgKCFpbnN0YW5jZSkge1xyXG4gICAgICBpZiAodHlwZW9mIHNldHRpbmdzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIC8vd2UgY2FuJ3QgaW52b2tlIHBsdWdpbiBtZXRob2Qgd2l0aG91dCBpbml0aWFsaXplZCBwbHVnaW4gaW5zdGFuY2VcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuICAgICAgJC5kYXRhKHRoaXMsIHBsdWdpbk5hbWUsIG5ldyBEZVJlZ2V4VmFsaWRhdGlvbih0aGlzLCBzZXR0aW5ncykpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3aXRjaCAoc2V0dGluZ3MpIHtcclxuICAgICAgICBjYXNlICd2YWxpZGF0ZUZvcm0nOlxyXG4gICAgICAgICAgaW5zdGFuY2UudmFsaWRhdGVGb3JtKCEhYXJnc1swXSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdkZXN0cm95JzpcclxuICAgICAgICAgIGluc3RhbmNlLmRlc3Ryb3koKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcbiJdfQ==
