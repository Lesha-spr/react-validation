import React from 'react';
import { shallow } from 'enzyme';
import Button from './../Button';

describe('<Button/>', () => {
    const context = {
        errors: {
            'mock_name': ['required']
        }
    };

    describe('#render', () => {
        it('should render without side effects', () => {
            const node = shallow(
                <Button disabled="" className="mock_class" type="submit">Mock text</Button>,
                { context }
            );

            expect(node.html()).toBe(`<button class="mock_class" type="submit">Mock text</button>`);
        });

        it('should prefer disabled prop', () => {
            const node = shallow(
                <Button disabled={false} className="mock_class" type="submit">Mock text</Button>,
                { context }
            );

            expect(node.html()).toBe(`<button class="mock_class" type="submit">Mock text</button>`);
        });
    });
});
