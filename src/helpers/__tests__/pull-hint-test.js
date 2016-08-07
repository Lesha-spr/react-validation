jest.unmock('./../pull-hint.js');

import pullHint from './../pull-hint.js';

describe('pullHint', () => {
    it('should return mapped hint', () => {
        let error = 'mock_error';
        let value = 'mock_value';
        let rules = {
            'mock_error': {
                hint: value => {
                    return `mock_hint_${value}}`;
                }
            }
        };

        expect(pullHint(error, value, rules)).toBe(`mock_hint_${value}}`);
    });
});