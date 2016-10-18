import React from 'react';
import cx from 'classnames';
import Base from './../Base/Base';

export default class Input extends Base {
    constructor(props, context) {
        super(props, context);

        const isCheckbox = !!(props.type === 'checkbox' || props.type === 'radio');
        const checkboxValue = props.checked ? props.value : '';

        // TODO: Refactor conditions
        this.state = {
            value: isCheckbox ? checkboxValue : props.value,
            isChanged: isCheckbox ? props.checked : !!props.value,
            isCheckbox,
            isUsed: isCheckbox,
            isChecked: isCheckbox ? !!props.checked : true
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
        const error = isInvalid ? this.context.errors[this.props.name] : null;
        const value = this.state.isCheckbox ? this.props.value : this.state.value;

        return (
            <div
              className={cx({
                  [containerClassName]: !!containerClassName,
                  [errorContainerClassName]: !!error && errorContainerClassName
              })}
            >
                <input
                  {...rest}
                  className={cx({
                      [className]: !!className,
                      [errorClassName]: !!error && errorClassName
                  })}
                  checked={this.state.isChecked}
                  onChange={this.onChange}
                  onBlur={this.onBlur} value={value}
                />
                {error}
            </div>
        );
    }
}
