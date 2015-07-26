var React = require('react');
var _ = require('underscore');
var validator = require('validator');
var classNames = require('classnames');

var errors = {
    defaultMessage: 'validation error',
    isValid: {
        className: 'ui-input_state_invalid'
    },

    isRequired: {
        className: 'ui-input_state_empty',
        message: 'required'
    },

    isEmail: {
        className: 'ui-input_state_email-pattern-failed',
        message: 'should be email'
    }
};

var Validation = {
    Form: React.createClass({displayName: "Form",
        componentWillMount: function() {
            this.inputs = {
                submit: [],
                validations: {},
                blocking: {
                    inputs: {},
                    buttons: []
                }
            };
        },

        render: function() {
            return (
                React.createElement("form", {onSubmit: this.props.onSubmit}, 
                    this.recursiveCloneChildren(this.props.children)
                )
            );
        },

        validate: function(component) {
            var validations = component.props.validations;
            var isCheckbox = component.props.type === 'checkbox';
            var state = {
                isValid: true
            };
            var className = {};
            var errorMessage = null;

            className[component.props.className] = true;

            for (var i = 0; i < validations.length; i++) {
                var rule = validations[i];

                if (isCheckbox) {
                    state.isValid = component.state.checked;
                    if (!state.isValid) {
                        setErrorState(rule);
                    }
                }

                if (!validator[rule](component.state.value)) {
                    state.isValid = false;
                    setErrorState(rule);

                    break;
                }
            }

            className = classNames(className);

            if (isCheckbox || (component.state.isUsed && component.state.isChanged)) {
                _.extend(state, {
                    className: className,
                    errorMessage: errorMessage
                });
            }

            component.setState(state);

            this.inputs.validations[component.props.name] = state.isValid;
            this.toggleSubmitButtons();

            function setErrorState(rule) {
                className[component.props.invalidClassName] = true;
                className[errors[rule].className] = true;
                errorMessage = component.props.errorMessage || errors[rule].message || errors.defaultMessage;
            }
        },

        toggleSubmitButtons: function() {
            var buttons = this.inputs.submit;
            var isValidForm = this.isValidForm();

            this._setButtonsState(buttons, !isValidForm);
        },

        isValidForm: function() {
            return !(_.contains(this.inputs.validations, false));
        },

        blocking: function(component) {
            var _this = this;
            var buttons = _this.inputs.blocking.buttons;
            var hasBlocking = false;

            _this.inputs.blocking.inputs[component.props.name] = Boolean(validator.trim(component.state.value));

            if (_this.inputs.blocking.inputs.length) {
                Object.keys(_this.inputs.blocking.inputs).forEach(function(key) {
                    if (!_this.inputs.blocking.inputs[key]) {
                        hasBlocking = true;
                    }
                });
            }

            this._setButtonsState(buttons, hasBlocking);
        },

        _setButtonsState: function(buttons, hasBlocking) {
            var i;

            for (i = 0; i < buttons.length; i++) {
                this.refs[buttons[i]].setState({
                    isDisabled: hasBlocking
                });
            }
        },

        recursiveCloneChildren: function(children, index) {
            return React.Children.map(children, function(child, i) {
                var $idx = index || i;

                if (!_.isObject(child)) {
                    return child;
                }

                var childProps = {};
                var shouldValidate = _.isArray(child.props.validations) && child.props.validations.length;

                if (shouldValidate) {
                    childProps.validate = this.validate;
                    this.inputs.validations[child.props.name] = false;
                }

                if (child.props.type === 'submit') {
                    childProps.ref = child.props.ref || child.props.type + $idx;
                    $idx++;
                    this.inputs.submit.push(childProps.ref);
                }

                if (child.props.blocking === 'input') {
                    childProps.blocking = this.blocking;
                    this.inputs.blocking.inputs[child.props.name] = false;
                }

                if (child.props.blocking === 'button') {
                    childProps.ref = child.props.ref || child.props.blocking + $idx;
                    $idx++;
                    this.inputs.blocking.buttons.push(childProps.ref);
                }

                childProps.children = this.recursiveCloneChildren(child.props.children, $idx);

                return React.cloneElement(child, childProps);
            }, this);
        }
    }),

    Input: React.createClass({displayName: "Input",
        propTypes: {
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
                invalidClassName: 'ui-input_state_invalid'
            }
        },

        getInitialState: function() {
            return {
                value: this.props.value || '',
                className: this.props.className || '',
                checked: this.props.checked || false,
                isValid: true,
                isUsed: false,
                isChanged: false,
                errorMessage: null
            }
        },

        setValue: function(event) {
            this.setState({
                isChanged: true,
                value: event.currentTarget.value,
                checked: !this.state.checked
            }, function() {
                (this.props.blocking || _.noop)(this);
                (this.props.validate || _.noop)(this);
            });

            (this.props.onChange || _.noop)(event);
        },

        onBlur: function(event) {
            this.setState({
                isUsed: true
            }, function() {
                (this.props.validate || _.noop)(this);
            });

            (this.props.onBlur || _.noop)(event);
        },

        render: function() {
            // TODO: rework hint appearance

            return (
                React.createElement("div", null, 
                    React.createElement("input", React.__spread({},  this.props, {className: this.state.className, value: this.state.value, onChange: this.setValue, onBlur: this.onBlur})), 
                    React.createElement("span", {className: "ui-input-hint"}, this.state.errorMessage)
                )
            );
        }
    }),

    Button: React.createClass({displayName: "Button",
        propTypes: {
            type: React.PropTypes.string
        },

        getDefaultProps: function() {
            return {
                type: 'submit',
                className: 'ui-button',
                disabledClassName: 'ui-button_state_disabled'
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
    }),

    extendErrors: function(obj) {
        _.extend(errors, obj)
    }
};

module.exports = Validation;