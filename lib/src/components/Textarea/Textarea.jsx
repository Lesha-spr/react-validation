import React, { Component } from 'react';
import textareaFactory from './../../factories/textareaFactory';

class Textarea extends Component {
    render() {
        const { containerClassName, hint, ...rest } = this.props;

        return (
            <div className={containerClassName}>
                <textarea
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

export default textareaFactory(Textarea);
