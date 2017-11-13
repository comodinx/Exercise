import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import Items from '../src/shared/components/items';

describe('Test <Items /> Component class', () => {
    test('Items render items function', () => {
        const props = {
            location: {
                search: '?search=autos'
            }
        };

        const spy = jest.spyOn(Items.prototype, 'render');
        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();
        expect(spy).toHaveBeenCalled();
    });

    test('Items render item function', () => {
        const props = {
            location: {
                search: '?search=MLA001'
            }
        };

        const spy = jest.spyOn(Items.prototype, 'render');
        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();
        expect(spy).toHaveBeenCalled();
    });

    test('Items render empty function', () => {
        const props = {
            location: {
                search: '?search=empty'
            }
        };

        const spy = jest.spyOn(Items.prototype, 'render');
        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();
        expect(spy).toHaveBeenCalled();
    });
});

function getComponent(context, props = {}) {
    context = context || {};

    return (
        <StaticRouter context={context} >
            <Items {...props} />
        </StaticRouter>
    );
}
