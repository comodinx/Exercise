
import React from 'react';
import { mount } from 'enzyme';

jest.mock('react-dom', () => ({
    render: jest.fn()
}));

describe('Test <Index /> Started point', () => {
    test('Index render function', () => {
        require('../src/index.jsx');
    });
});
