import React, { Component } from 'react';

import Item from './item';

class ItemsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items
        };
    }

    render() {
        return (
            <section className="items" >
                <ul className="items-results" >
                    {this.state.items.map(item => <Item item={item} key={item.id} /> )}
                </ul>
            </section>
        );
    }
}

export default ItemsList;
