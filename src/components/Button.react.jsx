import React, {Component, PropTypes} from 'react';

class Button extends Component {
    render() {
        let {errors, errorClassName, states, ...props} = this.props;
        let isDisabled = Object.keys(errors).length;
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

module.exports = Button;