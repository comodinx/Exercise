
import React from 'react';
import { mount } from 'enzyme';

import Item from '../src/components/Items/Details/index.jsx';

jest.mock('../src/modules/History.jsx', () => ({
    replace: jest.fn(),
    push: jest.fn()
}));

describe('Test <Items /> Component class', () => {
    test('Items render function', () => {
        const properties = {
            match: {
                params: {
                    id: 'MLA000000001'
                }
            }
        };

        const spy = jest.spyOn(Item.prototype, 'render');
        const component = <Item {...properties} />
        const wrapper = mount(component);

        wrapper.update();
        expect(spy).toHaveBeenCalled();
    });

    test('Items not found', done => {
        const properties = {
            match: {
                params: {
                    id: 'error'
                }
            }
        };

        const component = <Item {...properties} />
        const wrapper = mount(component);

        wrapper.update();
        expect(wrapper.find('.loader').length).toBe(1);

        setTimeout(() => {
            expect(wrapper.html()).toEqual(expect.stringMatching(/.*Parece.*\sno\sexiste.*/));
            done();
        }, 0);
    });
});
