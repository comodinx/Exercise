import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import Header from '../src/shared/components/commons/header';

describe('Test <Header /> Component class', () => {
    test('Header render function', () => {
        const spy = jest.spyOn(Header.prototype, 'render');
        const component = getComponent();
        const wrapper = mount(component);

        wrapper.update();
        expect(spy).toHaveBeenCalled();
    });

    test('Header change event', () => {
        const spyChange = jest.spyOn(Header.prototype, 'handleChange');
        const component = getComponent();
        const wrapper = mount(component);

        wrapper.find('input').simulate('change', global.mockObjects.event);
        expect(spyChange).toHaveBeenCalled();
    });

    test('Header submit event', () => {
        const spySubmit = jest.spyOn(Header.prototype, 'handleSubmit');
        const component = getComponent();
        const wrapper = mount(component);

        wrapper.find('form').simulate('submit', global.mockObjects.event);
        expect(spySubmit).toHaveBeenCalled();
    });

    test('Header submit event redirect to item page', () => {
        const props = {
            search: 'MLA001'
        };
        const spySubmit = jest.spyOn(Header.prototype, 'handleSubmit');
        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.find('form').simulate('submit', global.mockObjects.event);
        expect(spySubmit).toHaveBeenCalled();
        expect(wrapper.instance().props.children.props.search).toEqual(props.search);
    });

    test('Header state search value', () => {
        const props = {
            search: 'autos'
        };
        const component = getComponent({}, props);
        const wrapper = mount(component);

        expect(wrapper.instance().props.children.props.search).toEqual(props.search);
    });
});

function getComponent(context, props = {}) {
    context = context || {};

    return (
        <StaticRouter context={context} >
            <Header {...props} />
        </StaticRouter>
    );
}
