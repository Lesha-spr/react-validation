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
    Form: require('./components/form.jsx'),
    Input: require('./components/input.jsx'),
    Select: require('./components/select.jsx'),
    Button: require('./components/button.jsx'),

    /**
     * Public method to extend default error object
     * @param obj {Object}
     */
    extendErrors: function(obj) {
        objectAssign(errors, obj);

        Object.keys(errors).forEach(function(key) {
            if (errors[key].rule && isFunction(errors[key].rule)) {
                validator[key] = validator[key] || errors[key].rule;
            }
        });
    }
};

module.exports = Validation;