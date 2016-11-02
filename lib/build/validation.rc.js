(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "classnames"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("classnames")) : factory(root["react"], root["classnames"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__) {
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

	Object.defineProperty(exports, 'rules', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_rules).default;
	  }
	});

	var _Form = __webpack_require__(9);

	Object.defineProperty(exports, 'Form', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Form).default;
	  }
	});

	var _Input = __webpack_require__(6);

	Object.defineProperty(exports, 'Input', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Input).default;
	  }
	});

	var _Select = __webpack_require__(7);

	Object.defineProperty(exports, 'Select', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Select).default;
	  }
	});

	var _Textarea = __webpack_require__(8);

	Object.defineProperty(exports, 'Textarea', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Textarea).default;
	  }
	});

	var _Button = __webpack_require__(5);

	Object.defineProperty(exports, 'Button', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Button).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _noop = __webpack_require__(10);

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(3);

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

	            var _props = this.props;
	            var errorClassName = _props.errorClassName;
	            var className = _props.className;

	            var rest = _objectWithoutProperties(_props, ['errorClassName', 'className']);

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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _rules = __webpack_require__(2);

	var _rules2 = _interopRequireDefault(_rules);

	var _Base2 = __webpack_require__(4);

	var _Base3 = _interopRequireDefault(_Base2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Input = function (_Base) {
	    _inherits(Input, _Base);

	    function Input(props, context) {
	        _classCallCheck(this, Input);

	        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props, context));

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

	    _createClass(Input, [{
	        key: 'render',
	        value: function render() {
	            var _cx, _cx2;

	            var _props = this.props;
	            var validations = _props.validations;
	            var errorClassName = _props.errorClassName;
	            var containerClassName = _props.containerClassName;
	            var errorContainerClassName = _props.errorContainerClassName;
	            var className = _props.className;

	            var rest = _objectWithoutProperties(_props, ['validations', 'errorClassName', 'containerClassName', 'errorContainerClassName', 'className']);
	            // TODO: Refactor conditions


	            var isInvalid = this.state.isUsed && this.state.isChanged && !!this.context.errors[this.props.name];
	            var value = this.state.isCheckbox ? this.props.value : this.state.value;
	            var error = isInvalid && this.context.errors[this.props.name][0];
	            var hint = null;

	            if (isInvalid) {
	                hint = typeof error === 'function' ? error(value, this.context.components) : _rules2.default[error].hint(value, this.context.components);
	            }

	            return _react2.default.createElement(
	                'div',
	                {
	                    className: (0, _classnames2.default)((_cx = {}, _defineProperty(_cx, containerClassName, !!containerClassName), _defineProperty(_cx, errorContainerClassName, !!error && errorContainerClassName), _cx))
	                },
	                _react2.default.createElement('input', _extends({}, rest, {
	                    className: (0, _classnames2.default)((_cx2 = {}, _defineProperty(_cx2, className, !!className), _defineProperty(_cx2, errorClassName, !!error && errorClassName), _cx2)),
	                    checked: this.state.isChecked,
	                    onChange: this.onChange,
	                    onBlur: this.onBlur, value: value
	                })),
	                hint
	            );
	        }
	    }]);

	    return Input;
	}(_Base3.default);

	Input.propTypes = {
	    validations: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
	    errorClassName: _react.PropTypes.string,
	    containerClassName: _react.PropTypes.string,
	    errorContainerClassName: _react.PropTypes.string
	};
	Input.contextTypes = {
	    register: _react.PropTypes.func.isRequired,
	    unregister: _react.PropTypes.func.isRequired,
	    validateState: _react.PropTypes.func.isRequired,
	    components: _react.PropTypes.objectOf(_react.PropTypes.any),
	    errors: _react.PropTypes.objectOf(_react.PropTypes.array)
	};
	exports.default = Input;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _rules = __webpack_require__(2);

	var _rules2 = _interopRequireDefault(_rules);

	var _Base2 = __webpack_require__(4);

	var _Base3 = _interopRequireDefault(_Base2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Select = function (_Base) {
	    _inherits(Select, _Base);

	    function Select(props, context) {
	        _classCallCheck(this, Select);

	        // TODO: Refactor conditions
	        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props, context));

	        _this.state = {
	            value: props.value,
	            isChanged: !!props.value,
	            isUsed: true,
	            isChecked: true
	        };

	        context.register(_this);
	        return _this;
	    }

	    _createClass(Select, [{
	        key: 'render',
	        value: function render() {
	            var _cx, _cx2;

	            var _props = this.props;
	            var validations = _props.validations;
	            var errorClassName = _props.errorClassName;
	            var containerClassName = _props.containerClassName;
	            var errorContainerClassName = _props.errorContainerClassName;
	            var className = _props.className;

	            var rest = _objectWithoutProperties(_props, ['validations', 'errorClassName', 'containerClassName', 'errorContainerClassName', 'className']);
	            // TODO: Refactor conditions


	            var isInvalid = this.state.isUsed && this.state.isChanged && !!this.context.errors[this.props.name];
	            var error = isInvalid && this.context.errors[this.props.name][0];
	            var hint = null;

	            if (isInvalid) {
	                hint = typeof error === 'function' ? error(this.state.value, this.context.components) : _rules2.default[error].hint(this.state.value, this.context.components);
	            }

	            return _react2.default.createElement(
	                'div',
	                {
	                    className: (0, _classnames2.default)((_cx = {}, _defineProperty(_cx, containerClassName, !!containerClassName), _defineProperty(_cx, errorContainerClassName, !!error && errorContainerClassName), _cx))
	                },
	                _react2.default.createElement(
	                    'select',
	                    _extends({}, rest, {
	                        className: (0, _classnames2.default)((_cx2 = {}, _defineProperty(_cx2, className, !!className), _defineProperty(_cx2, errorClassName, !!error && errorClassName), _cx2)),
	                        value: this.state.value,
	                        onChange: this.onChange,
	                        onBlur: this.onBlur
	                    }),
	                    this.props.children
	                ),
	                hint
	            );
	        }
	    }]);

	    return Select;
	}(_Base3.default);

	Select.propTypes = {
	    validations: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
	    errorClassName: _react.PropTypes.string,
	    containerClassName: _react.PropTypes.string,
	    errorContainerClassName: _react.PropTypes.string
	};
	Select.contextTypes = {
	    register: _react.PropTypes.func.isRequired,
	    unregister: _react.PropTypes.func.isRequired,
	    validateState: _react.PropTypes.func.isRequired,
	    components: _react.PropTypes.objectOf(_react.PropTypes.any),
	    errors: _react.PropTypes.objectOf(_react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node])))
	};
	exports.default = Select;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _rules = __webpack_require__(2);

	var _rules2 = _interopRequireDefault(_rules);

	var _Base2 = __webpack_require__(4);

	var _Base3 = _interopRequireDefault(_Base2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Textarea = function (_Base) {
	    _inherits(Textarea, _Base);

	    function Textarea(props, context) {
	        _classCallCheck(this, Textarea);

	        var _this = _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).call(this, props, context));

	        _this.state = {
	            value: props.value,
	            isChanged: !!props.value,
	            isUsed: false,
	            isChecked: true
	        };

	        context.register(_this);
	        return _this;
	    }

	    _createClass(Textarea, [{
	        key: 'render',
	        value: function render() {
	            var _cx, _cx2;

	            var _props = this.props;
	            var validations = _props.validations;
	            var errorClassName = _props.errorClassName;
	            var containerClassName = _props.containerClassName;
	            var errorContainerClassName = _props.errorContainerClassName;
	            var className = _props.className;

	            var rest = _objectWithoutProperties(_props, ['validations', 'errorClassName', 'containerClassName', 'errorContainerClassName', 'className']);
	            // TODO: Refactor conditions


	            var isInvalid = this.state.isUsed && this.state.isChanged && !!this.context.errors[this.props.name];
	            var error = isInvalid && this.context.errors[this.props.name][0];
	            var hint = null;

	            if (isInvalid) {
	                hint = typeof error === 'function' ? error(this.state.value, this.context.components) : _rules2.default[error].hint(this.state.value, this.context.components);
	            }

	            return _react2.default.createElement(
	                'div',
	                {
	                    className: (0, _classnames2.default)((_cx = {}, _defineProperty(_cx, containerClassName, !!containerClassName), _defineProperty(_cx, errorContainerClassName, !!error && errorContainerClassName), _cx))
	                },
	                _react2.default.createElement('textarea', _extends({}, rest, {
	                    className: (0, _classnames2.default)((_cx2 = {}, _defineProperty(_cx2, className, !!className), _defineProperty(_cx2, errorClassName, !!error && errorClassName), _cx2)),
	                    onChange: this.onChange,
	                    onBlur: this.onBlur,
	                    value: this.state.value
	                })),
	                hint
	            );
	        }
	    }]);

	    return Textarea;
	}(_Base3.default);

	Textarea.propTypes = {
	    validations: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
	    errorClassName: _react.PropTypes.string,
	    containerClassName: _react.PropTypes.string,
	    errorContainerClassName: _react.PropTypes.string
	};
	Textarea.contextTypes = {
	    register: _react.PropTypes.func.isRequired,
	    unregister: _react.PropTypes.func.isRequired,
	    validateState: _react.PropTypes.func.isRequired,
	    components: _react.PropTypes.objectOf(_react.PropTypes.any),
	    errors: _react.PropTypes.objectOf(_react.PropTypes.array)
	};
	exports.default = Textarea;

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

	var _Button = __webpack_require__(5);

	var _Button2 = _interopRequireDefault(_Button);

	var _Input = __webpack_require__(6);

	var _Input2 = _interopRequireDefault(_Input);

	var _Select = __webpack_require__(7);

	var _Select2 = _interopRequireDefault(_Select);

	var _Textarea = __webpack_require__(8);

	var _Textarea2 = _interopRequireDefault(_Textarea);

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
	    components: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.instanceOf(_Button2.default), _react.PropTypes.instanceOf(_Input2.default), _react.PropTypes.instanceOf(_Select2.default), _react.PropTypes.instanceOf(_Textarea2.default)])),
	    errors: _react.PropTypes.objectOf(_react.PropTypes.array)
	};
	exports.default = Form;

/***/ },
/* 10 */
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