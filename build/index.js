(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _assign = __webpack_require__(36);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(42);
	var validator = __webpack_require__(43);
	var errors = __webpack_require__(44);

	/**
	 * Validation component namespace
	 * @type {Object}
	 */
	var Validation = {
	    Form: __webpack_require__(45),
	    Input: __webpack_require__(49),
	    Select: __webpack_require__(53),
	    Button: __webpack_require__(54),

	    /**
	     * Public method to extend default error object
	     * @param obj {Object}
	     */
	    extendErrors: function extendErrors(obj) {
	        (0, _assign2.default)(errors, obj);

	        (0, _keys2.default)(errors).forEach(function (key) {
	            if (errors[key].rule) {
	                validator[key] = validator[key] || errors[key].rule;
	            }
	        });
	    }
	};

	module.exports = Validation;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(23).Object.keys;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(4)
	  , $keys    = __webpack_require__(6);

	__webpack_require__(21)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(5);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(7)
	  , enumBugKeys = __webpack_require__(20);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(8)
	  , toIObject    = __webpack_require__(9)
	  , arrayIndexOf = __webpack_require__(12)(false)
	  , IE_PROTO     = __webpack_require__(16)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(10)
	  , defined = __webpack_require__(5);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(11);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(9)
	  , toLength  = __webpack_require__(13)
	  , toIndex   = __webpack_require__(15);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(14)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(14)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(17)('keys')
	  , uid    = __webpack_require__(19);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(18)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 19 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(22)
	  , core    = __webpack_require__(23)
	  , fails   = __webpack_require__(32);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(18)
	  , core      = __webpack_require__(23)
	  , ctx       = __webpack_require__(24)
	  , hide      = __webpack_require__(26)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 23 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.2.2'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(25);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(27)
	  , createDesc = __webpack_require__(35);
	module.exports = __webpack_require__(31) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(28)
	  , IE8_DOM_DEFINE = __webpack_require__(30)
	  , toPrimitive    = __webpack_require__(34)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(31) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(29);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(31) && !__webpack_require__(32)(function(){
	  return Object.defineProperty(__webpack_require__(33)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(32)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(29)
	  , document = __webpack_require__(18).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(29);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(37), __esModule: true };

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);
	module.exports = __webpack_require__(23).Object.assign;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(22);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(39)});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(6)
	  , gOPS     = __webpack_require__(40)
	  , pIE      = __webpack_require__(41)
	  , toObject = __webpack_require__(4)
	  , IObject  = __webpack_require__(10)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(32)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 40 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 41 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = require("validator");

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    defaultMessage: 'validation error',
	    defaultInvalidClassName: 'ui-input_state_invalid',
	    defaultDisabledClassName: 'ui-button_state_disabled',
	    defaultHintClassName: 'ui-hint',
	    defaultContainerClassName: ''
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _assign = __webpack_require__(36);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(42);
	var validator = __webpack_require__(43);
	var classNames = __webpack_require__(46);
	var isObject = __webpack_require__(47);
	var noop = __webpack_require__(48);
	var errors = __webpack_require__(44);

	/**
	 * Describe Form component
	 * It is using heavy recursiveCloneChildren method
	 * It may be refactored by using refs instead and set props more natively
	 */
	module.exports = React.createClass({
	    displayName: 'exports',

	    componentWillMount: function componentWillMount() {
	        this._inputs = {};
	        this._validations = {};
	        this._blockers = {};
	        this._submitButtons = {};
	        this._blockingButtons = {};
	    },

	    componentDidMount: function componentDidMount() {
	        this._toggleButtons(this._submitButtons, this._validations);
	        this._toggleButtons(this._blockingButtons, this._blockers);
	    },

	    _getValidationValue: function _getValidationValue(component, callback) {
	        var isCheckbox = component.props.type === 'checkbox';
	        var value = component.props.value ? validator.trim(component.props.value.toString()) : '';

	        if (isCheckbox && !component.props.checked) {
	            value = '';
	        }

	        return callback.call(this, value);
	    },

	    /**
	     * Method to validate component value
	     * @param component {Object} React component
	     * @param dontValidateBoundedInput {Boolean}
	     * @param forceValidate {Boolean}
	     * @private
	     */
	    _validate: function _validate(component, dontValidateBoundedInput, forceValidate) {
	        // TODO: refactor whole method
	        var validations = component.props.validations;
	        var state = {
	            isValid: true,
	            shouldUpdate: component.state.isUsed && component.state.isChanged || forceValidate
	        };
	        var className = {};
	        var boundInput = null;

	        className[component.props.className] = true;

	        for (var i = 0; i < validations.length; i++) {
	            var validation = validations[i];
	            var boundValue;

	            boundInput = this._inputs[validation.name];

	            if (boundInput) {
	                boundValue = boundInput.state.value;
	            }

	            try {
	                if (boundInput && !dontValidateBoundedInput) {
	                    this._validate(boundInput, true);
	                }

	                if (boundInput) {
	                    if (state.shouldUpdate) {
	                        if (!this._validateState(component, validation, boundValue, state, className)) {
	                            break;
	                        }
	                    }
	                } else {
	                    if (!this._validateState(component, validation, boundValue, state, className)) {
	                        break;
	                    }
	                }
	            } catch (error) {
	                console.warn(error);
	                console.warn('You probably didn\'t specified (extend) Validation for ' + validation.rule + ' rule.' + 'See Validation.extendErrors public method.');
	            }
	        }

	        className = classNames(className);

	        if (state.shouldUpdate) {
	            (0, _assign2.default)(state, {
	                className: className
	            });
	        }

	        component.setState(state);

	        this._validations[component.props.name] = state.isValid;
	        this._toggleButtons(this._submitButtons, this._validations);
	    },

	    _validateState: function _validateState(component, validation, boundValue, state, className) {
	        state.isValid = validator[validation.rule](component.state.value.toString(), boundValue);
	        state.errorMessage = state.shouldUpdate && !state.isValid ? this._getErrorMessage(validation) : null;

	        if (!state.isValid) {
	            (0, _assign2.default)(className, this._getErrorClassName(component, validation));
	            (component.props.onError || noop)(validation);
	        }

	        return state.isValid;
	    },

	    _getErrorMessage: function _getErrorMessage(validation) {
	        var hasRule = errors[validation.rule];

	        return validation.errorMessage || (hasRule ? errors[validation.rule].message : errors.defaultMessage);
	    },

	    _getErrorClassName: function _getErrorClassName(component, validation) {
	        var errorClassName = {};
	        var hasErrorClassName = errors[validation.rule] && errors[validation.rule].className;

	        errorClassName[component.props.invalidClassName || errors.defaultInvalidClassName] = true;
	        errorClassName[hasErrorClassName ? errors[validation.rule].className : errors.defaultInvalidClassName] = true;

	        return errorClassName;
	    },

	    /**
	     * Method to lock/unlock buttons
	     * @param buttons {Array} Array of refs to React components
	     * @param model {Object} Model to find blockers
	     * @private
	     */
	    _toggleButtons: function _toggleButtons(buttons, model) {
	        var hasBlocking = this._hasFalsyFlag(model);

	        this._setButtonsState(buttons, hasBlocking);
	    },

	    /**
	     * Public method to check form on validity
	     * @return {Boolean}
	     */
	    isValidForm: function isValidForm() {
	        return !this._hasFalsyFlag(this._validations);
	    },

	    /**
	     * Method to validate data model
	     * @param model {Object} Model to validate
	     * @return {Boolean}
	     * @private
	     */
	    _hasFalsyFlag: function _hasFalsyFlag(model) {
	        var hasFalsyFlag = false;

	        for (var key in model) {
	            if (model.hasOwnProperty(key) && !model[key]) {
	                hasFalsyFlag = true;

	                break;
	            }
	        }

	        return hasFalsyFlag;
	    },

	    /**
	     * Method to validate blocking inputs
	     * @param component {Object} React component
	     * @private
	     */
	    _blocking: function _blocking(component) {
	        var _this = this;
	        var buttons = _this._blockingButtons;
	        var hasBlocking;

	        _this._blockers[component.props.name] = Boolean(validator.trim(component.state.value));

	        hasBlocking = _this._hasFalsyFlag(_this._blockers);

	        this._setButtonsState(buttons, hasBlocking);
	    },

	    /**
	     * Method to set buttons state
	     * @param buttons {Array} Array of refs on button React components
	     * @param hasBlocking {Boolean} button has at least one blocker
	     * @private
	     */
	    _setButtonsState: function _setButtonsState(buttons, hasBlocking) {
	        (0, _keys2.default)(buttons).forEach(function (id) {
	            buttons[id].setState({
	                isDisabled: hasBlocking
	            });
	        });
	    },

	    /**
	     * Method to check props and add additional validation methods
	     * Should be refactored or being rewrite
	     * @param children {Object|String|Number} Child elements of root React component
	     * @param index {Number} abstract number to add ref
	     * @return {Object|String|Number}
	     * @private
	     */
	    _recursiveCloneChildren: function _recursiveCloneChildren(children, index) {
	        return React.Children.map(children, function (child, i) {
	            var $idx = ++index || i;

	            if (!isObject(child)) {
	                return child;
	            }

	            var childProps = {};
	            var isValidElement = React.isValidElement(child);
	            var shouldValidate = Array.isArray(child.props.validations) && child.props.validations.length;

	            if (shouldValidate) {
	                childProps._registerControl = this._registerControl;
	                childProps._unregisterControl = this._unregisterControl;
	                childProps._validate = this._validate;
	            }

	            if (isValidElement) {
	                if (child.props.type === 'submit') {
	                    childProps._id = child.props.type + $idx;
	                    $idx++;
	                    childProps._registerSubmit = this._registerSubmit;
	                    childProps._unregisterSubmit = this._unregisterSubmit;
	                }

	                if (child.props.blocking === 'input') {
	                    childProps._registerControl = this._registerControl;
	                    childProps._blocking = this._blocking;
	                }

	                if (child.props.blocking === 'button') {
	                    childProps._id = child.props.blocking + $idx;
	                    $idx++;
	                    childProps._registerBlocking = this._registerBlocking;
	                }
	            }

	            childProps.children = this._recursiveCloneChildren(child.props.children, $idx);

	            return React.cloneElement(child, childProps);
	        }, this);
	    },

	    _registerSubmit: function _registerSubmit(component) {
	        this._submitButtons[component.props._id] = component;
	    },

	    _unregisterSubmit: function _unregisterSubmit(component) {
	        delete this._submitButtons[component.props._id];
	    },

	    _registerBlocking: function _registerBlocking(component) {
	        this._blockingButtons[component.props._id] = component;
	    },

	    _unregisterBlocking: function _unregisterBlocking(component) {
	        delete this._blockingButtons[component.props._id];
	    },

	    _registerControl: function _registerControl(component) {
	        this._getValidationValue(component, function (value) {
	            if (component.props._blocking) {
	                this._blockers[component.props.name] = Boolean(value);
	            }

	            if (component.props._validate) {
	                this._inputs[component.props.name] = component;
	                this._validations[component.props.name] = Boolean(value);
	            }
	        });
	    },

	    _unregisterControl: function _unregisterControl(component) {
	        delete this._blockers[component.props.name];
	        delete this._validations[component.props.name];
	    },

	    forceValidate: function forceValidate(showErrors) {
	        var _this = this;

	        (0, _keys2.default)(this._inputs).forEach(function (name) {
	            _this._inputs[name].props._validate(_this._inputs[name], false, showErrors);
	        });

	        return (0, _assign2.default)({}, _this._validations);
	    },

	    render: function render() {
	        return React.createElement(
	            'form',
	            this.props,
	            this._recursiveCloneChildren(this.props.children, 0)
	        );
	    }
	});

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = require("lodash.isobject");

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = require("lodash.noop");

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends2 = __webpack_require__(50);

	var _extends3 = _interopRequireDefault(_extends2);

	var _assign = __webpack_require__(36);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(42);
	var noop = __webpack_require__(48);
	var getElement = __webpack_require__(51);
	var shared = __webpack_require__(52);
	var errors = __webpack_require__(44);

	/**
	 * Describe Input component
	 * It is a common component and contains inputs, checkboxes and radios
	 */
	module.exports = React.createClass({
	    displayName: 'exports',

	    mixins: [shared, getElement],

	    propTypes: {
	        name: React.PropTypes.string.isRequired,
	        type: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            type: 'text'
	        };
	    },

	    // TODO: refactor this method
	    getInitialState: function getInitialState() {
	        var value = this.props.value || '';
	        this.isCheckbox = this.props.type === 'checkbox';

	        if (this.isCheckbox && !this.props.checked) {
	            value = '';
	        }

	        return {
	            value: value,
	            className: this.props.className || '',
	            checked: this.props.checked || false,
	            isValid: true,
	            isUsed: this.isCheckbox,
	            isChanged: this.isCheckbox,
	            errorMessage: null
	        };
	    },

	    /**
	     * Public value setter
	     * @param value {String|Number} value to be setted
	     * @param event {Event|Boolean} event object or flag to prevent errors to show
	     */
	    setValue: function setValue(value, event) {
	        var isEventPassed = event && event.nativeEvent instanceof Event;
	        var isChanged;

	        if (this.isCheckbox) {
	            value = !this.state.checked ? this.props.value : '';
	        }

	        if (isEventPassed) {
	            // Persist the event since we will need this event outside this event loop.
	            event.persist();
	        }

	        isChanged = value !== this.state.value || value && value !== this.state.lastValue;

	        this.setState({
	            isChanged: isChanged,
	            isUsed: this.state.isUsed || !event,
	            value: value,
	            checked: this.isCheckbox ? !this.state.checked : isEventPassed || !event
	        }, function () {
	            (this.props._blocking || noop)(this);
	            (this.props._validate || noop)(this);
	            (this.props.onChange || noop)(isEventPassed ? event : undefined);
	        });
	    },

	    /**
	     * Blur handler
	     * @param event {Event} event object
	     * @private
	     */
	    _handleBlur: function _handleBlur(event) {
	        this.setState({
	            isUsed: true,
	            lastValue: event.currentTarget.value
	        }, function () {
	            (this.props._validate || noop)(this);
	            (this.props.onBlur || noop)(event);
	        });
	    },

	    render: function render() {
	        var input;
	        var props;
	        var hint = this.state.errorMessage ? React.createElement(
	            'span',
	            { className: errors.defaultHintClassName },
	            this.state.errorMessage
	        ) : null;

	        if (this.props.wrapper) {
	            try {
	                props = (0, _assign2.default)({}, this.props.wrapper.props, this.props);

	                input = React.createElement(this.props.wrapper.component, (0, _extends3.default)({ ref: 'element' }, props, { className: this.state.className, checked: this.state.checked, onChange: this._handleChange, onBlur: this._handleBlur }));
	            } catch (e) {
	                console.log(e);
	            }
	        } else {
	            input = React.createElement('input', (0, _extends3.default)({ ref: 'element' }, this.props, { className: this.state.className, checked: this.state.checked, value: this.state.value, onChange: this._handleChange, onBlur: this._handleBlur }));
	        }
	        // TODO: rework hint appearance

	        return React.createElement(
	            'div',
	            { className: this.props.containerClassName || errors.defaultContainerClassName },
	            input,
	            hint
	        );
	    }
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(36);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    getElement: function getElement() {
	        return this.refs.element;
	    }
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var errors = __webpack_require__(44);
	var noop = __webpack_require__(48);
	var classNames = __webpack_require__(46);

	module.exports = {
	    componentWillMount: function componentWillMount() {
	        (this.props._registerControl || noop)(this);
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        (this.props._unregisterControl || noop)(this);
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        if (typeof nextProps.value !== 'undefined') {
	            this.setValue(nextProps.value, null);
	        }
	    },

	    /**
	     * Change handler
	     * We need this method to avoid async problem with React's setState
	     * @param event {Event} event object
	     * @private
	     */
	    _handleChange: function _handleChange(event) {
	        var value = event.target.value;

	        this.setValue(value, event);
	    },

	    /**
	     * Public method to show errors
	     * Useful with async validation
	     * @param message {String} message to show
	     * @param additionalClassName {String} className to add
	     */
	    showError: function showError(message, additionalClassName) {
	        var className = {};

	        if (additionalClassName) {
	            className[additionalClassName] = true;
	        }

	        className[this.props.className] = true;
	        className[this.props.invalidClassName || errors.defaultInvalidClassName] = true;

	        this.setState({
	            isValid: false,
	            isUsed: true,
	            isChanged: true,
	            className: classNames(className),
	            errorMessage: message || null
	        });
	    },

	    /**
	     * Public method to hide errors
	     */
	    hideError: function hideError() {
	        var className = {};

	        className[this.props.className] = true;

	        this.setState({
	            className: classNames(className),
	            errorMessage: null
	        });
	    }
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends2 = __webpack_require__(50);

	var _extends3 = _interopRequireDefault(_extends2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(42);
	var noop = __webpack_require__(48);
	var getElement = __webpack_require__(51);
	var shared = __webpack_require__(52);
	var errors = __webpack_require__(44);

	/**
	 * Describe Select component
	 * It's familiar with Input component
	 * But have some specific such isUsed and isChanged flags are true with init
	 */
	module.exports = React.createClass({
	    displayName: 'exports',

	    mixins: [shared, getElement],

	    propTypes: {
	        name: React.PropTypes.string.isRequired
	    },

	    getInitialState: function getInitialState() {
	        return {
	            value: this.props.value || '',
	            className: this.props.className || '',
	            isUsed: true,
	            isChanged: true
	        };
	    },

	    /**
	     * Public value setter
	     * Familiar with Input setter
	     * @param value {String|Number} value to be setted
	     * @param event {Event|Boolean} event object or flag to prevent errors to show
	     */
	    setValue: function setValue(value, event) {
	        var isEventPassed = event && event.nativeEvent instanceof Event;

	        if (isEventPassed) {
	            // Persist the event since we will need this event outside this event loop.
	            event.persist();
	        }

	        this.setState({
	            value: value
	        }, function () {
	            (this.props._blocking || noop)(this);
	            (this.props._validate || noop)(this);
	            (this.props.onChange || noop)(isEventPassed ? event : undefined);
	        });
	    },

	    render: function render() {
	        var hint = this.state.errorMessage ? React.createElement(
	            'span',
	            { className: errors.defaultHintClassName },
	            this.state.errorMessage
	        ) : null;

	        return React.createElement(
	            'div',
	            { className: this.props.containerClassName || errors.defaultContainerClassName },
	            React.createElement(
	                'select',
	                (0, _extends3.default)({ ref: 'element' }, this.props, { className: this.state.className, onChange: this._handleChange, value: this.state.value }),
	                this.props.children
	            ),
	            hint
	        );
	    }
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends2 = __webpack_require__(50);

	var _extends3 = _interopRequireDefault(_extends2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(42);
	var noop = __webpack_require__(48);
	var getElement = __webpack_require__(51);
	var classNames = __webpack_require__(46);
	var errors = __webpack_require__(44);

	/**
	 * Describe Button component
	 */
	module.exports = React.createClass({
	    displayName: 'exports',

	    mixins: [getElement],
	    propTypes: {
	        type: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            type: 'submit'
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            isDisabled: true
	        };
	    },

	    componentWillMount: function componentWillMount() {
	        (this.props._registerSubmit || noop)(this);
	        (this.props._registerBlocking || noop)(this);
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        (this.props._unregisterSubmit || noop)(this);
	        (this.props._unregisterBlocking || noop)(this);
	    },

	    render: function render() {
	        var className = {};

	        if (this.props.className) {
	            className[this.props.className] = true;
	        }

	        className[this.props.disabledClassName || errors.defaultDisabledClassName] = this.state.isDisabled;
	        className = classNames(className);

	        // NOTE: Disabled state would be override by passing 'disabled' prop
	        return React.createElement('input', (0, _extends3.default)({ ref: 'element', disabled: this.state.isDisabled }, this.props, { className: className }));
	    }
	});

/***/ }
/******/ ])));