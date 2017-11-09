
import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import Items from '../src/components/Items/index.jsx';

jest.mock('../src/modules/History.jsx', () => ({
    replace: jest.fn(),
    push: jest.fn()
}));

describe('Test <Items /> Component class', () => {
    test('Items render function', () => {
        const properties = {
            location: {
                search: '?search=autos'
            }
        };

        const spy = jest.spyOn(Items.prototype, 'render');
        const component = (
            <MemoryRouter>
                <Items {...properties} />
            </MemoryRouter>
        );
        const wrapper = mount(component);

        wrapper.update();
        expect(spy).toHaveBeenCalled();
    });

    test('Items redirect to item page', () => {
        const properties = {
            location: {
                search: '?search=MLA000000001'
            }
        };

        const component = (
            <MemoryRouter>
                <Items {...properties} />
            </MemoryRouter>
        );
        const wrapper = mount(component);

        wrapper.update();
        expect(require('../src/modules/History.jsx').replace.mock.calls.length).toBe(1);
    });

    test('Items empty', done => {
        const properties = {
            location: {
                search: '?search=empty'
            }
        };

        const component = <Items {...properties} />
        const wrapper = mount(component);

        wrapper.update();
        expect(wrapper.find('.loader').length).toBe(1);

        setTimeout(() => {
            expect(wrapper.html()).toEqual(expect.stringMatching(/.*No\shay\spublicaciones.*/));
            done();
        }, 0);
    });
});
