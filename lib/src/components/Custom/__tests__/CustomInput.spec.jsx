import React, { Component } from 'react';
import { shallow } from 'enzyme';
import inputFactory from './../../../factories/inputFactory';
import rules from './../../../rules';

Object.assign(rules, {
    required: {
        hint() {
            return <span className="error"/>
        }
    }
});

class MyBareCustomInput extends Component {
    render() {
        const { containerClassName, hint, ...rest } = this.props;

        return (
            <div className={containerClassName}>
                <h1>Custom input</h1>
                <label>
                    <span>Test</span>
                    <input
                      {...rest}
                      className={this.props.className}
                      onChange={this.props.onChange}
                      onBlur={this.props.onBlur}
                      value={this.props.value}
                    />
                    {hint}
                </label>
            </div>
        );
    }
}

const MyCustomInput = inputFactory(MyBareCustomInput);

describe('<MyCustomInput/>', () => {
    const register = jest.fn();
    const unregister = jest.fn();
    const validateState = jest.fn();
    const persist = jest.fn();

    const context = {
        register,
        unregister,
        validateState,
        errors: {
            'mock_name': ['required']
        }
    };

    describe('#render', () => {
        it('should render custom markup', () => {
            const node = shallow(
                <MyCustomInput validations={['mock_validation']} type="checkbox" name="mock_name" value="mock_value" />,
                { context }
            );

            expect(node.dive().find('h1').html()).toBe(`<h1>Custom input</h1>`);
        });

        it('should render input as is with passed props/attributes', () => {
            const node = shallow(
                <MyCustomInput validations={['mock_validation']} type="checkbox" name="mock_name" value="mock_value" />,
                { context }
            );

            expect(node.dive().find('input').html()).toBe(`<input type="checkbox" class="" value="mock_value" name="mock_name"/>`);
        });

        it('should display a hint on error', () => {
            const node = shallow(
                <MyCustomInput validations={['mock_validation']} type="checkbox" name="mock_name" value="mock_value" />,
                { context }
            );

            expect(node.dive().find('.error').length).toBe(0);

            node.setState({
                isUsed: true,
                isChanged: true
            });

            expect(node.dive().find('.error').length).toBe(1);
        });
    });
});
