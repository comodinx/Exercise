// Polyfills
import 'intl';
import 'intl/locale-data/jsonp/es.js';
import 'isomorphic-fetch';

// Imports
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { addLocaleData } from 'react-intl';
import es from 'react-intl/locale-data/es';
import routes from '../routes';

addLocaleData([...es]);

const App = () => (
    <Switch>
        {routes.map((route, i) => <Route key={i} {...route} />)}
    </Switch>
);

export default App;