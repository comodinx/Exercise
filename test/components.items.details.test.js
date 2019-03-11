import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import ItemDetails from '../src/shared/components/items/details';

describe('Test <ItemDetails /> Component class', () => {
    test('ItemDetails render with all data', done => {
        const props = {
            match: {
                params: {
                    id: 'MLA001'
                }
            }
        };

        const spy = jest.spyOn(ItemDetails.prototype, 'render');
        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();

        process.nextTick(() => {
            expect(wrapper.find('.main').length).toBe(1);
            wrapper.find('.main').update();

            expect(wrapper.find('.item-page').length).toBe(1);
            expect(wrapper.find('.item').length).toBe(1);
            expect(wrapper.find('.item').children().length).toBe(2);
            expect(wrapper.find('.item-image').length).toBe(1);
            expect(wrapper.find('.item-detail').length).toBe(1);
            expect(wrapper.find('.item-status').length).toBe(1);
            expect(wrapper.find('.item-condition').length).toBe(1);
            expect(wrapper.find('.item-condition').text()).toEqual('Nuevo');
            expect(wrapper.find('.item-sold').length).toBe(1);
            expect(wrapper.find('.item-sold').text()).toEqual('1 vendido');
            expect(wrapper.find('.item-description').length).toBe(1);
            expect(spy).toHaveBeenCalled();

            done();
        });
    });

    test('ItemDetails render without description', done => {
        const props = {
            match: {
                params: {
                    id: 'MLA002'
                }
            }
        };

        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();

        process.nextTick(() => {
            expect(wrapper.find('.main').length).toBe(1);
            wrapper.find('.main').update();

            expect(wrapper.find('.item-page').length).toBe(1);
            expect(wrapper.find('.item').length).toBe(1);
            expect(wrapper.find('.item').children().length).toBe(1);
            expect(wrapper.find('.main').length).toBe(1);
            expect(wrapper.find('.item-description').length).toBe(0);

            done();
        });
    });

    test('ItemDetails render without condition', done => {
        const props = {
            match: {
                params: {
                    id: 'MLA003'
                }
            }
        };

        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();

        process.nextTick(() => {
            expect(wrapper.find('.main').length).toBe(1);
            wrapper.find('.main').update();

            expect(wrapper.find('.item-page').length).toBe(1);
            expect(wrapper.find('.item').length).toBe(1);
            expect(wrapper.find('.item-image').length).toBe(1);
            expect(wrapper.find('.item-detail').length).toBe(1);
            expect(wrapper.find('.item-status').length).toBe(1);
            expect(wrapper.find('.item-condition').length).toBe(0);

            done();
        });
    });

    test('ItemDetails render with condition used', done => {
        const props = {
            match: {
                params: {
                    id: 'MLA004'
                }
            }
        };

        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();

        process.nextTick(() => {
            expect(wrapper.find('.main').length).toBe(1);
            wrapper.find('.main').update();

            expect(wrapper.find('.item-page').length).toBe(1);
            expect(wrapper.find('.item').length).toBe(1);
            expect(wrapper.find('.item-image').length).toBe(1);
            expect(wrapper.find('.item-detail').length).toBe(1);
            expect(wrapper.find('.item-status').length).toBe(1);
            expect(wrapper.find('.item-condition').length).toBe(1);
            expect(wrapper.find('.item-condition').text()).toEqual('Usado');

            done();
        });
    });

    test('ItemDetails render without sold', done => {
        const props = {
            match: {
                params: {
                    id: 'MLA004'
                }
            }
        };

        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();

        process.nextTick(() => {
            expect(wrapper.find('.main').length).toBe(1);
            wrapper.find('.main').update();

            expect(wrapper.find('.item-page').length).toBe(1);
            expect(wrapper.find('.item').length).toBe(1);
            expect(wrapper.find('.item-image').length).toBe(1);
            expect(wrapper.find('.item-detail').length).toBe(1);
            expect(wrapper.find('.item-status').length).toBe(1);
            expect(wrapper.find('.item-sold').length).toBe(0);

            done();
        });
    });

    test('ItemDetails render with sold in plural', done => {
        const props = {
            match: {
                params: {
                    id: 'MLA002'
                }
            }
        };

        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();

        process.nextTick(() => {
            expect(wrapper.find('.main').length).toBe(1);
            wrapper.find('.main').update();

            expect(wrapper.find('.item-page').length).toBe(1);
            expect(wrapper.find('.item').length).toBe(1);
            expect(wrapper.find('.item-image').length).toBe(1);
            expect(wrapper.find('.item-detail').length).toBe(1);
            expect(wrapper.find('.item-status').length).toBe(1);
            expect(wrapper.find('.item-condition').length).toBe(1);
            expect(wrapper.find('.item-condition').text()).toEqual('Nuevo');
            expect(wrapper.find('.item-sold').length).toBe(1);
            expect(wrapper.find('.item-sold').text()).toEqual('2 vendidos');

            done();
        });
    });

    test('ItemDetails render without status section', done => {
        const props = {
            match: {
                params: {
                    id: 'MLA005'
                }
            }
        };

        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();

        process.nextTick(() => {
            expect(wrapper.find('.main').length).toBe(1);
            wrapper.find('.main').update();

            expect(wrapper.find('.item-page').length).toBe(1);
            expect(wrapper.find('.item').length).toBe(1);
            expect(wrapper.find('.item-image').length).toBe(1);
            expect(wrapper.find('.item-detail').length).toBe(1);
            expect(wrapper.find('.item-status').length).toBe(0);

            done();
        });
    });

    test('ItemDetails render empty result when item not found', done => {
        const props = {
            match: {
                params: {
                    id: 'MLA999'
                }
            }
        };

        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();

        process.nextTick(() => {
            expect(wrapper.find('.main').length).toBe(1);
            wrapper.find('.main').update();

            expect(wrapper.find('.error-text').length).toBe(1);
            expect(wrapper.find('.error-text').text()).toEqual('404 Parece que la página no existe :(');

            done();
        });
    });

/*
    test('ItemDetails render empty result when item not found on mount', done => {
        const props = {
            match: {
                params: {
                    id: 'MLA999'
                }
            }
        };

        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();
        wrapper.setProps({
            match: {
                params: {
                    id: 'MLA999'
                }
            }
        });

        process.nextTick(() => {
            expect(wrapper.find('.main').length).toBe(1);
            wrapper.find('.main').update();

            expect(wrapper.find('.error-text').length).toBe(1);
            expect(wrapper.find('.error-text').text()).toEqual('404 Parece que la página no existe :(');

            done();
        });
    });
*/
});

function getComponent(context, props = {}) {
    context = context || {};

    return (
        <StaticRouter context={context} >
            <ItemDetails {...props} />
        </StaticRouter>
    );
}
