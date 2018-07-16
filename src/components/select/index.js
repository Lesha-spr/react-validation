import React from 'react';
import PropTypes from 'prop-types';
import control from '../../hocs/control';

const Select = ({ error, isChanged, isUsed, wrapperClassName, labelComponent, ...props }) => (
  <div className={wrapperClassName}>
    {labelComponent}
    <select {...props} />
    {isChanged && isUsed && error}
  </div>
);

Select.propTypes = {
  labelComponent: PropTypes.node,
  wrapperClassName: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default control(Select);
