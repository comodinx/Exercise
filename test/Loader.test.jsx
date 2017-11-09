
import React from 'react';
import { mount } from 'enzyme';

import Loader from '../src/components/Commons/Loader.jsx';

describe('Test <Loader /> Component class', () => {
    test('Loader render function', () => {
        const spy = jest.spyOn(Loader.prototype, 'render');
        const component = <Loader />
        const wrapper = mount(component);

        wrapper.update();
        expect(spy).toHaveBeenCalled();
    });
});
