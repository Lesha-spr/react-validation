import React from 'react';
import Base from '../../components/base/index';

export default function control (WrappedComponent) {
  return class extends Base {
    static displayName = `Control(${WrappedComponent.name})`;

    render() {
      const props = this.context._getProps(this.id);

      if (!props) {
        return null;
      }
      
      const { onChange, onBlur } = props

      return <WrappedComponent {...props} onChange={(e) => {
        this.handleChange(e)
        onChange && onChange(e)
      }} onBlur={(e) => {
        this.handleBlur(e)
        onBlur && onBlur(e)
      }} />
    }
  }
}
