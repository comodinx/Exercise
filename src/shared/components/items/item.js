import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IntlProvider, FormattedNumber } from 'react-intl';

class Item extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item
        };
    }

    render() {
        const item = this.state.item;

        return (
            <li className="item" >
                <div className="item-row" >
                    <figure className="item-image" >
                        <Link to={'/items/' + item.id} className="item-image-link" >
                            <img width="180" height="180" alt={item.title} src={item.picture} className="item-image-src" />
                        </Link>
                    </figure>
                    <div className="item-detail" >
                        <div className="item-detail-header" >
                            <Link to={'/items/' + item.id} className="item-price" >
                                <span className="item-price-currency">{item.price.currency}&nbsp;</span>
                                <span className="item-price-value">
                                    <IntlProvider locale="en">
                                        <FormattedNumber value={item.price.amount} />
                                    </IntlProvider>
                                </span>
                                {item.free_shipping &&
                                    <img width="18" height="18" alt="Envio gratis" src="/assets/img/ic_shipping.png" className="item-shipping" />
                                }
                                {item.address &&
                                    <span className="item-address">{item.address}</span>
                                }
                            </Link>
                        </div>
                        <div className="item-detail-body clear" >
                            <Link to={'/items/' + item.id} className="item-title" >{item.title}</Link>
                        </div>
                    </div>
                </div>
            </li>
        );
    }

}

export default Item;
