
import React from 'react';
import { mount } from 'enzyme';

import App from '../src/components/App/index.jsx';

describe('Test <App /> Component class', () => {
    it('App render function', () => {
        const spy = jest.spyOn(App.prototype, 'render');
        const component = <App />
        const wrapper = mount(component);

        wrapper.update();
        expect(spy).toHaveBeenCalled();
    });
});
