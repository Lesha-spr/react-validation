# react-validation

Component to simple form validation using <a href="https://github.com/chriso/validator.js">validator</a> for check rules.

It is not easy to validate forms with React. The reason is one-way data flow style.
In this case we can't affect forms from the inputs in easy way.
React-validation provides several components which are 'connected' to form via input's method attached by Form component.

### UPDATE: ```ui-input``` className is no longer setted by default. Please check your render method.

<h3><a href="http://lesha-spr.github.io/react-validation/">DEMO</a></h3>

It is just a validation and doesn't provide any model or something similar. You can use FormData or something like <a href="https://www.npmjs.com/package/form-serialize">form-serialize</a> to get form data.

<b>Be aware to always pass ```name``` prop. It is required.</b>

Additional markup is allowed inside the Validation.Form markup.

Any additional props (such event handlers) can also be passed to components.

If you find any bug or error, please feel free to raise an issue. Pull requests are also welcome.

# Installation

``
npm install react-validation
``

# Example usage

Please check <a href="https://github.com/chriso/validator.js">validator</a> reference to see all existing rules.
For known reasons it is better to use ```validator```'s rules where it's possible.
You can extend ```Validation``` with public ```Validation.extendErrors``` method to configure rule, hint message and error className.

Here is huge example below with many features used.

```javascript
var Validation = require('react-validation');
var validator = require('validator');
// You can use Validation Input component with some other wrappers around
var MaskedInput = require('react-maskedinput');

// Extend Validation with custom rules
Validation.extendErrors({
    isNotValidUser: {
        className: 'ui-input_state_invalid-user',
        message: 'not equal to "Alex"',
        rule: function(value) {
            // Validation provides ref to 'validator' module, so you don't need to install it separately
            return validator.trim(value) === 'Alex';
        }
    },
    isRequired: {
        className: 'ui-input_state_empty',
        message: 'required',
        rule: function(value) {
            return Boolean(validator.trim(value));
        }
    },
    isEmail: {
        className: 'ui-input_state_email-pattern-failed',
        // validator already has strong email-pattern, so we don't have to extend it by custom
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
                // Passing wrapper prop will extra wrap the input with passed Component and it's props
                <Validation.Input wrapper={{component: MaskedInput, props: {mask: '11/11/1111'}}} name='birthday' onChange={function(event) {console.log(event.target.value)}} validations={[
                    {
                        rule: 'isRequired'
                    }
                ]} />
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
There is also optional prop ```onError``` callback. It would be called on validation fail and pass the first validation object it is failed on.

<b>Example</b>
```javascript
<Validation.Input
    name='my-input'
    invalidClassName='ui-error'
    blocking='input'
    onError={function(validation) {console.log(validation.rule)}}
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

<b>Example</b>

```javascript
var Registration = React.createClass({
    onSubmit: function(event) {
        event.preventDefault();
        this.refs.username.showError('Registration is now closed. We are sorry :(', 'ui-closed-registration-error');
    },

    render: function() {
        return (
            <Validation.Form onSubmit={this.onSubmit}>
                <Validation.Input ref='username' name='username' validations={[{rule: 'isRequired'}]} />
                <Validation.Input ref='password' name='password' validations={[{rule: 'isRequired'}]} />
                <Validation.Button type='submit' />
            </Validation.Form>
        );
    }
});
```

<h3>Select component</h3>

Select is a wrapper for select DOM element. Be aware to pass empty value on the 'choose' option.

<b>Example</b>

```javascript
<Validation.Select name='city' validations={[{rule: 'isRequired'}]}>
    <option value=''>Choose your City</option>
    <option value='Kyiv'>Kyiv</option>
    <option value='London'>London</option>
</Validation.Select>
```

<h3>Button component</h3>

Button is connected to form via validations. It's disabled when invalid input occurs and if ```blocking='button'``` prop passed and there is some empty ```blocking='input'``` presents.

<b>Example</b>

```javascript
<Validation.Button type='submit' blocking='button' />
```

# Components API

###Form component has an ```forceValidate``` method.

```ref.forceValidate([,showErrors])``` - returns object with name keys and boolean valid values

```showErrors``` - boolean flag to show errors.

<b>Example</b>

```javascript
var Subscribe = React.createClass({
    onSubmit: function(event) {
        event.preventDefault();

        console.log(this.refs.form.forceValidate(true));
    },

    render: function() {
        return (
            <Validation.Form onSubmit={this.onSubmit} ref='form'>
                <h2>Subscription form</h2>
                <label>
                    Name
                    <Validation.Input placeholder='' name='firstname' validations={[
                        {
                            rule: 'isRequired'
                        },
                        {
                            rule: 'isAlpha'
                        }
                    ]} />
                </label>
                <label>
                    Email
                    <Validation.Input placeholder='' name='email' validations={[
                        {
                            rule: 'isRequired'
                        },
                        {
                            rule: 'isEmail'
                        }
                    ]} />
                </label>
                <label>
                    Send me all news
                    <input type='checkbox' name='sendAll' value='1'/>
                </label>
                <br/>
                <button type='submit' value='subscribe'>Subscribe</button>
            </Validation.Form>
        );
    }
});
```

###Controlled components (Input, Select) has ```setValue```, ```showError``` and ```hideError```, ```getElement``` methods.

<b>Example</b>

```javascript
var CitySelect = React.createClass({
    onClick: function(event) {
        event.preventDefault();

        this.refs.select.setValue('Kyiv');
    },

    render: function() {
        return (
            <Validation.Form>
                <Validation.Select value='London' ref='select' validations={[{rule: 'isRequired'}]} name='city' className='ui-select'>
                    <option value=''>Choose</option>
                    <option value='Kyiv'>Kyiv</option>
                    <option value='London'>London</option>
                </Validation.Select>
                <Validation.Button value='submit'/>
                <a href='#' onClick={this.onClick}>Set Kyiv</a>
            </Validation.Form>
        );
    }
});
```

The example above shows how to set values to Components.

```ref.setValue(value [,forceError])```

```value``` - value to set.
```forceError``` - force validate after setting.

```ref.showError([message] [,additionalClassName])```

```message``` - custom message to show in hint.
```additionalClassName``` - custom className to add to element.

```ref.hideError()``` - hides error.

```ref.getElement()``` - returns input/select/button DOM element

# Tests

```
npm test
```
