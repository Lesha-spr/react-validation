(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "classnames"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("classnames")) : factory(root["react"], root["classnames"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _rules = __webpack_require__(3);

	Object.defineProperty(exports, 'rules', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_rules).default;
	  }
	});

	var _Form = __webpack_require__(10);

	Object.defineProperty(exports, 'Form', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Form).default;
	  }
	});

	var _Input = __webpack_require__(7);

	Object.defineProperty(exports, 'Input', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Input).default;
	  }
	});

	var _Select = __webpack_require__(8);

	Object.defineProperty(exports, 'Select', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Select).default;
	  }
	});

	var _Textarea = __webpack_require__(9);

	Object.defineProperty(exports, 'Textarea', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Textarea).default;
	  }
	});

	var _Button = __webpack_require__(6);

	Object.defineProperty(exports, 'Button', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Button).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (false) {
	  var ReactIs = require('react-is');

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = require('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(12)();
	}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _noop = __webpack_require__(11);

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
	    value: _propTypes2.default.string.isRequired,
	    name: _propTypes2.default.string.isRequired,
	    onChange: _propTypes2.default.func,
	    onBlur: _propTypes2.default.func
	};
	Base.contextTypes = {
	    register: _propTypes2.default.func.isRequired,
	    unregister: _propTypes2.default.func.isRequired,
	    validateState: _propTypes2.default.func.isRequired,
	    components: _propTypes2.default.objectOf(_propTypes2.default.any),
	    errors: _propTypes2.default.objectOf(_propTypes2.default.array)
	};
	exports.default = Base;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

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
	    children: _propTypes2.default.node,
	    errorClassName: _propTypes2.default.string,
	    className: _propTypes2.default.string
	};
	Button.contextTypes = {
	    errors: _propTypes2.default.objectOf(_propTypes2.default.array)
	};
	exports.default = Button;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _rules = __webpack_require__(3);

	var _rules2 = _interopRequireDefault(_rules);

	var _Base2 = __webpack_require__(5);

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

	            var _props = this.props,
	                validations = _props.validations,
	                errorClassName = _props.errorClassName,
	                containerClassName = _props.containerClassName,
	                errorContainerClassName = _props.errorContainerClassName,
	                className = _props.className,
	                rest = _objectWithoutProperties(_props, ['validations', 'errorClassName', 'containerClassName', 'errorContainerClassName', 'className']);
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
	    validations: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
	    errorClassName: _propTypes2.default.string,
	    containerClassName: _propTypes2.default.string,
	    errorContainerClassName: _propTypes2.default.string
	};
	Input.contextTypes = {
	    register: _propTypes2.default.func.isRequired,
	    unregister: _propTypes2.default.func.isRequired,
	    validateState: _propTypes2.default.func.isRequired,
	    components: _propTypes2.default.objectOf(_propTypes2.default.any),
	    errors: _propTypes2.default.objectOf(_propTypes2.default.array)
	};
	exports.default = Input;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _rules = __webpack_require__(3);

	var _rules2 = _interopRequireDefault(_rules);

	var _Base2 = __webpack_require__(5);

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

	            var _props = this.props,
	                validations = _props.validations,
	                errorClassName = _props.errorClassName,
	                containerClassName = _props.containerClassName,
	                errorContainerClassName = _props.errorContainerClassName,
	                className = _props.className,
	                rest = _objectWithoutProperties(_props, ['validations', 'errorClassName', 'containerClassName', 'errorContainerClassName', 'className']);
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
	    validations: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
	    errorClassName: _propTypes2.default.string,
	    containerClassName: _propTypes2.default.string,
	    errorContainerClassName: _propTypes2.default.string
	};
	Select.contextTypes = {
	    register: _propTypes2.default.func.isRequired,
	    unregister: _propTypes2.default.func.isRequired,
	    validateState: _propTypes2.default.func.isRequired,
	    components: _propTypes2.default.objectOf(_propTypes2.default.any),
	    errors: _propTypes2.default.objectOf(_propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node])))
	};
	exports.default = Select;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _rules = __webpack_require__(3);

	var _rules2 = _interopRequireDefault(_rules);

	var _Base2 = __webpack_require__(5);

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

	            var _props = this.props,
	                validations = _props.validations,
	                errorClassName = _props.errorClassName,
	                containerClassName = _props.containerClassName,
	                errorContainerClassName = _props.errorContainerClassName,
	                className = _props.className,
	                rest = _objectWithoutProperties(_props, ['validations', 'errorClassName', 'containerClassName', 'errorContainerClassName', 'className']);
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
	    validations: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
	    errorClassName: _propTypes2.default.string,
	    containerClassName: _propTypes2.default.string,
	    errorContainerClassName: _propTypes2.default.string
	};
	Textarea.contextTypes = {
	    register: _propTypes2.default.func.isRequired,
	    unregister: _propTypes2.default.func.isRequired,
	    validateState: _propTypes2.default.func.isRequired,
	    components: _propTypes2.default.objectOf(_propTypes2.default.any),
	    errors: _propTypes2.default.objectOf(_propTypes2.default.array)
	};
	exports.default = Textarea;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Button = __webpack_require__(6);

	var _Button2 = _interopRequireDefault(_Button);

	var _Input = __webpack_require__(7);

	var _Input2 = _interopRequireDefault(_Input);

	var _Select = __webpack_require__(8);

	var _Select2 = _interopRequireDefault(_Select);

	var _Textarea = __webpack_require__(9);

	var _Textarea2 = _interopRequireDefault(_Textarea);

	var _rules = __webpack_require__(3);

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
	    children: _propTypes2.default.node
	};
	Form.childContextTypes = {
	    register: _propTypes2.default.func.isRequired,
	    unregister: _propTypes2.default.func.isRequired,
	    validateState: _propTypes2.default.func.isRequired,
	    components: _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.instanceOf(_Button2.default), _propTypes2.default.instanceOf(_Input2.default), _propTypes2.default.instanceOf(_Select2.default), _propTypes2.default.instanceOf(_Textarea2.default)])),
	    errors: _propTypes2.default.objectOf(_propTypes2.default.array)
	};
	exports.default = Form;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return '';
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = __webpack_require__(13);

	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bigint: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,

	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };

	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ })
/******/ ])
});
;