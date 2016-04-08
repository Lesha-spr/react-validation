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

	var React = __webpack_require__(1);
	var validator = __webpack_require__(2);
	var isFunction = __webpack_require__(3);
	var objectAssign = __webpack_require__(4);
	var errors = __webpack_require__(5);

	/**
	 * Validation component namespace
	 * @type {Object}
	 */
	var Validation = {
	    Form: __webpack_require__(6),
	    Input: __webpack_require__(11),
	    Select: __webpack_require__(13),
	    Button: __webpack_require__(14)
	};

	/**
	 * Public method to extend default error object
	 * @param obj {Object}
	 */
	Validation.extendErrors = function(obj) {
	    objectAssign(errors, obj);

	    Object.keys(errors).forEach(function(key) {
	        if (errors[key].rule && isFunction(errors[key].rule)) {
	            validator.extend(key, function(value, comparedValue) {
	                return errors[key].rule(value, comparedValue);
	            });
	        }
	    });
	};

	module.exports = Validation;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("validator");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("lodash.isfunction");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("lodash.assign");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {
	    defaultMessage: 'validation error',
	    defaultInvalidClassName: 'ui-input_state_invalid',
	    defaultDisabledClassName: 'ui-button_state_disabled',
	    defaultHintClassName: 'ui-hint',
	    defaultContainerClassName: ''
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var validator = __webpack_require__(2);
	var classNames = __webpack_require__(7);
	var objectAssign = __webpack_require__(4);
	var isObject = __webpack_require__(8);
	var isFunction = __webpack_require__(3);
	var noop = __webpack_require__(9);
	var includes = __webpack_require__(10);
	var errors = __webpack_require__(5);

	/**
	 * Describe Form component
	 * It is using heavy recursiveCloneChildren method
	 * It may be refactored by using refs instead and set props more natively
	 */
	module.exports = React.createClass({displayName: "module.exports",
	    componentWillMount: function() {
	        this._inputs = {};
	        this._validations = {};
	        this._blockers = {};
	        this._submitRefs = [];
	        this._blockingRefs = [];
	    },

	    componentDidMount: function() {
	        this._toggleButtons(this._submitRefs, this._validations);
	        this._toggleButtons(this._blockingRefs, this._blockers);
	    },

	    _getValidationValue: function(component, callback) {
	        var isCheckbox = component.props.type === 'checkbox';
	        var value = validator.trim(component.props.value);

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
	    _validate: function(component, dontValidateBoundedInput, forceValidate) {
	        // TODO: refactor whole method
	        var validations = component.props.validations;
	        var state = {
	            isValid: true
	        };
	        var className = {};
	        var errorMessage = null;
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
	                    if (boundInput.state.isUsed && boundInput.state.isChanged) {
	                        if (!validate(validation, boundValue)) {
	                            break;
	                        }
	                    }
	                } else {
	                    if (!validate(validation, boundValue)) {
	                        break;
	                    }
	                }
	            } catch (error) {
	                console.warn('You probably didn\'t specified (extend) Validation for ' + validation.rule + ' rule.' +
	                    'See Validation.extendErrors public method.');
	            }
	        }

	        className = classNames(className);

	        if ((component.state.isUsed && component.state.isChanged) || forceValidate) {
	            objectAssign(state, {
	                className: className,
	                errorMessage: errorMessage
	            });
	        }

	        component.setState(state);

	        this._validations[component.props.name] = state.isValid;
	        this._toggleButtons(this._submitRefs, this._validations);

	        function validate(validation, boundValue) {
	            var isValid = true;

	            if (!validator[validation.rule](component.state.value, boundValue)) {
	                state.isValid = false;
	                setErrorState(validation);
	                (component.props.onError || noop)(validation);

	                isValid = false;
	            }

	            return isValid;
	        }

	        function setErrorState(validation) {

	            var hasRule = errors[validation.rule];
	            var hasErrorClassName = hasRule && errors[validation.rule].className;

	            className[component.props.invalidClassName || errors.defaultInvalidClassName] = true;
	            className[hasErrorClassName ? errors[validation.rule].className : errors.defaultInvalidClassName] = true;
	            errorMessage = validation.errorMessage || (hasRule ? errors[validation.rule].message : errors.defaultMessage);
	        }
	    },

	    /**
	     * Method to lock/unlock buttons
	     * @param buttons {Array} Array of refs to React components
	     * @param model {Object} Model to find blockers
	     * @private
	     */
	    _toggleButtons: function(buttons, model) {
	        var hasBlocking = this._hasFalsyFlag(model);

	        this._setButtonsState(buttons, hasBlocking);
	    },

	    /**
	     * Public method to check form on validity
	     * @return {Boolean}
	     */
	    isValidForm: function() {
	        return !this._hasFalsyFlag(this._validations);
	    },

	    /**
	     * Method to validate data model
	     * @param model {Object} Model to validate
	     * @return {Boolean}
	     * @private
	     */
	    _hasFalsyFlag: function(model) {
	        return includes(model, false);
	    },

	    /**
	     * Method to validate blocking inputs
	     * @param component {Object} React component
	     * @private
	     */
	    _blocking: function(component) {
	        var _this = this;
	        var buttons = _this._blockingRefs;
	        var hasBlocking;

	        _this._blockers[component.props.name] = Boolean(validator.trim(component.state.value));

	        hasBlocking = _this._hasFalsyFlag(_this._blockers) || _this._hasFalsyFlag(_this._validations);

	        this._setButtonsState(buttons, hasBlocking);
	    },

	    /**
	     * Method to set buttons state
	     * @param buttons {Array} Array of refs on button React components
	     * @param hasBlocking {Boolean} button has at least one blocker
	     * @private
	     */
	    _setButtonsState: function(buttons, hasBlocking) {
	        var i;

	        for (i = 0; i < buttons.length; i++) {
	            this.refs[buttons[i]].setState({
	                isDisabled: hasBlocking
	            });
	        }
	    },

	    /**
	     * Method to check props and add additional validation methods
	     * Should be refactored or being rewrite
	     * @param children {Object|String|Number} Child elements of root React component
	     * @param index {Number} abstract number to add ref
	     * @return {Object|String|Number}
	     * @private
	     */
	    _recursiveCloneChildren: function(children, index) {
	        return React.Children.map(children, function(child, i) {
	            var $idx = index || i;

	            if (!isObject(child)) {
	                return child;
	            }

	            var childProps = {};
	            var shouldValidate = Array.isArray(child.props.validations) && child.props.validations.length;

	            if (shouldValidate) {
	                childProps._registerControl = this._registerControl;
	                childProps._validate = this._validate;
	            }

	            // TODO: Check this condition
	            if (child.props.type === 'submit' && isFunction(child.type)) {
	                childProps.ref = child.props.ref || child.props.type + $idx;
	                $idx++;
	                this._submitRefs.push(childProps.ref);
	            }

	            if (child.props.blocking === 'input' && isFunction(child.type)) {
	                childProps._registerControl = this._registerControl;
	                childProps._blocking = this._blocking;
	            }

	            if (child.props.blocking === 'button' && isFunction(child.type)) {
	                childProps.ref = childProps.ref || child.props.ref || child.props.blocking + $idx;
	                $idx++;
	                this._blockingRefs.push(childProps.ref);
	            }

	            childProps.children = this._recursiveCloneChildren(child.props.children, $idx);

	            return React.cloneElement(child, childProps);
	        }, this);
	    },

	    _registerControl: function(component) {
	        this._getValidationValue(component, function(value) {
	            if (component.props._blocking) {
	                this._blockers[component.props.name] = Boolean(value);
	            }

	            if (component.props._validate) {
	                this._inputs[component.props.name] = component;
	                this._validations[component.props.name] = Boolean(value);
	            }
	        });
	    },

	    _unregisterControl: function(component) {
	        delete this._blockers[component.props.name];
	        delete this._validations[component.props.name];
	    },

	    forceValidate: function(showErrors) {
	        var _this = this;

	        Object.keys(this._inputs).forEach(function(name) {
	            _this._inputs[name].props._validate(_this._inputs[name], false, showErrors);
	        });

	        return objectAssign({}, _this._validations);
	    },

	    render: function() {
	        return React.createElement("form", React.__spread({},  this.props), 
	            this._recursiveCloneChildren(this.props.children, 0)
	        );
	    }
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("lodash.isobject");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("lodash.noop");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("lodash.includes");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var noop = __webpack_require__(9);
	var objectAssign = __webpack_require__(4);
	var shared = __webpack_require__(12);
	var errors = __webpack_require__(5);

	/**
	 * Describe Input component
	 * It is a common component and contains inputs, checkboxes and radios
	 */
	module.exports = React.createClass({displayName: "module.exports",
	    mixins: [shared],

	    propTypes: {
	        name: React.PropTypes.string.isRequired,
	        type: React.PropTypes.string
	    },

	    getDefaultProps: function() {
	        return {
	            type: 'text'
	        }
	    },

	    // TODO: refactor this method
	    getInitialState: function() {
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
	        }
	    },

	    /**
	     * Public value setter
	     * @param value {String|Number} value to be setted
	     * @param event {Event|Boolean} event object or flag to prevent errors to show
	     */
	    setValue: function(value, event) {
	        var isEventPassed = (event && event.nativeEvent instanceof Event);

	        if (this.isCheckbox) {
	            value = !this.state.checked ? this.props.value : '';
	        }

	        if (isEventPassed) {
	            // Persist the event since we will need this event outside this event loop.
	            event.persist();
	        }

	        this.setState({
	            isChanged: (value !== this.state.value) || (value !== this.state.lastValue),
	            isUsed: this.state.isUsed || !event,
	            value: value,
	            checked: this.isCheckbox ? !this.state.checked : isEventPassed || !event
	        }, function() {
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
	    _handleBlur: function(event) {
	        this.setState({
	            isUsed: true,
	            lastValue: event.currentTarget.value
	        }, function() {
	            (this.props._validate || noop)(this);
	            (this.props.onBlur || noop)(event);
	        });
	    },

	    render: function() {
	        var input;
	        var props;
	        var hint = this.state.errorMessage ? React.createElement("span", {className: errors.defaultHintClassName}, this.state.errorMessage) : null;

	        if (this.props.wrapper) {
	            try {
	                props = objectAssign({}, this.props.wrapper.props, this.props);

	                input = React.createElement(this.props.wrapper.component, React.__spread({},  props, {className: this.state.className, checked: this.state.checked, onChange: this._handleChange, onBlur: this._handleBlur}));
	            } catch(e) {
	                console.log(e);
	            }
	        } else {
	            input = React.createElement("input", React.__spread({},  this.props, {className: this.state.className, checked: this.state.checked, value: this.state.value, onChange: this._handleChange, onBlur: this._handleBlur}));
	        }
	        // TODO: rework hint appearance

	        return React.createElement("div", {className: this.props.containerClassName || errors.defaultContainerClassName}, 
	            input, 
	            hint
	        );
	    }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var errors = __webpack_require__(5);
	var noop = __webpack_require__(9);

	module.exports = {
	    componentWillMount: function() {
	        (this.props._registerControl || noop)(this);
	    },

	    componentWillUnmount: function() {
	        (this.props._unregisterControl || noop)(this);
	    },

	    /**
	     * Change handler
	     * We need this method to avoid async problem with React's setState
	     * @param event {Event} event object
	     * @private
	     */
	    _handleChange: function(event) {
	        var value = event.currentTarget.value;

	        this.setValue(value, event);
	    },

	    /**
	     * Public method to show errors
	     * Useful with async validation
	     * @param message {String} message to show
	     * @param additionalClassName {String} className to add
	     */
	    showError: function(message, additionalClassName) {
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
	    hideError: function() {
	        var className = {};

	        className[this.props.className] = true;

	        this.setState({
	            className: classNames(className),
	            errorMessage: null
	        });
	    }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var noop = __webpack_require__(9);
	var shared = __webpack_require__(12);
	var errors = __webpack_require__(5);

	/**
	 * Describe Select component
	 * It's familiar with Input component
	 * But have some specific such isUsed and isChanged flags are true with init
	 */
	module.exports = React.createClass({displayName: "module.exports",
	    mixins: [shared],

	    propTypes: {
	        name: React.PropTypes.string.isRequired
	    },

	    getInitialState: function() {
	        return {
	            value: this.props.value || null,
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
	    setValue: function(value, event) {
	        var isEventPassed = (event && event.nativeEvent instanceof Event);

	        if (isEventPassed) {
	            // Persist the event since we will need this event outside this event loop.
	            event.persist();
	        }

	        this.setState({
	            value: value
	        }, function() {
	            (this.props._blocking || noop)(this);
	            (this.props._validate || noop)(this);
	            (this.props.onChange || noop)(isEventPassed ? event : undefined);
	        });
	    },

	    render: function() {
	        var hint = this.state.errorMessage ? React.createElement("span", {className: errors.defaultHintClassName}, this.state.errorMessage) : null;

	        return React.createElement("div", {className: this.props.containerClassName || errors.defaultContainerClassName}, 
	            React.createElement("select", React.__spread({},  this.props, {className: this.state.className, onChange: this._handleChange, value: this.state.value}), 
	                this.props.children
	            ), 
	            hint
	        );
	    }
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(7);
	var errors = __webpack_require__(5);

	/**
	 * Describe Button component
	 */
	module.exports = React.createClass({displayName: "module.exports",
	    propTypes: {
	        type: React.PropTypes.string
	    },

	    getDefaultProps: function() {
	        return {
	            type: 'submit'
	        }
	    },

	    getInitialState: function() {
	        return {
	            isDisabled: true
	        }
	    },

	    render: function() {
	        var className = {};

	        if (this.props.className) {
	            className[this.props.className] = true;
	        }

	        className[this.props.disabledClassName || errors.defaultDisabledClassName] = this.state.isDisabled;
	        className = classNames(className);

	        // NOTE: Disabled state would be override by passing 'disabled' prop
	        return React.createElement("input", React.__spread({disabled: this.state.isDisabled},  this.props, {className: className}));
	    }
	});

/***/ }
/******/ ])));