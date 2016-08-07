jest.unmock('./../pull-error.js');

import pullError from './../pull-error.js';

describe('pullError', () => {
    it('should return force error if marked with :force', () => {
        let data = {
            name: 'mock_name',
            states: {
                'mock_name': {
                    isUsed: false,
                    isChanged: false
                }
            },
            errors: {
                'mock_name': 'mock_error:force'
            }
        };

        expect(pullError(data)).toBe('mock_error:force');
    });

    it('should return true on invalid state and used/changed flags are true', () => {
        let data = {
            name: 'mock_name',
            states: {
                'mock_name': {
                    isUsed: true,
                    isChanged: true
                }
            },
            errors: {
                'mock_name': 'mock_error'
            }
        };

        expect(pullError(data)).toBe('mock_error');
    });

    it('should return false on invalid state and one of used/changed flags is false', () => {
        let data = {
            name: 'mock_name',
            states: {
                'mock_name': {
                    isUsed: true,
                    isChanged: false
                }
            },
            errors: {
                'mock_name': 'mock_error'
            }
        };

        expect(pullError(data)).toBe(false);
    });
});