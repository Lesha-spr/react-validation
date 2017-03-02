import React, { Component } from 'react';
import { shallow } from 'enzyme';
import textareaFactory from './../../../factories/textareaFactory';
import rules from './../../../rules';

Object.assign(rules, {
    required: {
        hint() {
            return <span className="error"/>
        }
    }
});

class MyBareCustomTextarea extends Component {
    render() {
        const { containerClassName, hint, ...rest } = this.props;

        return (
            <div className={containerClassName}>
                <h1>Custom textarea</h1>
                <label>
                    <span>Test</span>
                      <textarea
                        {...rest}
                        className={this.props.className}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                        value={this.props.value}
                      />
                      {hint && <p>{hint}</p>}
                </label>
            </div>
        );
    }
}

const MyCustomTextarea = textareaFactory(MyBareCustomTextarea);

describe('<MyCustomTextarea/>', () => {
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
                <MyCustomTextarea validations={['mock_validation']} name="mock_name" value="mock_value" />,
                { context }
            );

            expect(node.dive().find('h1').html()).toBe(`<h1>Custom textarea</h1>`);
        });

        it('should render input as is with passed props/attributes', () => {
            const node = shallow(
                <MyCustomTextarea validations={['mock_validation']} name="mock_name" value="mock_value" />,
                { context }
            );

            expect(node.dive().find('textarea').html()).toBe(`<textarea class="" name="mock_name">mock_value</textarea>`);
        });

        it('should display a hint on error', () => {
            const node = shallow(
                <MyCustomTextarea validations={['mock_validation']} name="mock_name" value="mock_value" />,
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
