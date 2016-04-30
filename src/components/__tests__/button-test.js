'use strict';

jest.unmock('./../button.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var Button = require('./../button.jsx');
var errors = require('./../../errors');

var button, buttonRendered;

describe('Button', () => {
    beforeEach(() => {
        button = <Button className='test' value='value'/>;
        buttonRendered = TestUtils.renderIntoDocument(button);
    });

    it('should render button element with classname and value passed', () => {
        var input = TestUtils.findRenderedDOMComponentWithTag(buttonRendered, 'input');

        expect(input.classList.contains('test')).toBe(true);
        expect(input.classList.contains(errors.defaultDisabledClassName)).toBe(true);
        expect(input.value).toBe('value');
    });

    it('should be disabled on mount', () => {
        var input = TestUtils.findRenderedDOMComponentWithTag(buttonRendered, 'input');

        expect(input.disabled).toBe(true);
    });
});