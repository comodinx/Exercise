
import React, { Component } from 'react';
import * as qs from 'query-string';

import browserHistory from '../../modules/History.jsx';
import Layout from '../Commons/Layout.jsx';
import Loader from '../Commons/Loader.jsx';
import Empty from '../Commons/Errors/Empty.jsx';
import Item from './Item.jsx';

const ITEM_ID_PATTERN = /^MLA\d+$/;

class Items extends Component {

    constructor(props) {
        super(props);

        this.state = {
            search: qs.parse(((this.props && this.props.location) || (window && window.location) || {}).search || '?search=').search || ''
        };
    }

    componentWillReceiveProps(props) {
        if (props && props.history && props.history.location) {
            let search = qs.parse((props.history.location || {}).search || '?search=').search || '';

            this.setState({
                search,
                items: false
            });

            setTimeout(() => this.fetchItems(search), 250);
        }
    }

    componentWillMount() {
        this.fetchItems();
    }

    fetchItems(query) {
        let search = query || this.state.search;

        if (ITEM_ID_PATTERN.test(search)) {
            return browserHistory.replace(`/items/${search}`);
        }

        fetch(`/api/items?search=${search}`)
            .then(res => res.json())
            .then(res => this.setState(res))
            .catch(error =>
                this.setState({
                    error
                })
            );
    }

    render() {
        if (!this.state || (!this.state.error && !this.state.items)) {
            return <Loader />;
        }

        if (this.state.error || (this.state.items && !this.state.items.length)) {
            return <Empty />;
        }

        return (
            <Layout>
                <section className="items" >
                    <ul className="items-results" >
                        {this.state.items.map(item => <Item item={item} key={item.id} /> )}
                    </ul>
                </section>
            </Layout>
        );
    }

}

export default Items;
