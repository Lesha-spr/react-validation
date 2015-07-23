var React = require('react');
var _ = require('underscore');
var validator = require('validator');
var classNames = require('classnames');

validator.extend('isRequired', function(str) {
    return validator.trim(str).length;
});

var ERRORS = {
    DEFAULT_MESSAGE: 'validation error',
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
    Form: React.createClass({
        componentWillMount: function() {
            this.inputs = {
                validation: [],
                blocking: {
                    inputs: {},
                    buttons: []
                }
            };
        },

        render: function() {
            return (
                <form onSubmit={this.props.onSubmit}>
                    {this.recursiveCloneChildren(this.props.children)}
                </form>
            );
        },

        validate: function(component) {
            var rules = component.props.validations;
            var isValid = true;
            var classes = {};
            var errorMessage;

            classes[component.props.className] = true;

            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];

                if (!validator[rule](component.state.value)) {
                    isValid = false;
                    classes[ERRORS.isValid.className] = true;
                    classes[ERRORS[rule].className] = true;
                    errorMessage = component.props.errorMessage || ERRORS[rule].message || ERRORS.DEFAULT_MESSAGE;

                    break;
                }
            }

            var className = classNames(classes);

            component.setState({
                isValid: isValid,
                isUsed: true,
                className: className,
                errorMessage: errorMessage || null
            });
        },

        blocking: function(component) {
            var _this = this;
            var buttons = _this.inputs.blocking.buttons;
            var hasBlocking = false;
            var i;

            _this.inputs.blocking.inputs[component.props.name] = Boolean(validator.trim(component.state.value));

            Object.keys(_this.inputs.blocking.inputs).forEach(function(key) {
                if (!_this.inputs.blocking.inputs[key]) {
                    hasBlocking = true;
                }
            });

            for (i = 0; i < buttons.length; i++) {
                this.refs[this.inputs.blocking.buttons[i]].setState({
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
                    this.inputs.validation.push(child);
                }

                if (child.props.blocking === 'input') {
                    childProps.blocking = this.blocking;
                    this.inputs.blocking.inputs[child.props.name] = false;
                }

                if (child.props.blocking === 'button') {
                    childProps.ref = child.props.blocking + $idx;
                    $idx++;
                    this.inputs.blocking.buttons.push(childProps.ref);
                }

                childProps.children = this.recursiveCloneChildren(child.props.children, $idx);

                return React.cloneElement(child, childProps);
            }, this);
        }
    }),

    Input: React.createClass({
        propTypes: {
            type: React.PropTypes.string,
            placeholder: React.PropTypes.oneOfType([
                React.PropTypes.string, React.PropTypes.number
            ])
        },

        getDefaultProps: function() {
            return {
                type: 'text',
                placeholder: 'placeholder'
            }
        },

        getInitialState: function() {
            return {
                value: this.props.value || '',
                className: this.props.className || '',
                isValid: true,
                isUsed: false,
                errorMessage: null
            }
        },

        setValue: function(event) {
            this.setState({
                value: event.currentTarget.value
            }, function() {
                (this.props.blocking || _.noop)(this);

                if (this.state.isUsed) {
                    this.props.validate(this);
                }
            });

            (this.props.onChange || _.noop)(event);
        },

        onBlur: function(event) {
            if (!this.state.isUsed) {
                this.props.validate(this);
            }

            (this.props.onBlur || _.noop)(event);
        },

        render: function() {
            return (
                <div>
                    <input {...this.props} className={this.state.className} value={this.state.value} onChange={this.setValue} onBlur={this.onBlur}/>
                    <span className='ui-input-hint'>{this.state.errorMessage}</span>
                </div>
            );
        }
    }),

    Button: React.createClass({
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
            // NOTE: Disabled state would be override by passing 'disabled' prop
            return (
                <input disabled={this.state.isDisabled} {...this.props}/>
            );
        }
    })
};

module.exports = Validation;