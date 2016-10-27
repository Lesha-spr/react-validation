const mock_rule = jest.fn((value) => value === 'mock_value');
const mock_hint = <span>hint</span>;

jest.mock('./../../../rules', () => {
    return {
        required: {
            rule: mock_rule,
            hint: mock_hint
        }
    };
});

import React from 'react';
import { shallow } from 'enzyme';

const rules = require('./../../../rules');
const Form = require('./../Form').default;

describe('<Form/>', () => {
    describe('#render', () => {
        it('should render form as is with passed props/attributes and children', () => {
            const node = shallow(
                <Form className="mock_class">
                    <div className="mock_class">Mock text</div>
                </Form>
            );

            expect(node.html()).toBe(`<form class="mock_class"><div class="mock_class">Mock text</div></form>`);
        });
    });

    describe('#register/#unregister', () => {
        it('should add component to instance object on register', () => {
            const mockComponent = {
                props: {
                    name: 'mock_component_name'
                }
            };
            const node = shallow(
                <Form className="mock_class">
                    <div className="mock_class">Mock text</div>
                </Form>
            );

            node.instance().register(mockComponent);

            expect(node.instance().components['mock_component_name']).toEqual(mockComponent);
        });

        it('should remove component from instance object on unregister', () => {
            const mockComponent = {
                props: {
                    name: 'mock_component_name'
                }
            };
            const node = shallow(
                <Form className="mock_class">
                    <div className="mock_class">Mock text</div>
                </Form>
            );

            node.instance().register(mockComponent);
            node.setState({
                errors: {
                    'mock_component_name': ['required']
                }
            });

            expect(node.instance().components['mock_component_name']).toEqual(mockComponent);

            node.instance().unregister(mockComponent);

            expect(node.instance().components['mock_component_name']).toBeUndefined();
            expect(node.state().errors['mock_component_name']).toBeUndefined();
        });

        it('should update error state on unregister', () => {
            const setState = jest.fn();
            const mockComponent = {
                props: {
                    name: 'mock_component_name'
                }
            };
            const node = shallow(
                <Form className="mock_class">
                    <div className="mock_class">Mock text</div>
                </Form>
            );

            node.instance().register(mockComponent);
            node.setState({
                errors: {
                    'mock_component_name': ['required']
                }
            });

            node.instance().setState = setState;
            node.instance().unregister(mockComponent);

            expect(setState.mock.calls[0][0].errors).toEqual({});
        });
    });

    describe('initial state', () => {
        it('should have error state object and instance components object', () => {
            const node = shallow(
                <Form className="mock_class">
                    <div className="mock_class">Mock text</div>
                </Form>
            );

            expect(node.instance().components).toEqual({});
            expect(node.state().errors).toEqual({});
        });

        it('should validate on mount to disable buttons', () => {
            const validateState = jest.fn();
            const node = shallow(
                <Form className="mock_class">
                    <div className="mock_class">Mock text</div>
                </Form>
            );

            node.instance().validateState = validateState;
            node.instance().componentDidMount();

            expect(validateState).toHaveBeenCalled();
        });
    });

    describe('#validate', () => {
        it('should update state of validating component by name', () => {
            const setState = jest.fn();
            const validateState = jest.fn();
            const stateUpdater = {
                isUsed: true,
                isChanged: true,
            };
            const node = shallow(
                <Form className="mock_class">
                    <div className="mock_class">Mock text</div>
                </Form>
            );

            node.instance().validateState = validateState;
            node.instance().components = {
                'mock_component': {
                    setState
                }
            };

            node.instance().validate('mock_component');

            expect(setState).toHaveBeenCalledWith(stateUpdater, validateState);
        });
    });

    describe('#validateState', () => {
        it('should call mapped rules method', () => {
            const mockComponent = {
                props: {
                    name: 'mock_component_name',
                    validations: ['required']
                },
                state: {
                    value: ''
                }
            };
            const node = shallow(
                <Form className="mock_class">
                    <div className="mock_class">Mock text</div>
                </Form>
            );

            node.instance().register(mockComponent);
            node.instance().validateState();

            expect(mock_rule).toHaveBeenCalledWith(mockComponent.state.value, node.instance().components);
        });

        it('should set error state on rule invalidation', () => {
            const setState = jest.fn();
            const mockComponent = {
                props: {
                    name: 'mock_component_name',
                    validations: ['required']
                },
                state: {
                    value: 'mock_value_invalid'
                }
            };
            const node = shallow(
                <Form className="mock_class" />
            );

            node.instance().register(mockComponent);
            node.instance().setState = setState;
            node.instance().validateState();

            expect(setState).toHaveBeenCalledWith({
                errors: {
                    'mock_component_name': ['required']
                }
            });
        });

        it('should not set error state on valid rule', () => {
            const setState = jest.fn();
            const mockComponent = {
                props: {
                    name: 'mock_component_name',
                    validations: ['required']
                },
                state: {
                    value: 'mock_value'
                }
            };
            const node = shallow(
                <Form className="mock_class" />
            );

            node.instance().register(mockComponent);
            node.instance().setState = setState;
            node.instance().validateState();

            expect(setState).toHaveBeenCalledWith({
                errors: {}
            });
        });
    });

    describe('#validateAll', () => {
        it('should update state of registered component', () => {
            const setState_1 = jest.fn();
            const setState_2 = jest.fn();
            const node = shallow(
                <Form className="mock_class">
                    <div className="mock_class">Mock text</div>
                </Form>
            );
            const cb = jest.fn();

            node.instance().components = {
                'mock_component_1': {
                    setState: setState_1,
                    props: {
                        validations: []
                    }
                },
                'mock_component_2': {
                    setState: setState_2,
                    props: {
                        validations: []
                    }
                }
            };

            node.instance().validateAll(cb);

            expect(setState_1.mock.calls[0][0]).toEqual({
                isUsed: true,
                isChanged: true,
            });
            expect(setState_2.mock.calls[0][0]).toEqual({
                isUsed: true,
                isChanged: true,
            });
        });
    });

    describe('#showError', () => {
        it('should mark component as used and changed', () => {
            const setState = jest.fn();
            const mockComponent = {
                props: {
                    name: 'mock_component_name',
                    validations: ['required']
                },
                state: {
                    value: 'mock_value'
                },
                setState: jest.fn((state, fn) => { fn() })
            };
            const node = shallow(
                <Form className="mock_class" />
            );

            node.instance().register(mockComponent);
            node.instance().setState = setState;
            node.instance().showError('mock_component_name', 'required');

            expect(mockComponent.setState.mock.calls[0][0]).toEqual({
                isUsed: true,
                isChanged: true
            });

            expect(setState).toHaveBeenCalledWith({
                errors: {
                    'mock_component_name': ['required']
                }
            });
        });
    });

    describe('#hideError', () => {
        it('should delete error and update state', () => {
            const node = shallow(
                <Form className="mock_class">
                    <div className="mock_class">Mock text</div>
                </Form>
            );

            node.setState({
                errors: {
                    'mock_name': ['required']
                }
            });

            node.instance().hideError('mock_name');

            expect(node.state().errors['mock_name']).toBeUndefined();
        });
    });
});
