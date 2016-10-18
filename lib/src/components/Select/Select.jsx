import React from 'react';
import cx from 'classnames';
import Base from './../Base/Base';

export default class Select extends Base {
    constructor(props, context) {
        super(props, context);

        // TODO: Refactor conditions
        this.state = {
            value: props.value,
            isChanged: !!props.value,
            isUsed: true,
            isChecked: true
        };

        context.register(this);
    }

    render() {
        /* eslint-disable */
        const { validations, errorClassName, containerClassName, errorContainerClassName, className, ...rest } = this.props;
        /* eslint-enable */
        // TODO: Refactor conditions
        const isInvalid = this.state.isUsed
            && this.state.isChanged
            && !!this.context.errors[this.props.name];
        const error = isInvalid
            ? this.context.errors[this.props.name]
            : null;

        return (
            <div
              className={cx({
                  [containerClassName]: !!containerClassName,
                  [errorContainerClassName]: !!error && errorContainerClassName
              })}
            >
                <select
                  {...rest}
                  className={cx({
                      [className]: !!className,
                      [errorClassName]: !!error && errorClassName
                  })}
                  value={this.state.value}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                >
                    {this.props.children}
                </select>
                {error}
            </div>
        );
    }
}
