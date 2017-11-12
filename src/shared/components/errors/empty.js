
import React, { Component } from 'react';

import Layout from '../commons/layout';

class Empty extends Component {

    render() {
        const { props = {} } = this;

        return (
            <Layout {...props} >
                <div className="error error-400">
                    <h1 className="error-text" ><small>No hay publicaciones que coincidan con tu búsqueda :(</small></h1>
                </div>
            </Layout>
        );
    }

}

export default Empty;
