var React = require('react');
var Validation = require('./../build');
var MaskedInput = require('react-maskedinput');

var Registration = React.createClass({
    onSubmit: function(event) {
        event.preventDefault();

        console.log(this.refs.form.forceValidate(true));
    },
    render: function() {
        return (
            <Validation.Form onSubmit={this.onSubmit} ref='form'>
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
                <Validation.Input wrapper={{component: MaskedInput, props: {mask: '11/11/1111'}}} name='birthday' onChange={function(event) {console.log(event.target.value)}} validations={[
                        {
                            rule: 'isRequired'
                        }
                    ]} />
                <label>
                    * I accept the policy
                    <Validation.Input name='policy' value='true' type='checkbox' validations={[
                        {
                            rule: 'isRequired'
                        }
                    ]} />
                </label>
                <Validation.Select name='city' validations={[{rule: 'isRequired'}]}>
                    <option value=''>Choose your City</option>
                    <option value='Kyiv'>Kyiv</option>
                    <option value='London'>London</option>
                </Validation.Select>
                <Validation.Input placeholder='password' ref='password' type='password' name='password' validations={[
                        {
                            rule: 'isRequired'
                        },
                        {
                            rule: 'isEqualToNamedInput',
                            name: 'password-confirm'
                        }
                    ]} />
                <Validation.Input placeholder='password confirmation' ref='passwordConfirm' type='password' name='password-confirm' validations={[
                        {
                            rule: 'isRequired'
                        },
                        {
                            rule: 'isEqualToNamedInput',
                            name: 'password'
                        }
                    ]} />
                <br/>
                <button type='submit' value='complete registration'>Submit</button>
            </Validation.Form>
        );
    }
});

module.exports = Registration;
