import React, { Component } from 'react';
import { shallow } from 'enzyme';
import selectFactory from './../../../factories/selectFactory';
import rules from './../../../rules';

Object.assign(rules, {
    required: {
        hint() {
            return <span className="error"/>
        }
    }
});

class MyBareCustomSelect extends Component {
    render() {
        const { containerClassName, hint, ...rest } = this.props;

        return (
            <div className={containerClassName}>
                <h1>Custom select</h1>
                <label>
                    <span>Test</span>
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
                </label>
            </div>
        );
    }
}

const MyCustomSelect = selectFactory(MyBareCustomSelect);

describe('<MyCustomSelect/>', () => {
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
                <MyCustomSelect validations={['mock_validation']} name="mock_name" value="mock_value">
                    <option>1</option>
                </MyCustomSelect>,
                { context }
            );

            expect(node.dive().find('h1').html()).toBe(`<h1>Custom select</h1>`);
        });

        it('should render input as is with passed props/attributes', () => {
            const node = shallow(
                <MyCustomSelect validations={['mock_validation']} name="mock_name" value="mock_value">
                    <option>1</option>
                </MyCustomSelect>,
                { context }
            );

            expect(node.dive().find('select').html()).toBe(`<select class="" name="mock_name"><option>1</option></select>`);
        });

        it('should render with proper error on context with errors and been used & changed', () => {
            const node = shallow(
                <MyCustomSelect validations={['mock_validation']} name="mock_name" value="mock_value">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </MyCustomSelect>,
                { context }
            );

            expect(node.dive().find('.error').length).toBe(1);
        });

        it('should re-render without error on non error context', () => {
            const node = shallow(
                <MyCustomSelect validations={['mock_validation']} name="mock_name" value="mock_value">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </MyCustomSelect>,
                { context }
            );

            node.setContext({
                register,
                unregister,
                validateState,
                errors: {}
            });

            expect(node.dive().find('.error').length).toBe(0);
        });
    });
});
