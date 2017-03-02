(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "classnames"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("classnames")) : factory(root["react"], root["classnames"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _rules = __webpack_require__(2);

	var _rules2 = _interopRequireDefault(_rules);

	var _Form = __webpack_require__(10);

	var _Form2 = _interopRequireDefault(_Form);

	var _Input = __webpack_require__(11);

	var _Input2 = _interopRequireDefault(_Input);

	var _Select = __webpack_require__(12);

	var _Select2 = _interopRequireDefault(_Select);

	var _Textarea = __webpack_require__(13);

	var _Textarea2 = _interopRequireDefault(_Textarea);

	var _Button = __webpack_require__(9);

	var _Button2 = _interopRequireDefault(_Button);

	var _inputFactory = __webpack_require__(6);

	var _inputFactory2 = _interopRequireDefault(_inputFactory);

	var _selectFactory = __webpack_require__(7);

	var _selectFactory2 = _interopRequireDefault(_selectFactory);

	var _textareaFactory = __webpack_require__(8);

	var _textareaFactory2 = _interopRequireDefault(_textareaFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    rules: _rules2.default,
	    components: {
	        Form: _Form2.default,
	        Input: _Input2.default,
	        Select: _Select2.default,
	        Textarea: _Textarea2.default,
	        Button: _Button2.default
	    },
	    factories: {
	        inputFactory: _inputFactory2.default,
	        selectFactory: _selectFactory2.default,
	        textareaFactory: _textareaFactory2.default
	    }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _noop = __webpack_require__(14);

	var _noop2 = _interopRequireDefault(_noop);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Base = function (_Component) {
	    _inherits(Base, _Component);

	    function Base() {
	        var _ref;

	        var _temp, _this, _ret;

	        _classCallCheck(this, Base);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Base.__proto__ || Object.getPrototypeOf(Base)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (event) {
	            // TODO: Refactor conditions
	            var isChecked = _this.state.isCheckbox ? !_this.state.isChecked : true;
	            var checkboxValue = isChecked ? event.target.value : '';
	            var value = _this.state.isCheckbox ? checkboxValue : event.target.value;

	            event.persist();

	            _this.setState({
	                value: value,
	                isChanged: true,
	                isChecked: isChecked
	            }, function () {
	                _this.context.validateState(_this.props.name);

	                (_this.props.onChange || _noop2.default)(event);
	            });
	        }, _this.onBlur = function (event) {
	            event.persist();

	            _this.setState({
	                isUsed: true
	            }, function () {
	                _this.context.validateState(_this.props.name);

	                (_this.props.onBlur || _noop2.default)(event);
	            });
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(Base, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var _this2 = this;

	            if (nextProps.value !== this.props.value) {
	                this.setState({
	                    value: nextProps.value,
	                    isChanged: true
	                }, function () {
	                    _this2.context.validateState(_this2.props.name);
	                });
	            }
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.context.unregister(this);
	        }
	    }]);

	    return Base;
	}(_react.Component);

	Base.propTypes = {
	    value: _react.PropTypes.string.isRequired,
	    name: _react.PropTypes.string.isRequired,
	    onChange: _react.PropTypes.func,
	    onBlur: _react.PropTypes.func
	};
	Base.contextTypes = {
	    register: _react.PropTypes.func.isRequired,
	    unregister: _react.PropTypes.func.isRequired,
	    validateState: _react.PropTypes.func.isRequired,
	    components: _react.PropTypes.objectOf(_react.PropTypes.any),
	    errors: _react.PropTypes.objectOf(_react.PropTypes.array)
	};
	exports.default = Base;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);

	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }

	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {

	                }
	            }
	        }
	    }

	    return targetComponent;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = inputFactory;

	var _react = __webpack_require__(1);

	var _hoistNonReactStatics = __webpack_require__(5);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _rules = __webpack_require__(2);

	var _rules2 = _interopRequireDefault(_rules);

	var _Base2 = __webpack_require__(3);

	var _Base3 = _interopRequireDefault(_Base2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function inputFactory(WrappedComponent) {
	    var CustomInput = function (_Base) {
	        _inherits(CustomInput, _Base);

	        function CustomInput(props, context) {
	            _classCallCheck(this, CustomInput);

	            var _this = _possibleConstructorReturn(this, (CustomInput.__proto__ || Object.getPrototypeOf(CustomInput)).call(this, props, context));

	            var isCheckbox = !!(props.type === 'checkbox' || props.type === 'radio');
	            var checkboxValue = props.checked ? props.value : '';

	            // TODO: Refactor conditions
	            _this.state = {
	                value: isCheckbox ? checkboxValue : props.value,
	                isChanged: isCheckbox ? props.checked : !!props.value,
	                isCheckbox: isCheckbox,
	                isUsed: isCheckbox,
	                isChecked: isCheckbox ? !!props.checked : true
	            };

	            context.register(_this);
	            return _this;
	        }

	        _createClass(CustomInput, [{
	            key: 'render',
	            value: function render() {
	                var _cx, _cx2;

	                var _props = this.props,
	                    validations = _props.validations,
	                    errorClassName = _props.errorClassName,
	                    containerClassName = _props.containerClassName,
	                    errorContainerClassName = _props.errorContainerClassName,
	                    className = _props.className,
	                    value = _props.value,
	                    onChange = _props.onChange,
	                    onBlur = _props.onBlur,
	                    rest = _objectWithoutProperties(_props, ['validations', 'errorClassName', 'containerClassName', 'errorContainerClassName', 'className', 'value', 'onChange', 'onBlur']);
	                // TODO: Refactor conditions


	                var isInvalid = this.state.isUsed && this.state.isChanged && !!this.context.errors[this.props.name];
	                var changedValue = this.state.isCheckbox ? this.props.value : this.state.value;
	                var error = isInvalid && this.context.errors[this.props.name][0];
	                var hint = null;

	                if (isInvalid) {
	                    hint = typeof error === 'function' ? error(changedValue, this.context.components) : _rules2.default[error].hint(changedValue, this.context.components);
	                }

	                var wrappedProps = _extends({
	                    containerClassName: (0, _classnames2.default)((_cx = {}, _defineProperty(_cx, containerClassName, !!containerClassName), _defineProperty(_cx, errorContainerClassName, !!error && errorContainerClassName), _cx)),
	                    className: (0, _classnames2.default)((_cx2 = {}, _defineProperty(_cx2, className, !!className), _defineProperty(_cx2, errorClassName, !!error && errorClassName), _cx2)),
	                    checked: this.state.isChecked,
	                    onChange: this.onChange,
	                    onBlur: this.onBlur,
	                    type: this.props.type || 'text',
	                    value: changedValue,
	                    hint: hint
	                }, rest);

	                return (0, _react.createElement)(WrappedComponent, wrappedProps);
	            }
	        }]);

	        return CustomInput;
	    }(_Base3.default);

	    CustomInput.propTypes = {
	        validations: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
	        errorClassName: _react.PropTypes.string,
	        containerClassName: _react.PropTypes.string,
	        errorContainerClassName: _react.PropTypes.string
	    };
	    CustomInput.contextTypes = {
	        register: _react.PropTypes.func.isRequired,
	        unregister: _react.PropTypes.func.isRequired,
	        validateState: _react.PropTypes.func.isRequired,
	        components: _react.PropTypes.objectOf(_react.PropTypes.any),
	        errors: _react.PropTypes.objectOf(_react.PropTypes.array)
	    };


	    CustomInput.WrappedComponent = WrappedComponent;

	    return (0, _hoistNonReactStatics2.default)(CustomInput, WrappedComponent);
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = selectFactory;

	var _react = __webpack_require__(1);

	var _hoistNonReactStatics = __webpack_require__(5);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _rules = __webpack_require__(2);

	var _rules2 = _interopRequireDefault(_rules);

	var _Base2 = __webpack_require__(3);

	var _Base3 = _interopRequireDefault(_Base2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function selectFactory(WrappedComponent) {
	    var CustomSelect = function (_Base) {
	        _inherits(CustomSelect, _Base);

	        function CustomSelect(props, context) {
	            _classCallCheck(this, CustomSelect);

	            // TODO: Refactor conditions
	            var _this = _possibleConstructorReturn(this, (CustomSelect.__proto__ || Object.getPrototypeOf(CustomSelect)).call(this, props, context));

	            _this.state = {
	                value: props.value,
	                isChanged: !!props.value,
	                isUsed: true,
	                isChecked: true
	            };

	            context.register(_this);
	            return _this;
	        }

	        _createClass(CustomSelect, [{
	            key: 'render',
	            value: function render() {
	                var _cx, _cx2;

	                var _props = this.props,
	                    validations = _props.validations,
	                    errorClassName = _props.errorClassName,
	                    containerClassName = _props.containerClassName,
	                    errorContainerClassName = _props.errorContainerClassName,
	                    className = _props.className,
	                    value = _props.value,
	                    onChange = _props.onChange,
	                    onBlur = _props.onBlur,
	                    rest = _objectWithoutProperties(_props, ['validations', 'errorClassName', 'containerClassName', 'errorContainerClassName', 'className', 'value', 'onChange', 'onBlur']);
	                // TODO: Refactor conditions


	                var isInvalid = this.state.isUsed && this.state.isChanged && !!this.context.errors[this.props.name];
	                var error = isInvalid && this.context.errors[this.props.name][0];
	                var hint = null;

	                if (isInvalid) {
	                    hint = typeof error === 'function' ? error(this.state.value, this.context.components) : _rules2.default[error].hint(this.state.value, this.context.components);
	                }

	                var wrappedProps = _extends({
	                    containerClassName: (0, _classnames2.default)((_cx = {}, _defineProperty(_cx, containerClassName, !!containerClassName), _defineProperty(_cx, errorContainerClassName, !!error && errorContainerClassName), _cx)),
	                    className: (0, _classnames2.default)((_cx2 = {}, _defineProperty(_cx2, className, !!className), _defineProperty(_cx2, errorClassName, !!error && errorClassName), _cx2)),
	                    onChange: this.onChange,
	                    onBlur: this.onBlur,
	                    value: this.state.value,
	                    hint: hint
	                }, rest);

	                return (0, _react.createElement)(WrappedComponent, wrappedProps);
	            }
	        }]);

	        return CustomSelect;
	    }(_Base3.default);

	    CustomSelect.propTypes = {
	        validations: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
	        errorClassName: _react.PropTypes.string,
	        containerClassName: _react.PropTypes.string,
	        errorContainerClassName: _react.PropTypes.string
	    };
	    CustomSelect.contextTypes = {
	        register: _react.PropTypes.func.isRequired,
	        unregister: _react.PropTypes.func.isRequired,
	        validateState: _react.PropTypes.func.isRequired,
	        components: _react.PropTypes.objectOf(_react.PropTypes.any),
	        errors: _react.PropTypes.objectOf(_react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node])))
	    };


	    return (0, _hoistNonReactStatics2.default)(CustomSelect, WrappedComponent);
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = textareaFactory;

	var _react = __webpack_require__(1);

	var _hoistNonReactStatics = __webpack_require__(5);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _rules = __webpack_require__(2);

	var _rules2 = _interopRequireDefault(_rules);

	var _Base2 = __webpack_require__(3);

	var _Base3 = _interopRequireDefault(_Base2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function textareaFactory(WrappedComponent) {
	    var CustomTextarea = function (_Base) {
	        _inherits(CustomTextarea, _Base);

	        function CustomTextarea(props, context) {
	            _classCallCheck(this, CustomTextarea);

	            var _this = _possibleConstructorReturn(this, (CustomTextarea.__proto__ || Object.getPrototypeOf(CustomTextarea)).call(this, props, context));

	            _this.state = {
	                value: props.value,
	                isChanged: !!props.value,
	                isUsed: false,
	                isChecked: true
	            };

	            context.register(_this);
	            return _this;
	        }

	        _createClass(CustomTextarea, [{
	            key: 'render',
	            value: function render() {
	                var _cx, _cx2;

	                var _props = this.props,
	                    validations = _props.validations,
	                    errorClassName = _props.errorClassName,
	                    containerClassName = _props.containerClassName,
	                    errorContainerClassName = _props.errorContainerClassName,
	                    className = _props.className,
	                    value = _props.value,
	                    onChange = _props.onChange,
	                    onBlur = _props.onBlur,
	                    rest = _objectWithoutProperties(_props, ['validations', 'errorClassName', 'containerClassName', 'errorContainerClassName', 'className', 'value', 'onChange', 'onBlur']);
	                // TODO: Refactor conditions


	                var isInvalid = this.state.isUsed && this.state.isChanged && !!this.context.errors[this.props.name];
	                var error = isInvalid && this.context.errors[this.props.name][0];
	                var hint = null;

	                if (isInvalid) {
	                    hint = typeof error === 'function' ? error(this.state.value, this.context.components) : _rules2.default[error].hint(this.state.value, this.context.components);
	                }

	                var wrappedProps = _extends({
	                    containerClassName: (0, _classnames2.default)((_cx = {}, _defineProperty(_cx, containerClassName, !!containerClassName), _defineProperty(_cx, errorContainerClassName, !!error && errorContainerClassName), _cx)),
	                    className: (0, _classnames2.default)((_cx2 = {}, _defineProperty(_cx2, className, !!className), _defineProperty(_cx2, errorClassName, !!error && errorClassName), _cx2)),
	                    onChange: this.onChange,
	                    onBlur: this.onBlur,
	                    value: this.state.value,
	                    hint: hint
	                }, rest);

	                return (0, _react.createElement)(WrappedComponent, wrappedProps);
	            }
	        }]);

	        return CustomTextarea;
	    }(_Base3.default);

	    CustomTextarea.propTypes = {
	        validations: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
	        errorClassName: _react.PropTypes.string,
	        containerClassName: _react.PropTypes.string,
	        errorContainerClassName: _react.PropTypes.string
	    };
	    CustomTextarea.contextTypes = {
	        register: _react.PropTypes.func.isRequired,
	        unregister: _react.PropTypes.func.isRequired,
	        validateState: _react.PropTypes.func.isRequired,
	        components: _react.PropTypes.objectOf(_react.PropTypes.any),
	        errors: _react.PropTypes.objectOf(_react.PropTypes.array)
	    };


	    return (0, _hoistNonReactStatics2.default)(CustomTextarea, WrappedComponent);
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Button = function (_Component) {
	    _inherits(Button, _Component);

	    function Button() {
	        _classCallCheck(this, Button);

	        return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
	    }

	    _createClass(Button, [{
	        key: 'render',
	        value: function render() {
	            var _cx;

	            var _props = this.props,
	                errorClassName = _props.errorClassName,
	                className = _props.className,
	                rest = _objectWithoutProperties(_props, ['errorClassName', 'className']);

	            var isDisabled = Object.keys(this.context.errors).length;

	            return _react2.default.createElement(
	                'button',
	                _extends({
	                    className: (0, _classnames2.default)((_cx = {}, _defineProperty(_cx, className, !!className), _defineProperty(_cx, errorClassName, isDisabled && errorClassName), _cx)),
	                    disabled: isDisabled
	                }, rest),
	                this.props.children
	            );
	        }
	    }]);

	    return Button;
	}(_react.Component);

	Button.propTypes = {
	    children: _react.PropTypes.node,
	    errorClassName: _react.PropTypes.string,
	    className: _react.PropTypes.string
	};
	Button.contextTypes = {
	    errors: _react.PropTypes.objectOf(_react.PropTypes.array)
	};
	exports.default = Button;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Base = __webpack_require__(3);

	var _Base2 = _interopRequireDefault(_Base);

	var _rules = __webpack_require__(2);

	var _rules2 = _interopRequireDefault(_rules);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Form = function (_Component) {
	    _inherits(Form, _Component);

	    function Form(props) {
	        _classCallCheck(this, Form);

	        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

	        _this.getErrors = function () {
	            return Object.keys(_this.components).reduce(function (prev, name) {
	                var component = _this.components[name];
	                var validations = component.props.validations;
	                var length = validations.length;

	                for (var i = 0; i < length; i += 1) {
	                    if (!_rules2.default[validations[i]].rule(component.state.value, _this.components)) {
	                        /* eslint-disable */
	                        prev[name] = prev[name] || [];
	                        prev[name].push(validations[i]);
	                        /* eslint-enable */
	                    }
	                }

	                return prev;
	            }, {});
	        };

	        _this.register = function (component) {
	            _this.components[component.props.name] = component;
	        };

	        _this.unregister = function (component) {
	            var errors = _extends({}, _this.state.errors);

	            delete _this.components[component.props.name];
	            delete errors[component.props.name];

	            _this.setState({ errors: errors });
	        };

	        _this.validateState = function () {
	            var errors = _this.getErrors();

	            _this.setState({ errors: errors });
	        };

	        _this.validate = function (name) {
	            _this.components[name].setState({
	                isUsed: true,
	                isChanged: true
	            }, _this.validateState);
	        };

	        _this.showError = function (name, error) {
	            _this.components[name].setState({
	                isUsed: true,
	                isChanged: true
	            }, function () {
	                _this.setState({
	                    errors: _extends({}, _this.state.errors, _defineProperty({}, name, [error]))
	                });
	            });
	        };

	        _this.hideError = function (name) {
	            var errors = _extends({}, _this.state.errors);

	            delete errors[name];

	            _this.setState({ errors: errors });
	        };

	        _this.components = {};

	        _this.state = {
	            errors: {}
	        };
	        return _this;
	    }

	    _createClass(Form, [{
	        key: 'getChildContext',
	        value: function getChildContext() {
	            return {
	                register: this.register,
	                unregister: this.unregister,
	                validateState: this.validateState,
	                components: this.components,
	                errors: this.state.errors
	            };
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.validateState();
	        }
	    }, {
	        key: 'validateAll',
	        value: function validateAll() {
	            var _this2 = this;

	            Object.keys(this.components).forEach(function (name) {
	                _this2.components[name].setState({
	                    isUsed: true,
	                    isChanged: true
	                });
	            });

	            return this.getErrors();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'form',
	                this.props,
	                this.props.children
	            );
	        }
	    }]);

	    return Form;
	}(_react.Component);

	Form.propTypes = {
	    children: _react.PropTypes.node
	};
	Form.childContextTypes = {
	    register: _react.PropTypes.func.isRequired,
	    unregister: _react.PropTypes.func.isRequired,
	    validateState: _react.PropTypes.func.isRequired,
	    components: _react.PropTypes.objectOf(_react.PropTypes.instanceOf(_Base2.default)),
	    errors: _react.PropTypes.objectOf(_react.PropTypes.array)
	};
	exports.default = Form;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _inputFactory = __webpack_require__(6);

	var _inputFactory2 = _interopRequireDefault(_inputFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Input = function (_Component) {
	    _inherits(Input, _Component);

	    function Input() {
	        _classCallCheck(this, Input);

	        return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
	    }

	    _createClass(Input, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                containerClassName = _props.containerClassName,
	                hint = _props.hint,
	                rest = _objectWithoutProperties(_props, ['containerClassName', 'hint']);

	            return _react2.default.createElement(
	                'div',
	                { className: containerClassName },
	                _react2.default.createElement('input', _extends({}, rest, {
	                    className: this.props.className,
	                    onChange: this.props.onChange,
	                    onBlur: this.props.onBlur,
	                    value: this.props.value
	                })),
	                hint
	            );
	        }
	    }]);

	    return Input;
	}(_react.Component);

	exports.default = (0, _inputFactory2.default)(Input);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _selectFactory = __webpack_require__(7);

	var _selectFactory2 = _interopRequireDefault(_selectFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Select = function (_Component) {
	    _inherits(Select, _Component);

	    function Select() {
	        _classCallCheck(this, Select);

	        return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
	    }

	    _createClass(Select, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                containerClassName = _props.containerClassName,
	                hint = _props.hint,
	                rest = _objectWithoutProperties(_props, ['containerClassName', 'hint']);

	            return _react2.default.createElement(
	                'div',
	                { className: containerClassName },
	                _react2.default.createElement(
	                    'select',
	                    _extends({}, rest, {
	                        className: this.props.className,
	                        onChange: this.props.onChange,
	                        onBlur: this.props.onBlur,
	                        value: this.props.value
	                    }),
	                    this.props.children
	                ),
	                hint
	            );
	        }
	    }]);

	    return Select;
	}(_react.Component);

	exports.default = (0, _selectFactory2.default)(Select);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _textareaFactory = __webpack_require__(8);

	var _textareaFactory2 = _interopRequireDefault(_textareaFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Textarea = function (_Component) {
	    _inherits(Textarea, _Component);

	    function Textarea() {
	        _classCallCheck(this, Textarea);

	        return _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).apply(this, arguments));
	    }

	    _createClass(Textarea, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                containerClassName = _props.containerClassName,
	                hint = _props.hint,
	                rest = _objectWithoutProperties(_props, ['containerClassName', 'hint']);

	            return _react2.default.createElement(
	                'div',
	                { className: containerClassName },
	                _react2.default.createElement('textarea', _extends({}, rest, {
	                    className: this.props.className,
	                    onChange: this.props.onChange,
	                    onBlur: this.props.onBlur,
	                    value: this.props.value
	                })),
	                hint
	            );
	        }
	    }]);

	    return Textarea;
	}(_react.Component);

	exports.default = (0, _textareaFactory2.default)(Textarea);

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return '';
	};

/***/ }
/******/ ])
});
;