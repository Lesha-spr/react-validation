import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';

const _isCheckable = (component) => (component.props.type === 'radio' || component.props.type === 'checkbox');

export default function form (WrappedComponent) {
  return class extends PureComponent {
    static displayName = `Form(${WrappedComponent.name})`;

    static propTypes = {};

    static childContextTypes = {
      _register: PropTypes.func.isRequired,
      _unregister: PropTypes.func.isRequired,
      _setProps: PropTypes.func.isRequired,
      _handleChange: PropTypes.func.isRequired,
      _handleBlur: PropTypes.func.isRequired,
      _getProps: PropTypes.func.isRequired,
      _errors: PropTypes.array
    };

    constructor(props, context) {
      super(props, context);

      this.state = {
        byName: {},
        byId: {}
      };
    }

    getChildContext() {
      return {
        _register: this._register,
        _unregister: this._unregister,
        _setProps: this._setProps,
        _handleChange: this._handleChange,
        _handleBlur: this._handleBlur,
        _getProps: this._getProps,
        _errors: Object.keys(this.state.byId).filter(id => this.state.byId[id].error)
      };
    }

    _register = (component, id) => {
      this.setState(state => ({
        byName: {
          ...state.byName,
          [component.props.name]: [...(state.byName[component.props.name] || []), id]
        },
        byId: {
          ...state.byId,
          [id]: {
            ...component.props,
            isCheckable: _isCheckable(component),
            value: component.props.value || '',
            ...(_isCheckable(component) ? { checked: !!component.props.checked } : {})
          }
        }
      }), this._setErrors);
    };

    _unregister = (component, id) => {
      const byComponentName = [...this.state.byName[component.props.name]];

      byComponentName.splice(byComponentName.indexOf(id), 1);

      const byName = byComponentName.length ? {
        ...this.state.byName,
        ...{ [component.props.name]: byComponentName }
      } : omit(this.state.byName, component.props.name);

      this.setState({
        byName,
        byId: omit(this.state.byId, id)
      });
    };

    _getProps = (id) => {
      if (this.state.byId[id]) {
        const { validations, isCheckable, ...props } = this.state.byId[id];

        return props;
      }
    };

    _setProps = (props, id) => {
      this.setState(state => ({
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            ...props
          }
        }
      }), this._setErrors);
    };

    _handleChange = (event, id) => {
      const isCheckable = this.state.byId[id].isCheckable;

      this.setState({
        byId: {
          ...this.state.byId,
          ...(isCheckable ? {...this.state.byName[this.state.byId[id].name].reduce((components, id) => {
            components[id] = {
              ...this.state.byId[id],
              checked: false
            };

            return components;
          }, {})} : {}),
          [id]: {
            ...this.state.byId[id],
            isChanged: true,
            value: event.target.value,
            ...( isCheckable && { checked: event.target.checked } )
          }
        }
      }, this._setErrors);
    };

    _handleBlur = (event, id) => {
      this.setState({
        byId: {
          ...this.state.byId,
          [id]: {
            ...this.state.byId[id],
            isUsed: true,
            value: event.target.value
          }
        }
      }, this._setErrors);
    };

    _setErrors = () => {
      this.setState(state => {
        return {
          byId: Object.keys(state.byId).reduce((byId, id) => {
            const validations = state.byId[id].validations;
            const props = state.byId[id];
            const components = Object.keys(state.byName).reduce((byName, name) => {
              byName[name] = state.byName[name].map(id => state.byId[id]);

              return byName;
            }, {});
            const value = props.value;

            byId[id] = {
              ...state.byId[id]
            };

            for (const validation of validations) {
              const error = validation(value, props, components);

              if (error) {
                byId[id].error = error;

                break;
              } else {
                delete byId[id].error;
              }
            }

            return byId;

          }, {})
        };
      });
    };

    getValues = () => Object.keys(this.state.byName).reduce((values, name) => {
      if (this.state.byName[name].length > 1) {
        values[name] = this.state.byName[name].map(id => this.state.byId[id].value);
      } else {
        values[name] = this.state.byId[this.state.byName[name][0]].value;
      }

      return values;
    }, {});

    validate = (name) => {
      this.setState(state => ({
        byId: {
          ...state.byId,
          ...state.byName[name].reduce((byId, id) => {
            byId[id] = {
              ...state.byId[id],
              isChanged: true,
              isUsed: true
            };

            return byId;
          }, {})
        }
      }), this._setErrors);
    };

    validateAll = () => {
      this.setState(state => ({
        byId: {
          ...state.byId,
          ...Object.keys(state.byName).reduce((byId, name) => {
            state.byName[name].reduce((components, id) => {
              byId[id] = {
                ...state.byId[id],
                isChanged: true,
                isUsed: true
              };

              return components;
            }, {});

            return byId;
          }, {})
        }
      }), this._setErrors);
    };

    showError = (component, error) => {
      if (component) {
        setTimeout(() => {
          this.setState({
            byId: {
              ...this.state.byId,
              [component.id]: {
                ...this.state.byId[component.id],
                isChanged: true,
                isUsed: true,
                error
              }
            }
          })
        }, 0);
      }
    };

    hideError = (component) => {
      this.setState(state => ({
        byId: {
          ...state.byId,
          [component.id]: {
            ...omit(state.byId[component.id], 'error'),
            isChanged: false,
            isUsed: false
          }
        }
      }));
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          validate={this.validate}
          validateAll={this.validateAll}
          getValues={this.getValues}
          showError={this.showError}
          hideError={this.hideError}
        />
      )
    }
  }
}
