var React = require('react');
var validator = require('validator');
var isObject = require('is-object');
var isArray = require('is-array');
var isFunction = require('is-function');
var includes = require('lodash.includes');
var noop = require('lodash.noop');
var objectAssign = require('object-assign');
var classNames = require('classnames');

/**
 * Extendable defaults
 * @type {{defaultMessage: string, defaultInvalidClassName: string, defaultDisabledClassName: string}}
 */
var errors = {
    defaultMessage: 'validation error',
    defaultInvalidClassName: 'ui-input_state_invalid',
    defaultDisabledClassName: 'ui-button_state_disabled',
    defaultHintClassName: 'ui-hint'
};

/**
 * Mounting mixin to register/unregister controls with Component's lifecycle
 * @type {{componentWillMount: Function, componentWillUnmount: Function}}
 * @private
 */
var _mounting = {
    componentWillMount: function() {
        (this.props._registerControl || noop)(this);
    },

    componentWillUnmount: function() {
        (this.props._unregisterControl || noop)(this);
    }
};

/**
 * Validation component namespace
 * @type {Object}
 */
var Validation = {};

/**
 * Describe Form component
 * It is using heavy recursiveCloneChildren method
 * It may be refactored by using refs instead and set props more natively
 */
Validation.Form = React.createClass({displayName: "Form",
    componentWillMount: function() {
        this._validations = {};
        this._blockers = {};
        this._submitRefs = [];
        this._blockingRefs = [];
    },

    componentDidMount: function() {
        this._toggleButtons(this._submitRefs, this._validations);
        this._toggleButtons(this._blockingRefs, this._blockers);
    },

    render: function() {
        return (
            React.createElement("form", {onSubmit: this.props.onSubmit || noop}, 
                this._recursiveCloneChildren(this.props.children, 0)
            )
        );
    },

    _getValidationModel: function(component, callback) {
        var isCheckbox = component.props.type === 'checkbox';
        var isBlocker = component.props.blocking;
        var value = validator.trim(component.props.value);
        var model = isBlocker ? this._blockers : this._validations;

        if (isCheckbox && !component.props.checked) {
            value = '';
        }

        return callback(value, model);
    },

    /**
     * Method to validate component value
     * @param component {Object} React component
     * @private
     */
    _validate: function(component) {
        var validations = component.props.validations;
        var state = {
            isValid: true
        };
        var className = {};
        var errorMessage = null;

        className[component.props.className] = true;

        for (var i = 0; i < validations.length; i++) {
            var validation = validations[i];

            try {
                if (!validator[validation.rule](component.state.value)) {
                    state.isValid = false;
                    setErrorState(validation);
                    (component.props.onError || noop)(validation);

                    break;
                }
            } catch (error) {
                console.warn('You probably didn\'t specified (extend) Validation for ' + validation.rule + ' rule.' +
                'See Validation.extendErrors public method.');
            }
        }

        className = classNames(className);

        if (component.state.isUsed && component.state.isChanged) {
            objectAssign(state, {
                className: className,
                errorMessage: errorMessage
            });
        }

        component.setState(state);

        this._validations[component.props.name] = state.isValid;
        this._toggleButtons(this._submitRefs, this._validations);

        function setErrorState(validation) {
            var hasRule = errors[validation.rule];
            var hasErrorClassName = hasRule && errors[validation.rule].className;

            className[component.props.invalidClassName] = true;
            className[hasErrorClassName ? errors[validation.rule].className : className[errors.defaultInvalidClassName]] = true;
            errorMessage = validation.errorMessage || hasRule ? errors[validation.rule].message : errors.defaultMessage;
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
            var shouldValidate = isArray(child.props.validations) && child.props.validations.length;

            if (shouldValidate) {
                childProps._registerControl = this._registerControl;
                childProps._validate = this._validate;
            }

            if (child.props.type === 'submit') {
                childProps.ref = child.props.ref || child.props.type + $idx;
                $idx++;
                this._submitRefs.push(childProps.ref);
            }

            if (child.props.blocking === 'input') {
                childProps._registerControl = this._registerControl;
                childProps._blocking = this._blocking;
            }

            if (child.props.blocking === 'button') {
                childProps.ref = childProps.ref || child.props.ref || child.props.blocking + $idx;
                $idx++;
                this._blockingRefs.push(childProps.ref);
            }

            childProps.children = this._recursiveCloneChildren(child.props.children, $idx);

            return React.cloneElement(child, childProps);
        }, this);
    },

    _registerControl: function(component) {
        this._getValidationModel(component, function(value, model) {
            model[component.props.name] = Boolean(value);
        });
    },

    _unregisterControl: function(component) {
        this._getValidationModel(component, function(value, model) {
            delete model[component.props.name];
        });
    }
});

