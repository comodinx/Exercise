
import React from 'react';
import { mount } from 'enzyme';

import Header from '../src/components/Commons/Header.jsx';

jest.mock('../src/modules/History.jsx', () => ({
    replace: jest.fn(),
    push: jest.fn()
}));

describe('Test <Header /> Component class', () => {
    test('Header render function', () => {
        const spy = jest.spyOn(Header.prototype, 'render');
        const component = <Header />
        const wrapper = mount(component);

        wrapper.update();
        expect(spy).toHaveBeenCalled();
    });

    test('Header change event', () => {
        const spyChange = jest.spyOn(Header.prototype, 'handleChange');
        const component = <Header />
        const wrapper = mount(component);

        wrapper.find('input').simulate('change', global.mockObjects.event);
        expect(spyChange).toHaveBeenCalled();
    });

    test('Header submit event', () => {
        const spySubmit = jest.spyOn(Header.prototype, 'handleSubmit');
        const component = <Header />
        const wrapper = mount(component);

        wrapper.find('form').simulate('submit', global.mockObjects.event);
        expect(spySubmit).toHaveBeenCalled();
    });

    test('Header state search value', () => {
        const properties = {
            search: 'autos'
        };

        const component = <Header {...properties} />
        const wrapper = mount(component);

        expect(wrapper.state().search).toEqual(properties.search);
    });
});
