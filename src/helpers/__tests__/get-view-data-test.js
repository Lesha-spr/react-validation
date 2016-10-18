jest.unmock('./../get-view-data.js');

import getViewData from './../get-view-data.js';

describe('getViewData', () => {
    it('should destructurize bunch of props to be valid html attrs', () => {
        let props = {
            _register: true,
            _update: true,
            _validate: true,
            validations: true,
            states: true,
            errors: true,
            errorClassName: true,
            containerClassName: true,
            name: 'mock_name',
            mock_key: 'mock_value',
        };

        let context = {
            states: {
                'mock_key': {
                    isUsed: false,
                    isChanged: false
                },
                mock_name: {},
            },
            errors: {},
        };

        let data = getViewData(props, context);

        expect(data.props.hasOwnProperty('mock_key')).toBe(true);
    });
});