import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import NotFound from '../src/shared/components/errors/notFound';

describe('Test <NotFound /> Component class', () => {
    test('NotFound render function', () => {
        const spy = jest.spyOn(NotFound.prototype, 'render');
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
            <NotFound {...props} />
        </StaticRouter>
    );
}
