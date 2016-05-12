var React = require('react');
var validator = require('validator');
var classNames = require('classnames');
var objectAssign = require('lodash.assign');
var isObject = require('lodash.isobject');
var isFunction = require('lodash.isfunction');
var noop = require('lodash.noop');
var includes = require('lodash.includes');
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
        this._submitRefs = [];
        this._blockingRefs = [];
    },

    componentDidMount: function() {
        this._toggleButtons(this._submitRefs, this._validations);
        this._toggleButtons(this._blockingRefs, this._blockers);
    },

    _getValidationValue: function(component, callback) {
        var isCheckbox = component.props.type === 'checkbox';
        var value = value ? validator.trim(component.props.value.toString()) : '';

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
                childProps.ref = child.props.type + $idx;
                $idx++;
                this._submitRefs.push(childProps.ref);
            }

            if (child.props.blocking === 'input' && isFunction(child.type)) {
                childProps._registerControl = this._registerControl;
                childProps._blocking = this._blocking;
            }

            if (child.props.blocking === 'button' && isFunction(child.type)) {
                childProps.ref = childProps.ref || child.props.blocking + $idx;
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
        return <form {...this.props}>
            {this._recursiveCloneChildren(this.props.children, 0)}
        </form>;
    }
});