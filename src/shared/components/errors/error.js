import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import seo from '../../modules/seo';

import Layout from '../commons/layout';

class Error extends Component {

    render() {
        const { props } = this;

        return (
            <Layout {...props} >
                <Helmet {...seo.get('error')} />
                <div className="error error-500">
                    <h1 className="error-text" ><small>Algo salio mal :(</small></h1>
                </div>
            </Layout>
        );
    }

}

export default Error;
