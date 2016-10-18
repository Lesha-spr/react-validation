import React from 'react';
import cx from 'classnames';
import Base from './../Base/Base';

export default class Textarea extends Base {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: props.value,
            isChanged: !!props.value,
            isUsed: false,
            isChecked: true
        };

        context.register(this);
    }

    render() {
        /* eslint-disable */
        const { validations, errorClassName, containerClassName, errorContainerClassName, className, ...rest } = this.props;
        /* eslint-enable */
        // TODO: Refactor conditions
        const isInvalid = this.state.isUsed &&
            this.state.isChanged &&
            !!this.context.errors[this.props.name];
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
                <textarea
                  {...rest}
                  className={cx({
                      [className]: !!className,
                      [errorClassName]: !!error && errorClassName
                  })}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  value={this.state.value}
                />
                {error}
            </div>
        );
    }
}
