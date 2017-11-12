import React, { Component } from 'react';
import * as qs from 'query-string';

import Header from './header';

class Layout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            search: qs.parse(((this.props && this.props.location) || {}).search || '?search=').search || ''
        };
    }

    render() {
        return (
            <div className="container" >
                <Header search={this.state && this.state.search || ''} />
                <div className="main">
                    {this.props.children}
                </div>
            </div>
        );
    }

}

export default Layout;
