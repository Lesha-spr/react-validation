import React, { PropTypes } from 'react';
import cx from 'classnames';

const Button = (props, context) => {
    const { errorClassName, className, ...rest } = props;
    const isDisabled = Object.keys(context.errors).length;

    return (
        <button
          className={cx({
              [className]: !!className,
              [errorClassName]: isDisabled && errorClassName
          })}
          disabled={isDisabled}
          {...rest}
        >{props.children}</button>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    errorClassName: PropTypes.string,
    className: PropTypes.string
};

Button.contextTypes = {
    errors: PropTypes.objectOf(PropTypes.any)
};

export default Button;
