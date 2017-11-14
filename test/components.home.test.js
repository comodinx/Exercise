import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import Home from '../src/shared/components/home';

describe('Test <Home /> Component class', () => {
    test('Home render function', () => {
        const spy = jest.spyOn(Home.prototype, 'render');
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
            <Home {...props} />
        </StaticRouter>
    );
}
