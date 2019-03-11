import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import Layout from '../src/shared/components/commons/layout';

describe('Test <Layout /> Component class', () => {
    test('Layout render container and main content', () => {
        const spy = jest.spyOn(Layout.prototype, 'render');
        const component = getComponent();
        const wrapper = mount(component);

        wrapper.update();

        expect(wrapper.find('.container').length).toBe(1);
        expect(wrapper.find('.main').length).toBe(1);
        expect(spy).toHaveBeenCalled();
    });
});

function getComponent(context, props = {}) {
    context = context || {};

    return (
        <StaticRouter context={context} >
            <Layout {...props} />
        </StaticRouter>
    );
}
