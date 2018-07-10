import React from 'react';
import PropTypes from 'prop-types';
import control from '../../hocs/control';

const Input = ({ error, isChanged, isUsed, wrapperClassName, labelComponent, ...props }) => (
  <div className={wrapperClassName}>
    <input {...props} {...( isChanged && isUsed && error ? {
      className: `is-invalid-input ${props.className}`
    } : { className: props.className } )} />
    {isChanged && isUsed && error}
    {labelComponent}
  </div>
);

Input.propTypes = {
  labelComponent: PropTypes.node,
  wrapperClassName: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default control(Input);
