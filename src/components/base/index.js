import { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

export default class Base extends Component {
  static contextTypes = {
    _register: PropTypes.func.isRequired,
    _unregister: PropTypes.func.isRequired,
    _setProps: PropTypes.func.isRequired,
    _handleChange: PropTypes.func.isRequired,
    _handleBlur: PropTypes.func.isRequired,
    _getProps: PropTypes.func.isRequired
  };

  static propTypes = {
    validations: PropTypes.arrayOf(PropTypes.func)
  };

  static defaultProps = {
    validations: []
  };

  id = uuidv4();

  componentDidMount() {
    this.context._register(this, this.id);
  }

  componentWillUnmount() {
    this.context._unregister(this, this.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.context._setProps(nextProps, this.id);
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextContext !== this.context;
  }

  handleChange = (event) => {
    event.persist();

    this.context._handleChange(event, this.id);
  };

  handleBlur = (event) => {
    event.persist();

    this.context._handleBlur(event, this.id);
  };

  render() {
    return null;
  }
}
