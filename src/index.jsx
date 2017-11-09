
import React, { Component } from 'react';
import { render } from 'react-dom';
import 'intl';

import Routes from './modules/Routes.jsx';

render(
    <Routes />,
    document.getElementById('app')
);
