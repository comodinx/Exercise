
import React, { Component } from 'react';
import { render } from 'react-dom';

// Polyfills
import 'intl';
import 'intl/locale-data/jsonp/es.js';

// Routes
import Routes from './modules/Routes.jsx';

render(
    <Routes />,
    document.getElementById('app')
);
