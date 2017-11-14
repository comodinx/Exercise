import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import Error from '../src/shared/components/errors/error';

describe('Test <Error /> Component class', () => {
    test('Error render function', () => {
        const spy = jest.spyOn(Error.prototype, 'render');
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
            <Error {...props} />
        </StaticRouter>
    );
}
0