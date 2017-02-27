import React, { PropTypes, Component } from 'react';
import { makeCustomTextarea } from './../CustomTextarea/CustomTextarea';

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

export default makeCustomTextarea(Textarea);
