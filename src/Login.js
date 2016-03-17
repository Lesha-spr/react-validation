var React = require('react');
var Validation = require('./../build');

var Login = React.createClass({
    onSubmit: function(event) {
        event.preventDefault();
        console.log(event.currentTarget);
    },

    render: function() {
        return (
            <Validation.Form onSubmit={this.onSubmit}>
                <label>
                    Email
                    <Validation.Input className='ui-input' placeholder='' name='email' validations={[
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
                    <Validation.Input className='ui-input' placeholder='' name='password' type='password' validations={[
                        {
                            rule: 'isRequired'
                        }
                    ]} />
                </label>
                <br/>
                <Validation.Button type='submit' value='login' />
            </Validation.Form>
        );
    }
});

module.exports = Login;