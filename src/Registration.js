var React = require('react');
var Validation = require('./../build');

var Registration = React.createClass({
    checkEqual: function() {
        var password = this.refs.password;
        var passwordConfirm = this.refs.passwordConfirm;
        var hasValue = Boolean(password.state.value) && Boolean(passwordConfirm.state.value);

        if (hasValue) {
            if (password.state.value === passwordConfirm.state.value) {
                password.hideError();
                passwordConfirm.hideError();
            } else {
                password.showError('Passwords should be equal');
                passwordConfirm.showError('Passwords should be equal');
            }
        }
    },

    render: function() {
        return (
            <Validation.Form>
                <h2>Registration form</h2>
                <Validation.Input placeholder='firstname' name='firstname' validations={[
                        {
                            rule: 'isRequired'
                        },
                        {
                            rule: 'isAlpha'
                        }
                    ]} />
                <Validation.Input placeholder='lastname' name='lastname' validations={[
                        {
                            rule: 'isRequired'
                        },
                        {
                            rule: 'isAlpha'
                        }
                    ]} />
                <Validation.Input placeholder='email' name='email' validations={[
                        {
                            rule: 'isRequired'
                        },
                        {
                            rule: 'isEmail'
                        }
                    ]} />
                <Validation.Input placeholder='password' ref='password' type='password' onBlur={this.checkEqual} onChange={this.checkEqual} name='password' validations={[
                        {
                            rule: 'isRequired'
                        }
                    ]} />
                <Validation.Input placeholder='password confirmation' ref='passwordConfirm' type='password' onBlur={this.checkEqual} onChange={this.checkEqual} name='password-confirm' validations={[
                        {
                            rule: 'isRequired'
                        }
                    ]} />
                <br/>
                <Validation.Button type='submit' value='complete registration' />
            </Validation.Form>
        );
    }
});

module.exports = Registration;