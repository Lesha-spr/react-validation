import React, { Component, PropTypes } from 'react';
import Button from './../Button/Button';
import Input from './../Input/Input';
import Select from './../Select/Select';
import Textarea from './../Textarea/Textarea';
import rules from './../../rules';

export default class Form extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static childContextTypes = {
        register: PropTypes.func.isRequired,
        unregister: PropTypes.func.isRequired,
        validateState: PropTypes.func.isRequired,
        components: PropTypes.objectOf(PropTypes.oneOfType([
            PropTypes.instanceOf(Button),
            PropTypes.instanceOf(Input),
            PropTypes.instanceOf(Select),
            PropTypes.instanceOf(Textarea)
        ])),
        errors: PropTypes.objectOf(PropTypes.array)
    };

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
            components: this.components,
            errors: this.state.errors
        };
    }

    componentDidMount() {
        this.validateState();
    }

    getErrors = () => Object.keys(this.components).reduce((prev, name) => {
        const component = this.components[name];
        const validations = component.props.validations;
        const length = validations.length;

        for (let i = 0; i < length; i += 1) {
            if (!rules[validations[i]].rule(component.state.value, this.components)) {
                /* eslint-disable */
                prev[name] = prev[name] || [];
                prev[name].push(validations[i]);
                /* eslint-enable */
            }
        }

        return prev;
    }, {});

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
        const errors = this.getErrors();

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

        return this.getErrors();
    }

    showError = (name, error) => {
        this.components[name].setState({
            isUsed: true,
            isChanged: true
        }, () => {
            this.setState({
                errors: {
                    ...this.state.errors,
                    [name]: [error]
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
