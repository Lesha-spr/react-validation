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

      return <WrappedComponent {...props} onChange={this.handleChange} onBlur={this.handleBlur} />
    }
  }
}
