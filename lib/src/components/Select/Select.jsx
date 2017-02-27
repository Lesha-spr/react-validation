import React, { PropTypes } from 'react';
import { makeCustomSelect } from './../CustomSelect/CustomSelect';

export default makeCustomSelect(React.createClass({
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
}));
