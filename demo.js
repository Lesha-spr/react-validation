var React = require('react');
var validator = require('validator');
var Validation = require('./build');

Validation.extendErrors({
    isRequired: {
        message: 'required',
        rule: function(value) {
            return Boolean(validator.trim(value));
        }
    },
    isEmail: {
        className: 'ui-input_state_email-pattern-failed',
        message: 'should be email'
    }
});

var Login = React.createClass({
    render: function() {
        return (
            <Validation.Form>
                <label>
                    Email
                    <Validation.Input name='email' validations={[
                        {
                            rule: 'isRequired'
                        },
                        {
                            rule: 'isEmail'
                        }
                    ]} />
                </label>
                <label>
                    Password
                    <Validation.Input name='password' type='password' validations={[
                        {
                            rule: 'isRequired'
                        }
                    ]} />
                </label>
                <Validation.Button type='submit' value='login' />
            </Validation.Form>
        );
    }
});

React.render(<Login/>, document.body);