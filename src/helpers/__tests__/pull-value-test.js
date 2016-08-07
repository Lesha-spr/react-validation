jest.unmock('./../pull-value.js');

import pullValue from './../pull-value.js';

describe('pullValue', () => {
    it('should return props.value if there is no state.value', () => {
        let data = {
            name: 'mock_name',
            value: 'mock_value',
            states: {}
        };

        expect(pullValue(data)).toBe('mock_value');
    });

    it('should return state.value if exists', () => {
        let data = {
            name: 'mock_name',
            value: 'mock_value',
            states: {
                'mock_name': {
                    value: 'mock_state_value'
                }
            }
        };

        expect(pullValue(data)).toBe('mock_state_value');
    });
});