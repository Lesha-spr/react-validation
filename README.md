# react-validation

[![npm version](https://badge.fury.io/js/react-validation.svg)](https://badge.fury.io/js/react-validation) [![Build Status](https://travis-ci.org/Lesha-spr/react-validation.svg?branch=master)](https://travis-ci.org/Lesha-spr/react-validation) [![Coverage Status](https://coveralls.io/repos/github/Lesha-spr/react-validation/badge.svg?branch=master)](https://coveralls.io/github/Lesha-spr/react-validation?branch=master) [![dependencies](https://david-dm.org/Lesha-spr/react-validation.svg)](https://david-dm.org/Lesha-spr/react-validation) [![devDependencies](https://david-dm.org/Lesha-spr/react-validation/dev-status.svg)](https://david-dm.org/Lesha-spr/react-validation/?type=dev)

Component to provide simple form validation for React components. It uses the [Controlled Components](https://facebook.github.io/react/docs/forms.html#controlled-components) approach for validation.

It is not easy to validate forms with React. The reason is a one-way data flow style. In this case we can't affect forms from the inputs in an easy way.
React-validation provides several components which are 'connected' to the form via the input's method attached by the Form component.

### [DEMO](http://lesha-spr.github.io/react-validation/)
### [DEMO src](https://github.com/Lesha-spr/react-validation/tree/master/lib/src/gh-pages)

It is just a validation and doesn't provide any model or something similar. You can use FormData or something like [form-serialize](https://www.npmjs.com/package/form-serialize) to get form data.

##### NOTE: Always pass the ```name``` props. It's required.

Any additional props (such as event handlers) can also be passed to components.

If you find any bug or error, please feel free to raise an issue. Pull requests are also welcome.

## Installation

``
npm install react-validation
``

## Test

``
npm test
``

## Example usage

First of all let's define some validations:

```javascript
import validator from 'validator';
const required = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return 'require';
  }
};

const email = (value) => {
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`
  }
};

const lt = (value, props) => {
  // get the maxLength from component's props
  if (!value.toString().trim().length > props.maxLength) {
    // Return jsx
    return <span className="error">The value exceeded {props.maxLength} symbols.</span>
  }
};

const password = (value, props, components) => {
  // NOTE: Tricky place. The 'value' argument is always current component's value.
  // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
  // But if we're changing 'confirm' component - the condition will always be true
  // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
  if (value !== components['confirm'][0].value) { // components['password'][0].value !== components['confirm'][0].value
    // 'confirm' - name of input
    // components['confirm'] - array of same-name components because of checkboxes and radios
    return <span className="error">Passwords are not equal.</span>
  }
};
```

That's it. We can now use it in our React components:

```javascript
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return <Form>
            <h3>Login</h3>
            <div>
                <label>
                    Email*
                    <Input value='email@email.com' name='email' validations={[required, email]}/>
                </label>
            </div>
            <div>
                <label>
                    Password*
                    <Input type='password' name='password' validations={[required]}/>
                </label>
            </div>
            <div>
                <Button>Submit</Button>
            </div>
        </Form>;
    }
}
```

Note the ```validations``` prop. It's an array of functions which was defined earlier.

## Components and props

```react-validation``` provides a ```components``` with pre-defined structure and ```hoc```s to define it self. The components are: ```Form```, ```Input```, ```Select```, ```Textarea``` and ```Button```.
All of them are just custom wrappers around the native components. They can accept any valid attributes and a few extra:
                                                                   
1. ```isUsed``` - ```Input```, ```Select``` and ```Textarea```: says to react-validation to mark component as it was blured.
2. ```isChanged``` - ```Input```, ```Select``` and ```Textarea```: says to react-validation to mark component as it was changed.
3. ```validations``` - ```Input```, ```Select``` and ```Textarea```: accepts an array of validations functions.

##### NOTE: Always provide a ```name``` prop to ```Input```, ```Select``` and ```Textarea```.

### Form component

```
Form
```

The most important component, which provides the heart of react-validation. It basically mixes the binding between the form itself and child react-validation components via ```context```.
Any valid props can easily be passed to ```Form```, such ```onSubmit``` and ```method```.

```Form``` provides four public methods:

1. ```validate(name)``` - validates control(s) with the passed name. The difference between this method and default validation is that ```validate``` marks the input as ```isUsed``` and ```isChanged```. ```name``` - name of the corresponding component(s).

2. ```validateAll()``` - validates all controls by marking all controls as ```isUsed``` and ```isChanged```. 

3. ```showError(component [,error])``` - helps to handle async API errors. ```component``` - ref to the React Component to validate. ```error``` - error to show. Can be string or jsx.

4. ```hideError(component)``` - hides a corresponding component's error. ```component``` - ref to the React Component.


```javascript
export default class Comment extends Component {
    handleSubmit = (event) => {
        event.preventDefault();

        // Emulate async API call
        setTimeout(() => {
            this.form.showError(this.userInput, <span>API error</span>);
        }, 1000);
    };

