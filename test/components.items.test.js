import P from 'bluebird';
import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import Items from '../src/shared/components/items';

describe('Test <Items /> Component class', () => {
    test('Items render all items result when search', done => {
        const props = {
            location: {
                search: `?search=${global.mockObjects.params.query.forResults}`
            }
        };

        const spy = jest.spyOn(Items.prototype, 'render');
        const component = getComponent({}, props);
        const wrapper = mount(component);
        const itemsCount = global.mockObjects.items.length;

        wrapper.update();

        process.nextTick(() => {
            expect(wrapper.find('.main').length).toBe(1);
            wrapper.find('.main').update();

            expect(wrapper.find('.items').length).toBe(1);
            expect(wrapper.find('.items').find('ul').length).toBe(1);
            expect(wrapper.find('.items').find('ul').children().length).toBe(itemsCount);
            expect(wrapper.find('.items').find('li').length).toBe(itemsCount);
            expect(wrapper.find('figure').length).toBe(itemsCount);
            expect(wrapper.find('.item-detail').length).toBe(itemsCount);
            expect(wrapper.find('.item-detail-header').length).toBe(itemsCount);
            expect(wrapper.find('.item-price-currency').length).toBe(itemsCount);
            expect(wrapper.find('.item-price-currency').at(0).text().trim()).toEqual(global.mockObjects.items[0].price.currency);
            expect(wrapper.find('.item-price-value').length).toBe(itemsCount);
            expect(wrapper.find('.item-detail-body').length).toBe(itemsCount);
            expect(wrapper.find('.item-detail-body').at(0).text()).toEqual(global.mockObjects.items[0].title);
            expect(spy).toHaveBeenCalled();

            done();
        });
    });

    test('Items render empty result when search', done => {
        const props = {
            location: {
                search: `?search=${global.mockObjects.params.query.forEmpty}`
            }
        };

        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();

        process.nextTick(() => {
            expect(wrapper.find('.main').length).toBe(1);
            wrapper.find('.main').update();

            expect(wrapper.find('.error-text').length).toBe(1);
            expect(wrapper.find('.error-text').text()).toEqual('No hay publicaciones que coincidan con tu búsqueda :(');

            done();
        });
    });

    test('Items render empty result when search query is empty', done => {
        const props = {};

        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();

        process.nextTick(() => {
            expect(wrapper.find('.main').length).toBe(1);
            wrapper.find('.main').update();

            expect(wrapper.find('.error-text').length).toBe(1);
            expect(wrapper.find('.error-text').text()).toEqual('No hay publicaciones que coincidan con tu búsqueda :(');

            done();
        });
    });

    test('Items render empty result when search and error ocurrent', done => {
        const props = {
            location: {
                search: `?search=${global.mockObjects.params.query.forError}`
            }
        };

        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();

        process.nextTick(() => {
            expect(wrapper.find('.main').length).toBe(1);
            wrapper.find('.main').update();

            expect(wrapper.find('.error-text').length).toBe(1);
            expect(wrapper.find('.error-text').text()).toEqual('No hay publicaciones que coincidan con tu búsqueda :(');

            done();
        });
    });

/*
    test('Items render empty result search when error ocurrent on mount', done => {
        const props = {
            location: {
                search: `?search=${global.mockObjects.params.query.forError}`
            }
        };

        const component = getComponent({}, props);
        const wrapper = mount(component);

        wrapper.update();
        wrapper.setProps({
            history: {
                location: {
                    search: `?search=${global.mockObjects.params.query.forError}`
                }
            }
        });

        process.nextTick(() => {
            expect(wrapper.find('.main').length).toBe(1);
            wrapper.find('.main').update();

            expect(wrapper.find('.error-text').length).toBe(1);
            expect(wrapper.find('.error-text').text()).toEqual('No hay publicaciones que coincidan con tu búsqueda :(');

            done();
        });
    });
*/
});

function getComponent(context, props = {}) {
    context = context || {};

    return (
        <StaticRouter context={context} >
            <Items {...props} />
        </StaticRouter>
    );
}
