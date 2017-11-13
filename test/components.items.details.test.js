import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import ItemDetails from '../src/shared/components/items/details';

describe('Test <ItemDetails /> Component class', () => {
    test('ItemDetails render function', () => {
        const spy = jest.spyOn(ItemDetails.prototype, 'render');
        const component = getComponent();
        const wrapper = mount(component);

        wrapper.update();
        expect(spy).toHaveBeenCalled();
    });
});

function getComponent(context, props = {}) {
    context = context || {};

    return (
        <StaticRouter context={context} >
            <ItemDetails {...props} />
        </StaticRouter>
    );
}
