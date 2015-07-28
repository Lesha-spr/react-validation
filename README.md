# react-validation

Component to simple form validation using <a href="https://github.com/chriso/validator.js">validator</a> for check rules.

It is not easy to validate forms with React. The reason is one-way data flow style.
In this case we can't affect forms from the inputs in easy way.
React-validation provides several components which are 'connected' to form via input's method attached by Form component.

# Installation

``
npm install react-validation
``

# Example usage

```
Validation.extendErrors({
    isNotValidUser: {
        className: 'ui-input_state_invalid-user',
        message: 'not equal to "Alex"'
    },
    isRequired: {
        className: 'ui-input_state_empty',
        message: 'required'
    },
    isEmail: {
        className: 'ui-input_state_email-pattern-failed',
        message: 'should be email'
    }
});

var Form = React.createClass({
    onSubmit: function(event, data) {

        event.preventDefault();
        console.log(data);
    },

    render: function() {
        return (
            <Validation.Form onSubmit={this.onSubmit}>
                <Validation.Input blocking='input' className='ui-input' validations={[{
                    rule: 'isNotValidUser',
                    invalidClassName: 'ui-input_state_custom-classname'
                }]} name='username' type='text'/>
                <Validation.Input blocking='input' className='ui-input' validations={[{
                    rule: 'isEmail'
                }]} name='email' type='text'/>
                <Validation.Input blocking='input' className='ui-input' validations={[{
                    rule: 'isRequired',
                    errorMessage: 'required'
                }]} name='password' type='password'/>
                <Validation.Button blocking='button' value='submit'/>
            </Validation.Form>
        );
    }
});
```
