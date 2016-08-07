jest.unmock('./../pull-class-name.js');

import pullClassName from './../pull-class-name.js';

describe('pullClassName', () => {
    it('should return falsy value on valid value and not passed className prop', () => {
        let error = null;
        let props = {};

        expect(pullClassName(error, props)).toBeFalsy();
    });

    it('should return falsy value on invalid value and not passed errorClassName prop', () => {
        let error = true;
        let props = {};

        expect(pullClassName(error, props)).toBeFalsy();
    });

    it('should return className prop value on invalid value and not passed errorClassName prop', () => {
        let error = true;
        let props = {
            className: 'mock_class_name'
        };

        expect(pullClassName(error, props)).toBe('mock_class_name');
    });

    it('should return concated className prop value and errorClassName prop value with space on invalid value', () => {
        let error = true;
        let props = {
            className: 'mock_class_name',
            errorClassName: 'mock_error_class_name'
        };

        expect(pullClassName(error, props)).toBe('mock_class_name mock_error_class_name');
    });
});