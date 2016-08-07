import pullValue from './pull-value.js';
import pullError from './pull-error.js';
import pullHint from './pull-hint.js';
import pullClassName from './pull-class-name.js';
import rules from './../rules.js';

module.exports = (props) => {
    let data = {};
    let {
        _register,
        _update,
        _validate,
        validations,
        states,
        errors,
        errorClassName,
        containerClassName,
        ...rest} = props;

    data.value = pullValue(props);
    data.error = pullError(props);
    data.hint = pullHint(data.error, data.value, rules);
    data.className = pullClassName(data.error, props);
    data.props = rest;

    return data;
};