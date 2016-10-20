import React, { Component, PropTypes } from 'react';
import rules from './../../rules';

class Form extends Component {
    constructor(props) {
        super(props);

        this.components = {};

        this.state = {
            errors: {}
        };
    }

    getChildContext() {
        return {
            register: this.register,
            unregister: this.unregister,
            validateState: this.validateState,
            errors: this.state.errors
        };
    }

    componentDidMount() {
        this.validateState();
    }

    register = (component) => {
        this.components[component.props.name] = component;
    };

    unregister = (component) => {
        const errors = Object.assign({}, this.state.errors);

        delete this.components[component.props.name];
        delete errors[component.props.name];

        this.setState({ errors });
    };

    validateState = () => {
        const errors = {};

        Object.keys(this.components).reduce((prev, name) => {
            const component = this.components[name];
            const validations = component.props.validations;
            const length = validations.length;

            for (let i = 0; i < length; i += 1) {
                if (!rules[validations[i]].rule(component.state.value, this.components)) {
                    /* eslint-disable */
                    prev[name] = rules[validations[i]].hint(component.state.value, this.components);
                    /* eslint-enable */

                    break;
                }
            }

            return prev;
        }, errors);

        this.setState({ errors });
    };

    validate = (name) => {
        this.components[name].setState({
            isUsed: true,
            isChanged: true
        }, this.validateState);
    };

    validateAll() {
        Object.keys(this.components).forEach((name) => {
            this.components[name].setState({
                isUsed: true,
                isChanged: true
            });
        });
    }

    showError = (name, hint) => {
        this.components[name].setState({
            isUsed: true,
            isChanged: true
        }, () => {
            this.setState({
                errors: {
                    ...this.state.errors,
                    [name]: hint(this.components[name].state.value)
                }
            });
        });
    };

    hideError = (name) => {
        const errors = Object.assign({}, this.state.errors);

        delete errors[name];

        this.setState({ errors });
    };

    render() {
        return (
            <form {...this.props}>
                {this.props.children}
            </form>
        );
    }
}

Form.propTypes = {
    children: PropTypes.node
};

Form.childContextTypes = {
    register: PropTypes.func.isRequired,
    unregister: PropTypes.func.isRequired,
    validateState: PropTypes.func.isRequired,
    errors: PropTypes.objectOf(PropTypes.any)
};

export default Form;
