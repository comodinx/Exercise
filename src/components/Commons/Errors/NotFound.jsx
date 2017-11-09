
import React, { Component } from 'react';

import Layout from '../Layout.jsx';

class NotFound extends Component {

    render() {
        return (
            <Layout>
                <div className="error error-404">
                    <h1 className="error-text" >404 <small>Parece que la página no existe :(</small></h1>
                </div>
            </Layout>
        );
    }

}

export default NotFound;
