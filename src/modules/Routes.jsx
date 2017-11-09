
import React from 'react';
import { Router, Route, Switch } from 'react-router';

import browserHistory from './History.jsx';
import App from '../components/App/index.jsx';
import Items from '../components/Items/index.jsx';
import ItemDetails from '../components/Items/Details/index.jsx';
import NotFound from '../components/Commons/Errors/NotFound.jsx';

const Routes = () => (
    <Router history={browserHistory} >
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/items/:id" component={ItemDetails} />
            <Route path="/items" component={Items} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);

export default Routes;
