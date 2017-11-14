import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import Empty from '../src/shared/components/errors/empty';

describe('Test <Empty /> Component class', () => {
    test('Empty render function', () => {
        const spy = jest.spyOn(Empty.prototype, 'render');
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
            <Empty {...props} />
        </StaticRouter>
    );
}
0