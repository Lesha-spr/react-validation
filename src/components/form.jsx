var React = require('react');
var validator = require('validator');
var classNames = require('classnames');
var isObject = require('lodash.isobject');
var noop = require('lodash.noop');
var errors = require('./../errors/index');

/**
 * Describe Form component
 * It is using heavy recursiveCloneChildren method
 * It may be refactored by using refs instead and set props more natively
 */
module.exports = React.createClass({
    componentWillMount: function() {
        this._inputs = {};
        this._validations = {};
        this._blockers = {};
        this._submitButtons = {};
        this._blockingButtons = {};
    },

    componentDidMount: function() {
        this._toggleButtons(this._submitButtons, this._validations);
        this._toggleButtons(this._blockingButtons, this._blockers);
    },

    _getValidationValue: function(component, callback) {
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
    _validate: function(component, dontValidateBoundedInput, forceValidate) {
        // TODO: refactor whole method
        var validations = component.props.validations;
        var state = {
            isValid: true,
            shouldUpdate: (component.state.isUsed && component.state.isChanged) || forceValidate
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
                console.warn('You probably didn\'t specified (extend) Validation for ' + validation.rule + ' rule.' +
                    'See Validation.extendErrors public method.');
            }
        }

        className = classNames(className);

        if (state.shouldUpdate) {
            Object.assign(state, {
                className: className
            });
        }

        component.setState(state);

        this._validations[component.props.name] = state.isValid;
        this._toggleButtons(this._submitButtons, this._validations);
    },

    _validateState: function(component, validation, boundValue, state, className) {
        state.isValid = validator[validation.rule](component.state.value.toString(), boundValue);
        state.errorMessage = state.shouldUpdate && !state.isValid ? this._getErrorMessage(validation) : null;

        if (!state.isValid) {
            Object.assign(className, this._getErrorClassName(component, validation));
            (component.props.onError || noop)(validation);
        }

        return state.isValid;
    },

    _getErrorMessage: function(validation) {
        var hasRule = errors[validation.rule];

        return validation.errorMessage || (hasRule ? errors[validation.rule].message : errors.defaultMessage);
    },

    _getErrorClassName: function(component, validation) {
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
    _blocking: function(component) {
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
    _setButtonsState: function(buttons, hasBlocking) {
        Object.keys(buttons).forEach(function(id) {
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
    _recursiveCloneChildren: function(children, index) {
        return React.Children.map(children, function(child, i) {
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

    _registerSubmit: function(component) {
        this._submitButtons[component.props._id] = component;
    },

    _unregisterSubmit: function(component) {
        delete this._submitButtons[component.props._id];
    },

    _registerBlocking: function(component) {
        this._blockingButtons[component.props._id] = component;
    },

    _unregisterBlocking: function(component) {
        delete this._blockingButtons[component.props._id];
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

        return Object.assign({}, _this._validations);
    },

    render: function() {
        return <form {...this.props}>
            {this._recursiveCloneChildren(this.props.children, 0)}
        </form>;
    }
});