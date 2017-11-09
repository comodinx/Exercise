
import React, { Component } from 'react';
import * as qs from 'query-string';

import Header from './Header.jsx';

class Layout extends Component {

    constructor(props) {
        super(props);

        var location = (this.props && this.props.location) || (window && window.location) || {};

        this.state = {
            search: qs.parse(location.search || '?search=').search || ''
        };
    }

    render() {
        return (
            <div className="container" >
                <Header search={this.state && this.state.search || ''} {...this.props} />
                <div className="main">
                    {this.props.children}
                </div>
            </div>
        );
    }

}

export default Layout;
