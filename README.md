# react-validation

[![npm version](https://badge.fury.io/js/react-validation.svg)](https://badge.fury.io/js/react-validation) [![Build Status](https://travis-ci.org/Lesha-spr/react-validation.svg?branch=master)](https://travis-ci.org/Lesha-spr/react-validation) [![Coverage Status](https://coveralls.io/repos/github/Lesha-spr/react-validation/badge.svg?branch=master)](https://coveralls.io/github/Lesha-spr/react-validation?branch=master) [![dependencies](https://david-dm.org/Lesha-spr/react-validation.svg)](https://david-dm.org/Lesha-spr/react-validation) [![devDependencies](https://david-dm.org/Lesha-spr/react-validation/dev-status.svg)](https://david-dm.org/Lesha-spr/react-validation/?type=dev)

Component to provide simple form validation for React components. It uses the [Controlled Components](https://facebook.github.io/react/docs/forms.html#controlled-components) approach for validation.

It is not easy to validate forms with React. The reason is a one-way data flow style. In this case we can't affect forms from the inputs in an easy way.
React-validation provides several components which are 'connected' to the form via the input's method attached by the Form component.

### [DEMO](http://lesha-spr.github.io/react-validation/)
### [DEMO src](https://github.com/Lesha-spr/react-validation/tree/master/lib/src/gh-pages)

It is just a validation and doesn't provide any model or something similar. You can use FormData or something like [form-serialize](https://www.npmjs.com/package/form-serialize) to get form data.

##### NOTE: Always pass the ```name``` and ```validations``` props. They are required.

Additional markup is allowed inside the Validation.Form markup.

Any additional props (such as event handlers) can also be passed to components.

If you find any bug or error, please feel free to raise an issue. Pull requests are also welcome.

## Installation

``
npm install react-validation
``

## Test

``
npm run test:dev
``

## Example usage

With @2.*, react-validation is no longer dependent on the external ```validator```. You may use whatever validation strategy you want by extending the ```rules``` object.
Let's take a look at its initial state:

```javascript
export default = {};
```

That's it, just an empty object literal. We don't have any validation rules OOTB because of an extremely high number of possibilities, but it's still recommended to use a well-tested library for known reasons.

So first of all let's extend it and add some rules:

```javascript
import React from 'react';
// NOTE: Deprecated
import Validation from 'react-validation';
// From v2.10.0
// import { rules, Form, Input, Select, Textarea, Button } from 'react-validation/lib/build/validation.rc'
import validator from 'validator';

// Use Object.assign or any similar API to merge a rules
// NOTE: IE10 doesn't have Object.assign API natively. Use polyfill/babel plugin.
Object.assign(Validation.rules, {
    // Key name maps the rule
    required: {
        // Function to validate value
        // NOTE: value might be a number -> force to string
        rule: value => {
            return value.toString().trim();
        },
        // Function to return hint
        // You may use current value to inject it in some way to the hint
        hint: value => {
            return <span className='form-error is-visible'>Required</span>
        }
    },
    email: {
        // Example usage with external 'validator'
        rule: value => {
            return validator.isEmail(value);
        },
        hint: value => {
            return <span className='form-error is-visible'>{value} isnt an Email.</span>
        }
    },
    // This example shows a way to handle common task - compare two fields for equality
    password: {
        // rule function can accept argument:
        // components - components registered to Form mapped by name
        rule: (value, components) => {
            const password = components.password.state;
            const passwordConfirm = components.passwordConfirm.state;
            const isBothUsed = password
                && passwordConfirm
                && password.isUsed
                && passwordConfirm.isUsed;
            const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

            if (!isBothUsed || !isBothChanged) {
                return true;
            }

            return password.value === passwordConfirm.value;
        },
        hint: () => <span className="form-error is-visible">Passwords should be equal.</span>
    },
    // Define API rule to show hint after API error response
    api: {
        // We don't need the rule here because we will call the 'showError' method by hand on API error
        hint: value => (
            <button
                className="form-error is-visible"
            >
                API Error on "{value}" value. Focus to hide.
            </button>
        )
    }
});
```

Now we've added ```required``` and ```email``` to our rules with provided hints. This might be separated in a file where all the rules are registered.

That's it. We can now use it in our React components:

```javascript
import Validation from 'react-validation';
import React, {Component, PropTypes} from 'react';

export default class Registration extends Component {
    render() {
        return <Validation.components.Form>
            <h3>Registration</h3>
            <div>
                <label>
                    Email*
                    <Validation.components.Input value='email@email.com' name='email' validations={['required', 'email']}/>
                </label>
            </div>
            <div>
                <label>
                    Password*
                    <Validation.components.Input type='password' value='' name='password' validations={['required']}/>
                </label>
            </div>
            <div>
                <Validation.components.Button>Submit</Validation.components.Button>
            </div>
        </Validation.components.Form>;
    }
}
```

Note the ```validations``` prop. It's an array of strings that maps to the rules keys we've extended.

## Components and props

```react-validation``` provides a ```components``` object that contains ```Form```, ```Input```, ```Select```, ```Textarea``` and ```Button``` components.
All of them are just custom wrappers around the native components. They can accept any valid attributes and a few extra:

1. ```containerClassName``` - ```Input```, ```Select``` and ```Textarea```: `react-validation` wraps the native components with an extra block. This prop adds a ```className``` to the wrapper.
2. ```errorContainerClassName```: wrapper's error modifier className.
3. ```validations``` - ```Input```, ```Select``` and ```Textarea```: accepts an array of validations strings that refers to the rules object's keys.
4. ```errorClassName``` - ```Input```, ```Select```, ```Button``` and ```Textarea```: adds the passed value to ```className``` on error occurrences.

##### NOTE: Always provide a ```name``` prop to ```Input```, ```Select``` and ```Textarea```. Always pass the ```validations``` prop to ```Input```, ```Select``` and ```Textarea```.

### Form component

```
Validation.components.Form
```

The most important component, which provides the heart of react-validation. It basically mixes the binding between the form itself and child react-validation components via ```context```.
Any valid props can easily be passed to ```Form```, such ```onSubmit``` and ```method```.

```Form``` provides four public methods:

1. ```validate(name)``` - validates input with the passed name. The difference between this method and default validation is that ```validate``` marks the input as ```isUsed``` and ```isChanged```. ```name``` - name of the corresponding component.

2. ```showError(name [,hint])``` - helps to handle async API errors. ```hint``` - optional hint to show. Can be string (error key, ex 'required') or function which returns hint (jsx).

3. ```hideError(name)``` - hides a corresponding component's error.

4. ```validateAll()``` - validates all react-validation components. Returns a map (key: field name prop, value: `<Array>` non passed validation rules) of invalid fields.


```javascript
export default class Comment extends Component {
    handleSubmit = (event) => {
        event.preventDefault();

        // Emulate async API call
        setTimeout(() => {
            // NOTE: 'api' should be defined on 'extend' step
            this.form.showError('username', 'api');
        }, 1000);
    };

    removeApiError = () => {
        this.form.hideError('username');
    };

    render() {
        return <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
            <div className="row">
                <div className="small-12 columns">
                    <h3>Leave a comment</h3>
                </div>
            </div>
            <div className="row">
                <div className="small-12 medium-4 columns">
                    <label>
                        <Validation.components.Input
                          onFocus={this.removeApiError}
                          placeholder="username"
                          type="text"
                          errorClassName="is-invalid-input"
                          containerClassName=""
                          value="Username"
                          name="username"
                          validations={['required', 'alpha']}
                        />
                    </label>
                </div>
                <div className="small-12 medium-8 columns">
                    <label>
                        <Validation.components.Textarea
                          placeholder="Leave your comment..."
                          errorClassName="is-invalid-input"
                          containerClassName=""
                          value="Comment"
                          name="comment"
                          validations={['required']}
                        />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="small-12 medium-6 columns">
                    <Validation.components.Button className="button">Submit</Validation.components.Button>
                </div>
            </div>
        </Validation.components.Form>
    }
}
```

### Input component

```
Validation.components.Input
```

A wrapper around the native ```input```. It accepts a ```validations``` prop - an array of strings that refers to rules object keys.

```javascript
<Validation.components.Input name='firstname' validations={['alpha', 'lt8']}/>
```

##### NOTE: For types ```radio``` and ```checkbox```, react-validation will drop the ```value``` to an empty string when it's not checked. This is to avoid validation of non-checked inputs.

`react-validation` will break with the first listed rule, if more than one rule is broken. In the example above (lt8 - value length less than 8), for ```really long value with d1g1t``` input value, the ```alpha``` rule will break validation first. We can control it by ordering rules within the ```validations``` array.

### Textarea component

```
Validation.components.Teaxtarea
```

A wrapper around the native ```textarea```. Like ```Input```, it accepts a ```validations``` prop. Nothing special here:

```javascript
<Validation.components.Textarea name='comment' value='' validations={['required']}/>
```

### Select component

```
Validation.components.Select
```

A wrapper around the native ```select```. Like ```Input```, it accepts a ```validations``` prop. Nothing special here:

```javascript
<Validation.components.Select name='city' value='' validations={['required']}>
    <option value=''>Choose your city</option>
    <option value='1'>London</option>
    <option value='2'>Kyiv</option>
    <option value='3'>New York</option>
</Validation.components.Select>
```

### Button component

```
Validation.components.Button
```

A wrapper around the native ```button```. React-validation disables (adds ```disabled``` prop) the button on error occurrences. This behavior could be suppressed by passing the ```disabled``` prop directly to a component.

## Migration from 1.*

#### extendErrors API
```extendErrors``` no longer exists. Replace it with the new approach of validation rules registration. ```hint``` appearance is now fully controlled:

```javascript
Object.assign(Validation.rules, {
    required: {
        rule: value => {
            return value.trim();
        },
        hint: value => {
            return <span className='form-error is-visible'>Required</span>
        }
    }
});
```

#### Defaults
React-validation no longer has any defaults. This is TBD but for a 2.0.0 please provide ```errorClassName``` and ```containerClassName``` directly to the validation components.

#### Validations
```validations``` prop now accepts an array of strings instead of objects. It's made to be more simple and reduce ```render``` code.

Components API moved to Form API. ```forceValidate``` method no longer exist.
