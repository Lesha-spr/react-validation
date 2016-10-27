import React from 'react';
import validator from 'validator';
import Validation from './../validation';

Object.assign(Validation.rules, {
    api: {
        hint: value => (
            <button
                className="form-error is-visible"
            >
                API Error on "{value}" value. Focus to hide.
            </button>
        )
    },

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
    }
});
