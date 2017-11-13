import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import Layout from '../src/shared/components/commons/layout';

describe('Test <Layout /> Component class', () => {
    test('Layout render function', () => {
        const spy = jest.spyOn(Layout.prototype, 'render');
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
            <Layout {...props} />
        </StaticRouter>
    );
}
