'use strict';

jest.unmock('./../Select.jsx');
jest.unmock('./../../Form/Form.jsx');
jest.unmock('./../../shared');
jest.unmock('./../../index.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var validator = require('validator');
var Form = require('./../../Form/Form.jsx');
var extendErrors = require('./../../index.jsx').extendErrors;
var Select = require('./../Select.jsx');
var errors = require('./../../errors');
var shared = require('./../../shared');

var form, formRendered;

describe('Select', () => {
    beforeEach(() => {
        extendErrors({
            isRequired: {
                message: 'required',
                rule: function(value) {
                    return Boolean(validator.trim(value))
                }
            }
        });

        form = <Form>
            <Select validations={[{rule: 'isRequired'}]} name='select' className='test'>
                <option value=''>empty</option>
                <option value='1'>1</option>
                <option value='test'>test</option>
            </Select>
        </Form>;

        formRendered = TestUtils.renderIntoDocument(form);
    });

    it('should render with empty string value when no value passed', () => {
        var selectElement = TestUtils.findRenderedDOMComponentWithTag(formRendered, 'select');

        expect(selectElement.value).toBe('');
    });

    it('should set value on change to select', () => {
        var selectElement = TestUtils.findRenderedDOMComponentWithTag(formRendered, 'select');
        var mockEvent = {target: {value: 'test'}};

        TestUtils.Simulate.change(selectElement, mockEvent);

        expect(selectElement.value).toBe('test');
    });

    it('should invalidate after change to empty value', () => {
        var selectElement = TestUtils.findRenderedDOMComponentWithTag(formRendered, 'select');
        var mockEvent = {target: {value: ''}};

        TestUtils.Simulate.change(selectElement, mockEvent);

        var hintElement = TestUtils.findRenderedDOMComponentWithTag(formRendered, 'span');

        expect(selectElement.classList.contains('ui-input_state_invalid')).toBe(true);
        expect(hintElement.textContent).toBe('required');
    });
});