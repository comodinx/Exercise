import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import provider from '../../modules/provider';
import seo from '../../modules/seo';
import * as qs from 'query-string';

import Layout from '../commons/layout';
import Loader from '../commons/loader';
import Empty from '../errors/empty';
import ItemsList from './items';

const ITEM_ID_PATTERN = /^MLA\d+$/;

class Items extends Component {
    static get contextTypes() {
        return {
            router: PropTypes.shape({
                history: PropTypes.shape({
                    push: PropTypes.func.isRequired
                }).isRequired
            }).isRequired
        };
    }

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

    componentWillReceiveProps(props) {
        if (props && props.history && props.history.location) {
            const search = qs.parse(props.history.location.search || '?search=').search || '';
            const { history } = this.context.router;

            if (ITEM_ID_PATTERN.test(search)) {
                return history.push(`/items/${search}`);
            }

            this.setState({
                search: search,
                items: false
            });

            setTimeout(() => Items.fetchInitialData(search)
                .then(res => this.setState(res))
                .catch(error =>
                    this.setState({
                        error
                    })
                ), 250);
        }
    }

    componentDidMount() {
        if (!this.state.items) {
            const { history } = this.context.router;
            const { api = {} } = this.context;
            const search = this.state.search;

            if (ITEM_ID_PATTERN.test(search)) {
                return history.push(`/items/${search}`);
            }

            Items.fetchInitialData(search, api)
                .then(res => this.setState(res))
                .catch(error =>
                    this.setState({
                        error
                    })
                );
        }
    }

    static fetchInitialData(search, options) {
        return provider.getItems(search, options);
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
