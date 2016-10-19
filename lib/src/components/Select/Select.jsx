import React, { PropTypes } from 'react';
import cx from 'classnames';
import Base from './../Base/Base';

export default class Select extends Base {
    static propTypes = {
        validations: PropTypes.arrayOf(PropTypes.string).isRequired,
        errorClassName: PropTypes.string,
        containerClassName: PropTypes.string,
        errorContainerClassName: PropTypes.string
    };

    static contextTypes = {
        register: PropTypes.func.isRequired,
        unregister: PropTypes.func.isRequired,
        validateState: PropTypes.func.isRequired,
        errors: PropTypes.objectOf(PropTypes.any)
    };

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
        const {
            /* eslint-disable */
            validations,
            /* eslint-enable */
            errorClassName,
            containerClassName,
            errorContainerClassName,
            className,
            ...rest } = this.props;
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
