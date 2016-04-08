var React = require('react');
var validator = require('validator');
var isFunction = require('lodash.isfunction');
var objectAssign = require('lodash.assign');
var errors = require('./errors');

/**
 * Validation component namespace
 * @type {Object}
 */
var Validation = {
    Form: require('./Form/Form.jsx'),
    Input: require('./Input/Input.jsx'),
    Select: require('./Select/Select.jsx'),
    Button: require('./Button/Button.jsx')
};

/**
 * Public method to extend default error object
 * @param obj {Object}
 */
Validation.extendErrors = function(obj) {
    objectAssign(errors, obj);

    Object.keys(errors).forEach(function(key) {
        if (errors[key].rule && isFunction(errors[key].rule)) {
            validator.extend(key, function(value, comparedValue) {
                return errors[key].rule(value, comparedValue);
            });
        }
    });
};

module.exports = Validation;