import React, { Component } from 'react';

import Layout from './layout';

class Loader extends Component {

    render() {
        const { props } = this;

        return (
            <Layout {...props} >
                <div className="loader">
                    <img width="50" height="50" alt="Cargando..." src="/assets/img/loader.gif" className="loader-image" />
                </div>
            </Layout>
        );
    }

}

export default Loader;
