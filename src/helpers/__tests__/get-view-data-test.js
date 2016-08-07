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
            mock_key: 'mock_value'
        };

        let data = getViewData(props);

        expect(Object.keys(data.props).length === 1 && data.props.hasOwnProperty('mock_key')).toBe(true);
    });
});