import React, {Component, PropTypes} from 'react';

// TODO: Rework React.element appearance
module.exports = (error, value, rules) => {
    if (error) {
        error = React.isValidElement(error) ? error : error.split && error.split(':')[0];
    }

    return (error && rules[error] && rules[error].hint(value)) || error;
};