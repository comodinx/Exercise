import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import provider from '../../modules/provider';
import seo from '../../modules/seo';
import * as qs from 'query-string';

import Layout from '../commons/layout';
import Loader from '../commons/loader';
import Empty from '../errors/empty';
import ItemsList from './items';

class Items extends Component {
    constructor(props) {
        super(props);

        let initialData;

        if (__isBrowser__) {
            initialData = window.__initialData__;
            delete window.__initialData__;
        }
        else {
            initialData = props.staticContext.initialData;
        }

        this.state = {
            search: qs.parse(((this.props && this.props.location) || {}).search || '?search=').search || '',
            items: (initialData || {}).items
        };
    }

    componentDidMount() {
        if (!this.state.items) {
            Items.fetchInitialData(this.state.search)
                .then(res => this.setState(res))
                .catch(error =>
                    this.setState({
                        error
                    })
                );
        }
    }

    static fetchInitialData(search) {
        return provider.getItems(search);
    }

    static prepareArgsForFetchInitialData(options) {
        let { search } = options.query;

        return search;
    }

    static prepareSeo(data, search) {
        return seo.get('items', { search });
    }

    render() {
        const { props = {} } = this;
        const { error, items, search } = this.state;

        if (!error && !items) {
            return <Loader />;
        }
        if (error || !items || !items.length) {
            return <Empty />;
        }
        return (
            <Layout {...props} >
                <Helmet {...seo.get('items', { search })} />
                <ItemsList items={items} />
            </Layout>
        );
    }
}

export default Items;