    removeApiError = () => {
        this.form.hideError(this.userInput);
    };

    render() {
        return <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
            <div className="row">
                <div className="small-12 columns">
                    <h3>Leave a comment</h3>
                </div>
            </div>
            <div className="row">
                <div className="small-12 medium-4 columns">
                    <label>
                        <Input
                          onFocus={this.removeApiError}
                          ref={c => { this.userInput = c }}
                          placeholder="username"
                          type="text"
                          value="Username"
                          name="username"
                          validations={[required]}
                        />
                    </label>
                </div>
                <div className="small-12 medium-8 columns">
                    <label>
                        <Textarea
                          placeholder="Leave your comment..."
                          value="Comment"
                          name="comment"
                          validations={[required]}
                        />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="small-12 medium-6 columns">
                    <Button className="button">Submit</Button>
                </div>
            </div>
        </Form>
    }
}
```

### HOCs

react-validations also provides HOC (High Order Component) for each component. That made to have an ability to define own render logic, use mixed props, etc.
```javascript
import { form, control, button } from 'react-validation';

// Define own Form component
const Form = ({ getValues, validate, validateAll, showError, hideError, children, ...props }) => ( // destruct non-valid props
  <form {...props}>{children}</form>
);

// Define own Input component
const Input = ({ error, isChanged, isUsed, ...props }) => (
  <div>
    <input {...props} />
    {isChanged && isUsed && error}
  </div>
);

// Define own Button component
const Button = ({ hasErrors, ...props }) => {
  return (
    <button {...props} disabled={hasErrors} />
  );
};

// Now call HOCs on components
const MyValidationForm = form(Form);
const MyValidationInput = control(Input);
const MyValidationButton = button(Button);
```

That's it. Now MyValidationForm can be used with all given API.

#### props
##### form:
```getValues``` - function which returns object with keys by 'name' prop and string values. NOTE: same-name controls will be returned as array of strings.
```validate(name)``` - function to validate controls by 'name' argument. It marks control as 'isUsed' and 'isBlured'.
```showError(component, [,error])``` - function to force showing error. component - ref to the control, error - string/jsx.
```hideError(component)``` - function to hide error on passed control ref.

##### control:
```error``` - string or jsx. Note that error will be defined anytime the control has invalid value. Use ```isUsed``` and ```isChanged``` to apply rendering logic.
```isChanged``` - boolean. Indicates the control was ```change```d.
```isUsed``` - boolean. Indicates the control was ```blur```d.

##### button:
```hasErrors``` - boolean. Indicates the whole form contain at least one invalid control.

### Input component

```
Input
```

A wrapper around the native ```input```. It accepts a ```validations``` prop - an array of functions.

```javascript
<Input name='firstname' validations={[lt8, alpha]}/>
```

`react-validation` will break with the first listed rule, if more than one rule is broken. In the example above (lt8 - value length less than 8), for ```really long value with d1g1t``` input value, the ```alpha``` rule will break validation first. We can control it by ordering rules within the ```validations``` array.


### Textarea component

```
Textarea
```

A wrapper around the native ```textarea```. Like ```Input```, it accepts a ```validations``` prop. Nothing special here:

```javascript
<Textarea name='comment' validations={[required]}/>
```

### Select component

```
Select
```

A wrapper around the native ```select```. Like ```Input```, it accepts a ```validations``` prop. Nothing special here:

```javascript
<Select name='city' value='' validations={[required]}>
    <option value=''>Choose your city</option>
    <option value='1'>London</option>
    <option value='2'>Kyiv</option>
    <option value='3'>New York</option>
</Select>
```

### Button component

```
Button
```

A wrapper around the native ```button```. React-validation disables (adds ```disabled``` prop) the button on error occurrences.