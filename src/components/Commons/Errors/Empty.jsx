
import React, { Component } from 'react';

import Layout from '../Layout.jsx';

class Empty extends Component {

    render() {
        return (
            <Layout>
                <div className="error error-400">
                    <h1 className="error-text" ><small>No hay publicaciones que coincidan con tu búsqueda :(</small></h1>
                </div>
            </Layout>
        );
    }

}

export default Empty;
