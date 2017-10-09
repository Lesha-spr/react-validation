import React, { Component } from 'react';
import PropTypes from 'prop-types';
import form from '../../hocs/form';
import Input from './../input';

class Form extends Component {
  componentDidMount() {
    this.props.showError(this.refs.asd, <h1>Err!</h1>);
  }

  render() {
    const { getValues, validate, showError, hideError, ...props } = this.props;

    return (
      <form {...props} />
    )
  }
}

export default form(Form);
