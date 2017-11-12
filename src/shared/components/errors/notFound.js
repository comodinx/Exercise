
import React, { Component } from 'react';

import Layout from '../commons/layout';

class NotFound extends Component {

    render() {
        const { props = {} } = this;

        return (
            <Layout {...props} >
                <div className="error error-404">
                    <h1 className="error-text" >404 <small>Parece que la página no existe :(</small></h1>
                </div>
            </Layout>
        );
    }

}

export default NotFound;
