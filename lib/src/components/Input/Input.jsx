import React, { Component } from 'react';
import inputFactory from './../../factories/inputFactory';

class Input extends Component {
    render() {
        const { containerClassName, hint, ...rest } = this.props;

        return (
            <div className={containerClassName}>
                <input
                  {...rest}
                  className={this.props.className}
                  onChange={this.props.onChange}
                  onBlur={this.props.onBlur}
                  value={this.props.value}
                />
                {hint}
            </div>
        );
    }
}

export default inputFactory(Input);
