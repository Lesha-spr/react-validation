import React from 'react';
import Validation from './validation.jsx';
import validator from 'validator';

Object.assign(Validation.rules, {
    required: {
        rule: value => {
            return value.toString().trim();
        },
        hint: value => {
            return <span className='form-error is-visible'>Required</span>
        }
    },
    email: {
        rule: value => {
            return validator.isEmail(value);
        },
        hint: value => {
            return <span className='form-error is-visible'>{value} isn't an Email.</span>
        }
    },
    alpha: {
        rule: value => {
            return validator.isAlpha(value);
        },
        hint: value => {
            return <span className='form-error is-visible'>String should contain only letters (a-zA-Z).</span>
        }
    },
    password: {
        rule: (value, component, form) => {
            let password = form.state.states.password;
            let passwordConfirm = form.state.states.passwordConfirm;
            let isBothUsed = password && passwordConfirm && password.isUsed && passwordConfirm.isUsed;
            let isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

            if (!isBothUsed || !isBothChanged) {
                return true;
            }

            return password.value === passwordConfirm.value;
        },
        hint: value => {
            return <span className='form-error is-visible'>Passwords should be equal.</span>
        }
    }
});