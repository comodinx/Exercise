import React, { Component } from 'react';
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
        let hasStatus = true;
        let description;
        let condition;

        if (item.description) {
            description = {__html: item.description};
        }

        if (item.condition != 'not_specified') {
            condition = item.condition == 'new' ? 'Nuevo' : 'Usado';
        }

        hasStatus = !!(item.sold_quantity || condition);

        return (
            <section className="item-page">
                <div className="item" >
                    <div className="item-row" >
                        <figure className="item-image" >
                            <img width="500" height="500" alt={item.title} src={item.picture} className="item-image-src" />
                        </figure>
                        <div className="item-detail" >
                            {hasStatus &&
                                <div className="item-status">
                                    {condition &&
                                        <span className="item-condition">{condition}</span>
                                    }
                                    {item.sold_quantity > 0 &&
                                        <span className="item-sold">{(condition ? item.price.decimals : '') + item.sold_quantity + ' vendido' + (item.sold_quantity > 1 ? 's' : '')}</span>
                                    }
                                </div>
                            }
                            <div className="item-title clear" >
                                <h1>{item.title}</h1>
                            </div>
                            <div className="item-price clear" >
                                <IntlProvider locale="en">
                                    <div>
                                        <span className="item-price-currency">{item.price.currency}&nbsp;</span>
                                        <span className="item-price-value">
                                            <FormattedNumber value={item.price.amount} />
                                            <span className="item-price-decimals" ><FormattedNumber value={item.price.decimals} minimumIntegerDigits={2} maximumIntegerDigits={2} /></span>
                                        </span>
                                    </div>
                                </IntlProvider>
                            </div>
                            <div className="item-button clear" >
                                Comprar
                            </div>
                        </div>
                    </div>
                    {description &&
                        <div className="item-row" >
                            <div className="item-description" >
                                <span className="item-description-title" >Descripción del producto</span>
                                <div className="item-description-raw" dangerouslySetInnerHTML={description} />
                            </div>
                        </div>
                    }
                </div>
            </section>
        );
    }

}

export default Item;
