var React = require('react');
var Validation = require('./index.jsx');

var Login = React.createClass({
    getInitialState: function() {
        return {
            value: ''
        }
    },

    onSubmit: function(event) {
        event.preventDefault();
        console.log(event.currentTarget);
    },

    onChange: function(event) {
        this.setState({
            value: event.target.value
        })
    },

    render: function() {
        return (
            <Validation.Form onSubmit={this.onSubmit}>
                <label>
                    Email
                    <Validation.Input onChange={this.onChange} className='ui-input' placeholder='' name='email' validations={[
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
                    <Validation.Input value={this.state.value} className='ui-input' placeholder='' name='password' type='password' validations={[
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