import React, { PropTypes } from 'react';
import cx from 'classnames';
import rules from './../../rules';
import Base from './../Base/Base';

export default class Textarea extends Base {
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
        components: PropTypes.objectOf(PropTypes.any),
        errors: PropTypes.objectOf(PropTypes.array)
    };

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
        const isInvalid = this.state.isUsed &&
            this.state.isChanged &&
            !!this.context.errors[this.props.name];
        const error = isInvalid && this.context.errors[this.props.name][0];
        let hint = null;

        if (isInvalid) {
            hint = typeof error === 'function' ? error(this.state.value, this.context.components) : rules[error].hint(this.state.value, this.context.components);
        }

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
                {hint}
            </div>
        );
    }
}
