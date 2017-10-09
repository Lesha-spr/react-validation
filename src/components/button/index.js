import React from 'react';
import PropTypes from 'prop-types';
import button from './../../hocs/button';

const Button = ({ hasErrors, ...props }) => {
  return (
    <button {...props} disabled={hasErrors} />
  );
};

Button.contextTypes = {
  hasErrors: PropTypes.bool
};

export default button(Button);
