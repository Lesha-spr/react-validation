import { PropTypes, createElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import cx from 'classnames';
import rules from './../rules';
import Base from './../components/Base/Base';

export default function inputFactory(WrappedComponent) {
    class CustomInput extends Base {
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
            const {
                /* eslint-disable */
                validations,
                /* eslint-enable */
                errorClassName,
                containerClassName,
                errorContainerClassName,
                className,
                value,
                onChange,
                onBlur,
                ...rest } = this.props;
            // TODO: Refactor conditions
            const isInvalid = this.state.isUsed
                && this.state.isChanged
                && !!this.context.errors[this.props.name];
            const changedValue = this.state.isCheckbox ? this.props.value : this.state.value;
            const error = isInvalid && this.context.errors[this.props.name][0];
            let hint = null;

            if (isInvalid) {
                hint = typeof error === 'function' ? error(changedValue, this.context.components) : rules[error].hint(changedValue, this.context.components);
            }

            const wrappedProps = {
                containerClassName: cx({
                    [containerClassName]: !!containerClassName,
                    [errorContainerClassName]: !!error && errorContainerClassName
                }),
                className: cx({
                    [className]: !!className,
                    [errorClassName]: !!error && errorClassName
                }),
                checked: this.state.isChecked,
                onChange: this.onChange,
                onBlur: this.onBlur,
                type: this.props.type || 'text',
                value: changedValue,
                hint,
                ...rest
            };

            return createElement(WrappedComponent, wrappedProps);
        }
    }

    CustomInput.WrappedComponent = WrappedComponent;

    return hoistStatics(CustomInput, WrappedComponent);
}
