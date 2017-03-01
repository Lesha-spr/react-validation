import React, { Component } from 'react';
import selectFactory from './../../factories/selectFactory';

class Select extends Component {
    render() {
        const { containerClassName, hint, ...rest } = this.props;

        return (
            <div className={containerClassName}>
                <select
                  {...rest}
                  className={this.props.className}
                  onChange={this.props.onChange}
                  onBlur={this.props.onBlur}
                  value={this.props.value}
                >
                    {this.props.children}
                </select>
                {hint}
            </div>
        );
    }
}

export default selectFactory(Select);
