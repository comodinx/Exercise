import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import seo from '../../modules/seo';

import Layout from '../commons/layout';

class NotFound extends Component {

    render() {
        const { props } = this;

        return (
            <Layout {...props} >
                <Helmet {...seo.get('error')} />
                <div className="error error-404">
                    <h1 className="error-text" >404 <small>Parece que la página no existe :(</small></h1>
                </div>
            </Layout>
        );
    }

}

export default NotFound;
