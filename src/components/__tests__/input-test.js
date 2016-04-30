'use strict';

jest.unmock('./../input.jsx');
jest.unmock('./../form.jsx');
jest.unmock('./../shared');
jest.unmock('./../../index.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var validator = require('validator');
var Form = require('./../form.jsx');
var extendErrors = require('./../../index.jsx').extendErrors;
var Input = require('./../input.jsx');
var errors = require('./../../errors/index');
var shared = require('./../shared');

var form, formRendered, inputElement, onChange;

describe('Input', () => {
    onChange = jest.fn();

    extendErrors({
        isRequired: {
            message: 'required',
            className: 'error-input',
            rule: function(value) {
                return Boolean(validator.trim(value))
            }
        }
    });

    beforeEach(() => {
        form = <Form>
            <Input validations={[{rule: 'isRequired'}]} onChange={onChange} name='input' className='test'/>
        </Form>;

        formRendered = TestUtils.renderIntoDocument(form);

        inputElement = TestUtils.findRenderedDOMComponentWithTag(formRendered, 'input');
    });

    it('should render default text type with empty string value when no value passed', () => {
        expect(inputElement.value).toBe('');
        expect(inputElement.type).toBe('text');
    });

    it('should set value on change to input invoke callback', () => {
        var mockEvent = {target: {value: 'test'}};

        TestUtils.Simulate.change(inputElement, mockEvent);

        expect(inputElement.value).toBe('test');
        expect(onChange).toBeCalled();
    });

    it('should add invalid classname and error hint after change to empty value', () => {
        var mockEvent = {target: {value: 'test'}};

        TestUtils.Simulate.change(inputElement, mockEvent);
        TestUtils.Simulate.blur(inputElement, mockEvent);

        mockEvent.target.value = '';
        TestUtils.Simulate.change(inputElement, mockEvent);

        var hintElement = TestUtils.findRenderedDOMComponentWithTag(formRendered, 'span');

        expect(inputElement.classList.contains('error-input')).toBe(true);
        expect(hintElement.textContent).toBe('required');

        mockEvent.target.value = 'test1';

        TestUtils.Simulate.change(inputElement, mockEvent);

        expect(inputElement.classList.contains('error-input')).toBe(false);
    });
});