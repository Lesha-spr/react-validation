import React from 'react';
import { shallow } from 'enzyme';
import Select from './../Select';
import rules from './../../../rules';

Object.assign(rules, {
    required: {
        hint() {
            return <span className="error"/>
        }
    }
});

describe('<Select/>', () => {
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
        it('should render without side effects', () => {
            const node = shallow(
                <Select validations={['mock_validation']} name="mock_name" value="mock_value">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            expect(node.find('select').html()).toBe(`<select name="mock_name" class=""><option value="">Choose</option><option selected="" value="mock_value">Value 1</option><option value="mock_other_value">Value 2</option></select>`);
        });

        it('should be wrapped by div', () => {
            const node = shallow(
                <Select validations={['mock_validation']} name="mock_name" value="mock_value">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            expect(node.find('select').parent().is('div')).toBe(true);
        });

        it('should render with proper error on context with errors and been used & changed', () => {
            const node = shallow(
                <Select validations={['mock_validation']} name="mock_name" value="mock_value">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            expect(node.find('.error').length).toBe(1);
        });

        it('should re-render without error on non error context', () => {
            const node = shallow(
                <Select validations={['mock_validation']} name="mock_name" value="mock_value">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            node.setContext({
                register,
                unregister,
                validateState,
                errors: {}
            });

            expect(node.find('.error').length).toBe(0);
        });
    });

    describe('initial state', () => {
        it('should be marked as used, as changed if value passed', () => {
            const node = shallow(
                <Select validations={['mock_validation']} name="mock_name" value="mock_value">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            expect(node.state('isUsed')).toBe(true);
            expect(node.state('isChanged')).toBe(true);
        });

        it('should be registered on init', () => {
            shallow(
                <Select validations={['mock_validation']} name="mock_name" value="mock_value">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            expect(register).toHaveBeenCalled();
        });

        it('should be unregistered on unmount', () => {
            const node = shallow(
                <Select validations={['mock_validation']} name="mock_name" value="mock_value">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            node.unmount();

            expect(unregister).toHaveBeenCalled();
        });
    });

    describe('#change', () => {
        it('should set state on change with changed flag and new value', () => {
            const expected = {
                value: 'mock_value',
                isChanged: true,
                isUsed: true,
                isChecked: true
            };

            const node = shallow(
                <Select validations={['mock_validation']} name="mock_name" value="">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            node.find('select').simulate('change', {
                target: {
                    value: 'mock_value'
                },
                persist
            });

            expect(node.state()).toEqual(expected);
        });

        it('should call context.validateState on change', () => {
            const node = shallow(
                <Select validations={['mock_validation']} name="mock_name" value="">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            node.find('select').simulate('change', {
                target: {
                    value: 'mock_other_value'
                },
                persist
            });

            expect(validateState).toHaveBeenCalledWith('mock_name');
        });

        it('should persist event on change', () => {
            const node = shallow(
                <Select validations={['mock_validation']} name="mock_name" value="">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            node.find('select').simulate('change', {
                target: {
                    value: 'mock_other_value'
                },
                persist
            });

            expect(persist).toHaveBeenCalled();
        });

        it('should call onChange prop if passed', () => {
            const onChange = jest.fn();
            const eventData = {
                target: {
                    value: 'mock_value'
                },
                persist
            };
            const node = shallow(
                <Select validations={['mock_validation']} onChange={onChange} name="mock_name" value="">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            node.find('select').simulate('change', eventData);

            expect(onChange).toHaveBeenCalledWith(eventData);
        });
    });

    describe('#blur', () => {
        it('should call context.validateState on blur', () => {
            const node = shallow(
                <Select validations={['mock_validation']} name="mock_name" value="">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            node.find('select').simulate('blur', {
                target: {
                    value: 'mock_other_value'
                },
                persist
            });

            expect(validateState).toHaveBeenCalledWith('mock_name');
        });

        it('should persist event on blur', () => {
            const node = shallow(
                <Select validations={['mock_validation']} name="mock_name" value="">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            node.find('select').simulate('blur', {
                persist
            });

            expect(persist).toHaveBeenCalled();
        });

        it('should call onBlur prop if passed', () => {
            const onBlur = jest.fn();
            const eventData = {
                persist
            };
            const node = shallow(
                <Select validations={['mock_validation']} onBlur={onBlur} name="mock_name" value="">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            node.find('select').simulate('blur', eventData);

            expect(onBlur).toHaveBeenCalled();
        });
    });

    describe('update props', () => {
        it('should update state.value and mark changed on updating props with new value', () => {
            const node = shallow(
                <Select validations={['mock_validation']} name="mock_name" value="">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            expect(node.find('select').prop('value')).toBe('');

            node.setProps({
                value: 'mock_other_value'
            });

            expect(node.find('select').prop('value')).toBe('mock_other_value');
            expect(node.state('isChanged')).toBe(true);
        });

        it('should not update state.value on updating props with same value', () => {
            const node = shallow(
                <Select validations={['mock_validation']} name="mock_name" value="mock_value">
                    <option value="">Choose</option>
                    <option value="mock_value">Value 1</option>
                    <option value="mock_other_value">Value 2</option>
                </Select>,
                { context }
            );

            expect(node.find('select').prop('value')).toBe('mock_value');

            node.find('select').simulate('change', {
                target: {
                    value: 'mock_other_value'
                },
                persist
            });

            node.setState = jest.fn();

            expect(node.setState).not.toHaveBeenCalled();
        });
    });
});
