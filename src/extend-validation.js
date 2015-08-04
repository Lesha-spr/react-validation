module.exports = function() {
    var Validation = require('./../build');
    var validator = require('validator');

    Validation.extendErrors({
        isRequired: {
            message: 'required',
            rule: function(value) {
                return Boolean(validator.trim(value));
            }
        },
        isEmail: {
            className: 'ui-input_state_email-pattern-failed',
            message: 'should be email'
        },

        isAlpha: {
            message: 'only letters are valid'
        }
    });
};