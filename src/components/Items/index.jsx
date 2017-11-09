
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

        let location = (this.props && this.props.location) || (window && window.location) || {};

        this.state = {
            search: qs.parse(location.search || '?search=').search || ''
        };
    }

    componentWillMount() {
        let search = this.state.search;

        if (ITEM_ID_PATTERN.test(search)) {
            return browserHistory.replace('/items/' + search);
        }

        fetch('/api/items?search=' + search)
            .then(res => {
                return res.json();
            })
            .then(res => {
                this.setState(res);
            })
            .catch(error => {
                this.setState({
                    error
                });
            });
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
                        {this.state.items.map(item => {
                            return <Item item={item} key={item.id} />;
                        })}
                    </ul>
                </section>
            </Layout>
        );
    }

}

export default Items;
