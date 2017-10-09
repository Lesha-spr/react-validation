import React from 'react';
import PropTypes from 'prop-types';
import control from '../../hocs/control';

const Input = ({ error, isChanged, isUsed, ...props }) => (
  <div>
    <input {...props} {...( isChanged && isUsed && error ? {
      className: `is-invalid-input ${props.className}`
    } : { className: props.className } )} />
    {isChanged && isUsed && error}
  </div>
);

Input.propTypes = {
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default control(Input);
