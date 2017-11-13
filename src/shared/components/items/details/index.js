import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import provider from '../../../modules/provider';
import seo from '../../../modules/seo';

import Layout from '../../commons/layout';
import Loader from '../../commons/loader';
import NotFound from '../../errors/notFound';
import Categories from './categories';
import Item from './item';

class ItemDetails extends Component {
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

        initialData = initialData || {};

        this.state = {
            idItem: this.props.match && this.props.match.params && this.props.match.params.id || '',
            categories: initialData.categories,
            item: initialData.item
        };
    }

    componentWillReceiveProps(props) {
        if (props && props.match && props.match.params && props.match.params.id) {
            this.setState({
                idItem: props.match.params.id,
                item: false
            });

            setTimeout(() => ItemDetails.fetchInitialData(props.match.params.id)
                .then(res => this.setState(res))
                .catch(error =>
                    this.setState({
                        error
                    })
                ), 250);
        }
    }

    componentDidMount() {
        if (!this.state.item) {
            ItemDetails.fetchInitialData(this.state.idItem)
                .then(res => this.setState(res))
                .catch(error =>
                    this.setState({
                        error
                    })
                );
        }
    }

    static fetchInitialData(id, options) {
        return provider.getItem(id, options);
    }

    static prepareArgsForFetchInitialData(options) {
        let { id } = options.params;

        return id;
    }

    static prepareSeo(data) {
        return seo.get('item', data);
    }

    render() {
        const { props = {} } = this;
        const { error, item, categories = [] } = this.state;

        if (!error && !item) {
            return <Loader />;
        }
        if (error || !item) {
            return <NotFound />;
        }
        return (
            <Layout {...props} >
                <Helmet {...seo.get('item', { item, categories })} />
                {categories.length > 0 &&
                    <Categories categories={categories} />
                }
                <Item item={item} />
            </Layout>
        );
    }
}

export default ItemDetails;
