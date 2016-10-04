import pullValue from './pull-value.js';
import pullError from './pull-error.js';
import pullHint from './pull-hint.js';
import pullClassName from './pull-class-name.js';
import rules from './../rules.js';

module.exports = (props, context) => {
    let data = {};
    let {
        validations,
        errorClassName,
        containerClassName,
        ...rest} = props;

    data.value = pullValue(props, context);
    data.error = pullError(props, context);
    data.hint = pullHint(data.error, data.value, rules);
    data.className = pullClassName(data.error, props);
    data.props = rest;

    return data;
};