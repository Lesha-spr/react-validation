import React, {Component, PropTypes} from 'react';

class Button extends Component {
    render() {
        let {errorClassName, ...props} = this.props;
        let isDisabled = Object.keys(this.context.errors).length;
        let className = `${this.props.className ? this.props.className : ''}${isDisabled && errorClassName ? ' ' + errorClassName : ''}`;

        return <button
            disabled={isDisabled}
            {...props}
            className={className || null}
            >
            {this.props.children}
        </button>
    }
}

Button.contextTypes = {
    errors: PropTypes.object
};

module.exports = Button;