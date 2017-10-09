import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function button(WrappedComponent) {
  return class extends Component {
    static contextTypes = {
      _errors: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string]))
    };

    static displayName = `Button(${WrappedComponent.name})`;

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return nextContext._errors !== this.context._errors;
    }

    render() {
      const hasErrors = !!Object.keys(this.context._errors).length;

      return (
        <WrappedComponent {...this.props} hasErrors={hasErrors} />
      );
    }
  };
}
