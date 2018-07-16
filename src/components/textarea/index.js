import React from 'react';
import PropTypes from 'prop-types';
import control from '../../hocs/control';

const Textarea = ({ error, isChanged, isUsed, wrapperClassName, labelComponent, ...props }) => (
  <div className={wrapperClassName}>
    {labelComponent}
    <textarea {...props} />
    {isChanged && isUsed && error}
  </div>
);

Textarea.propTypes = {
  labelComponent: PropTypes.node,
  wrapperClassName: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default control(Textarea);