/**
 * Describe Input component
 * It is a common component and contains inputs, checkboxes and radios
 */
Validation.Input = React.createClass({displayName: "Input",
    mixins: [_mounting],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
        placeholder: React.PropTypes.oneOfType([
            React.PropTypes.string, React.PropTypes.number
        ])
    },

    getDefaultProps: function() {
        return {
            type: 'text',
            placeholder: 'placeholder',
            className: 'ui-input',
            invalidClassName: errors.defaultInvalidClassName
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
        className[this.props.invalidClassName] = true;

        this.setState({
            isValid: false,
            isUsed: true,
            isChanged: true,
            className: classNames(className),
            errorMessage: message || null
        });
    },

    /**
     * Change handler
     * We need this method to avoid async problem with React's setState
     * @param event {Event} event object
     * @private
     */
    _onChange: function(event) {
        var value = event.currentTarget.value;

        this.setValue(value, event);
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

        this.setState({
            isChanged: true,
            isUsed: isEventPassed || !event,
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
    _onBlur: function(event) {
        this.setState({
            isUsed: true
        }, function() {
            (this.props._validate || noop)(this);
            (this.props.onBlur || noop)(event);
        });
    },

    render: function() {
        // TODO: rework hint appearance

        return (
            React.createElement("div", null, 
                React.createElement("input", React.__spread({},  this.props, {className: this.state.className, checked: this.state.checked, value: this.state.value, onChange: this._onChange, onBlur: this._onBlur})), 
                React.createElement("span", {className: errors.defaultHintClassName}, this.state.errorMessage)
            )
        );
    }
});

/**
 * Describe Select component
 * It's familiar with Input component
 * But have some specific such isUsed and isChanged flags are true with init
 */
Validation.Select = React.createClass({displayName: "Select",
    mixins: [_mounting],

    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    getDefaultProps: function() {
        return {
            className: 'ui-select',
            invalidClassName: errors.defaultInvalidClassName
        }
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
     * Change handler
     * We need this method to avoid async problem with React's setState
     * @param event {Event} event object
     * @private
     */
    _onChange: function(event) {
        var value = event.currentTarget.value;

        this.setValue(value, event);
    },

    /**
     * Public value setter
     * Familiar with Input setter
     * @param value {String|Number} value to be setted
     * @param event {Event|Boolean} event object or flag to prevent errors to show
     */
    setValue: function(value, event) {
        var isEventPassed = (event && event.nativeEvent instanceof Event);

        this.setState({
            value: value
        }, function() {
            (this.props._blocking || noop)(this);
            (this.props._validate || noop)(this);
            (this.props.onChange || noop)(isEventPassed ? event : undefined);
        });
    },

    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("select", React.__spread({},  this.props, {className: this.state.className, onChange: this._onChange, value: this.state.value}), 
                    this.props.children
                ), 
                React.createElement("span", {className: errors.defaultHintClassName}, this.state.errorMessage)
            )
        );
    }
});

/**
 * Describe Button component
 */
Validation.Button = React.createClass({displayName: "Button",
    propTypes: {
        type: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            type: 'submit',
            className: 'ui-button',
            disabledClassName: errors.defaultDisabledClassName
        }
    },

    getInitialState: function() {
        return {
            isDisabled: true
        }
    },

    render: function() {
        var className = {};
        className[this.props.className] = true;
        className[this.props.disabledClassName] = this.state.isDisabled;
        className = classNames(className);

        // NOTE: Disabled state would be override by passing 'disabled' prop
        return (
            React.createElement("input", React.__spread({disabled: this.state.isDisabled},  this.props, {className: className}))
        );
    }
});

/**
 * Public method to extend default error object
 * @param obj {Object}
 */
Validation.extendErrors = function(obj) {
    objectAssign(errors, obj);

    Object.keys(errors).forEach(function(key) {
        if (errors[key].rule && isFunction(errors[key].rule)) {
            validator.extend(key, function(str) {
                return errors[key].rule(str);
            });
        }
    });
};

module.exports = Validation;