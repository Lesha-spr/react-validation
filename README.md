# react-validation

Component to simple form validation using <a href="https://github.com/chriso/validator.js">validator</a> for check rules.

It is not easy to validate forms with React. The reason is one-way data flow style.
In this case we can't affect forms from the inputs in easy way.
React-validation provides several components which are 'connected' to form via input's method attached by Form component.

Additional markup is allowed inside the Validation.Form markup.

# Installation

``
npm install react-validation
``

# Example usage

```
var validator = require('validator');
var Validation = require('react-validation');

// Extend validator for custom rules
validator.extend('isRequired', function(str) {
    return Boolean(validator.trim(str));
});

validator.extend('isNotValidUser', function(str) {
    return validator.trim(str) === 'Alex';
});

// Extend Validation for error classNames and messages
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
    onSubmit: function(event) {
        event.preventDefault();
        console.log(event);
    },

    render: function() {
        return (
            <Validation.Form onSubmit={this.onSubmit}>
                <label>
                    Just a label for username
                    <Validation.Input
                        blocking='input'
                        className='ui-input'
                        validations={[
                          {
                              rule: 'isRequired'
                          },
                          {
                              rule: 'isNotValidUser'
                          }
                        ]}
                        invalidClassName='ui-input_state_custom-error-classname'
                        name='username'
                        type='text'/>
                </label>
                <Validation.Input
                    blocking='input'
                    className='ui-input'
                    validations={[
                        {
                            rule: 'isEmail'
                        }
                    ]}
                    name='email'
                    type='text'/>
                <Validation.Input
                    blocking='input'
                    className='ui-input'
                    validations={[
                        {
                            rule: 'isRequired',
                            errorMessage: 'required'
                        }
                    ]}
                    name='password'
                    type='password'/>
                <Validation.Button blocking='button' value='submit'/>
            </Validation.Form>
        );
    }
});
```

# Components and props

<h3>Form component</h3>

Form is just a wrapper for form DOM element. You might want to add ```onSubmit={this.onSubmit}``` prop to it to handle the submit event.
Right now it has only one public method ```form.isValidForm() // returns Boolean```

<h3>Input component</h3>

Input component provides several public methods and props.

```validations``` prop attaches validations to Input. It should be an array of objects with ```rule``` and (optional) ```errorMessage```

<b>Example</b>
```
validator.extend('isRequired', function(str) {
    return Boolean(validator.trim(str));
});

<Validation.Input
    invalidClassName='ui-error'
    blocking='input'
    validations={[
        {
            rule: 'isRequired',
            errorMessage: 'mandatory field'
        },
        {
            rule: 'isEmail',
            errorMessage: 'should be email'
        }
    ]} 
/>
```

In the example above we've described Input with two validation rules ```'isRequired'``` and ```'isEmail'```. This rules should be a references to ```validator``` rules as we extended it in example (```'isEmail'``` is a native validator's rule).
You can apply whatever count of validations on the same Input component in order you want them to apply errors.

```blocking``` prop serving empty value and "blocks" Buttons components (sets ```disabled``` prop and className) if it's length is equal to 0 without any errors. It might be deprecated in the future. By default Validation blocks only ```submit``` input.

```invalidClassName``` prop is overriding default invalidClassName.

Input has public method ```showError(message, additionalClassName)```. Both params are optional. When called an error occurs with passed message and additional className on input. It's helpful to use with async errors such not found credentials or something else.

<b>Example</b>

```
var Registration = React.createClass({
    onSubmit: function(event) {
        event.preventDefault();
        this.refs.username.showError('Registration is now closed. We are sorry :(', 'ui-closed-registration-error');
    },

    render: function() {
        return (
            <Validation.Form>
                <Validation.Input ref='username' name='username' validations={[{rule: 'isRequired'}]} />
                <Validation.Input ref='password' name='password' validations={[{rule: 'isRequired'}]} />
                <Validation.Button type='submit' />
            </Validation.Form>
        );
    }
});
```

<h3>Button component</h3>

Button is connected to form via validations. It's disabled when invalid input occurs and if ```blocking='button'``` prop passed and there is some empty ```blocking='input'``` presents.

<b>Example</b>

```
<Validation.Button type='submit' blocking='button' />
```
