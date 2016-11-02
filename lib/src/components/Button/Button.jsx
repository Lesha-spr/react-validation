import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

export default class Button extends Component {
    static propTypes = {
        children: PropTypes.node,
        errorClassName: PropTypes.string,
        className: PropTypes.string
    };

    static contextTypes = {
        errors: PropTypes.objectOf(PropTypes.array)
    };

    render() {
        const { errorClassName, className, ...rest } = this.props;
        const isDisabled = Object.keys(this.context.errors).length;

        return (
            <button
              className={cx({
                  [className]: !!className,
                  [errorClassName]: isDisabled && errorClassName
              })}
              disabled={isDisabled}
              {...rest}
            >{this.props.children}</button>
        );
    }
}
