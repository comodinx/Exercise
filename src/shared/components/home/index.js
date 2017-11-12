import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import seo from '../../modules/seo';

import Layout from '../commons/layout';

class Home extends Component {

    render() {
        const { props = {} } = this;

        return (
            <Layout {...props} >
                <Helmet {...seo.get('home')} />
            </Layout>
        );
    }

}

export default Home;
