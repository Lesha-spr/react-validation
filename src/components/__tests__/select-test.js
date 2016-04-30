'use strict';

jest.unmock('./../select.jsx');
jest.unmock('./../form.jsx');
jest.unmock('./../shared');
jest.unmock('./../../index.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var validator = require('validator');
var Form = require('./../form.jsx');
var extendErrors = require('./../../index.jsx').extendErrors;
var Select = require('./../select.jsx');
var errors = require('./../../errors/index');
var shared = require('./../shared');

var form, formRendered, selectElement, onChange;

describe('Select', () => {
    onChange = jest.fn();

    extendErrors({
        isRequired: {
            message: 'required',
            className: 'error-select',
            rule: function(value) {
                return Boolean(validator.trim(value))
            }
        }
    });

    beforeEach(() => {
        form = <Form>
            <Select validations={[{rule: 'isRequired'}]} onChange={onChange} name='select' className='test'>
                <option value=''>empty</option>
                <option value='1'>1</option>
                <option value='test'>test</option>
            </Select>
        </Form>;

        formRendered = TestUtils.renderIntoDocument(form);

        selectElement = TestUtils.findRenderedDOMComponentWithTag(formRendered, 'select');
    });

    it('should render with empty string value when no value passed', () => {
        expect(selectElement.value).toBe('');
    });

    it('should set value on change to select and invoke callback', () => {
        var mockEvent = {target: {value: 'test'}};

        TestUtils.Simulate.change(selectElement, mockEvent);

        expect(selectElement.value).toBe('test');
        expect(onChange).toBeCalled();
    });

    it('should add invalid classname and error hint after change to empty value', () => {
        var mockEvent = {target: {value: ''}};

        TestUtils.Simulate.change(selectElement, mockEvent);

        var hintElement = TestUtils.findRenderedDOMComponentWithTag(formRendered, 'span');

        expect(selectElement.classList.contains('error-select')).toBe(true);
        expect(hintElement.textContent).toBe('required');

        mockEvent.target.value = 'test';

        TestUtils.Simulate.change(selectElement, mockEvent);

        expect(selectElement.classList.contains('error-select')).toBe(false);
    });
});