import React from 'react';
import validator from 'validator';
import Validation from './../validation';

Object.assign(Validation.rules, {
    required: {
        rule: value => value.toString().trim(),
        hint: () => <span className="form-error is-visible">Required</span>
    },

    email: {
        rule: value => validator.isEmail(value),
        hint: value => <span className="form-error is-visible">{value} is not an Email.</span>
    },

    alpha: {
        rule: value => validator.isAlpha(value),
        hint: () => (
            <span className="form-error is-visible">
                String should contain only letters (a-zA-Z).
            </span>
        )
    },

    password: {
        rule: (value, component, form) => {
            const password = form.state.states.password;
            const passwordConfirm = form.state.states.passwordConfirm;
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
    }
});
