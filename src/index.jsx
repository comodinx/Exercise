
// Polyfills
import 'intl';
import 'intl/locale-data/jsonp/es.js';

// Imports
import React from 'react';
import { render } from 'react-dom';
import { addLocaleData } from 'react-intl';
import es from 'react-intl/locale-data/es';

addLocaleData([...es]);

// Routes
import Routes from './modules/Routes.jsx';

render(
    <Routes />,
    document.getElementById('app')
);
