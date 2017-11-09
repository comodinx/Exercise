
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactIntl, { IntlProvider, FormattedNumber } from 'react-intl';

class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item
        };
    }

    render() {
        return (
            <li className="item" >
                <div className="item-row" >
                    <div className="item-image" >
                        <Link to={'/items/' + this.state.item.id} className="item-image-link" >
                            <img width="160" height="160" alt={this.state.item.title} src={this.state.item.picture} className="item-image-src" />
                        </Link>
                    </div>
                    <div className="item-detail" >
                        <div className="item-price" >
                            <Link to={'/items/' + this.state.item.id} className="item-price-link" >
                                <span className="item-price-currency">{this.state.item.price.currency}&nbsp;</span>
                                <span className="item-price-value">
                                    <IntlProvider locale="en">
                                        <FormattedNumber value={this.state.item.price.amount} />
                                    </IntlProvider>
                                </span>
                            </Link>
                        </div>
                        <div className="item-title clear" >
                            <Link to={'/items/' + this.state.item.id} className="item-title-link" >{this.state.item.title}</Link>
                        </div>
                    </div>
                </div>
            </li>
        );
    }

}

export default Item;
