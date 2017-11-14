import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import Loader from '../src/shared/components/commons/loader';

describe('Test <Loader /> Component class', () => {
    test('Loader render function', () => {
        const spy = jest.spyOn(Loader.prototype, 'render');
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
            <Loader {...props} />
        </StaticRouter>
    );
}
