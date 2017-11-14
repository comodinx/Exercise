import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import seo from '../../modules/seo';

import Layout from '../commons/layout';

class Empty extends Component {

    render() {
        const { props } = this;

        return (
            <Layout {...props} >
                <Helmet {...seo.get('error')} />
                <div className="error error-400">
                    <h1 className="error-text" ><small>No hay publicaciones que coincidan con tu búsqueda :(</small></h1>
                </div>
            </Layout>
        );
    }

}

export default Empty;
