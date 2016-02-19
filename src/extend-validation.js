module.exports = function() {
    var Validation = require('./../build');

    Validation.extendErrors({
        isRequired: {
            message: 'required',
            rule: function(value) {
                return Boolean(Validation.validator.trim(value));
            }
        },
        isEmail: {
            className: 'ui-input_state_email-pattern-failed',
            message: 'should be email'
        },

        isAlpha: {
            message: 'only letters are valid'
        },
        isEqualToNamedInput: {
            message: 'should be equal',
            rule: function(value, comparedValue) {
                return value === comparedValue;
            }
        }
    });
};