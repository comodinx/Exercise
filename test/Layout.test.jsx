
import React from 'react';
import { mount } from 'enzyme';

import Layout from '../src/components/Commons/Layout.jsx';

describe('Test <Layout /> Component class', () => {
    test('Layout render function', () => {
        const spy = jest.spyOn(Layout.prototype, 'render');
        const component = <Layout />
        const wrapper = mount(component);

        wrapper.update();
        expect(spy).toHaveBeenCalled();
    });
});
