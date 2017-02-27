import React, { PropTypes } from 'react';
import { makeCustomTextarea } from './../CustomTextarea/CustomTextarea';

export default makeCustomTextarea(React.createClass({
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
        )
    }
}));
