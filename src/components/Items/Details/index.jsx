
import React, { Component } from 'react';
import ReactIntl, { IntlProvider, FormattedNumber, addLocaleData } from 'react-intl';
import es from 'react-intl/locale-data/es';

import Layout from '../../Commons/Layout.jsx';
import Loader from '../../Commons/Loader.jsx';
import NotFound from '../../Commons/Errors/NotFound.jsx';
import Categories from './Categories.jsx';

addLocaleData([...es]);

class ItemDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idItem: this.props.match && this.props.match.params && this.props.match.params.id || ''
        };
    }

    componentWillMount() {
        fetch('/api/items/' + this.state.idItem)
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
        if (!this.state || (!this.state.error && !this.state.item)) {
            return <Loader />;
        }

        if (this.state.error || !this.state.item) {
            return <NotFound />;
        }

        var categories = this.state.categories || [];
        var hasStatus = true;
        var description = null;
        var condition = null;

        if (this.state.item.description) {
            description = {__html: this.state.item.description};
        }

        if (this.state.item.condition != 'not_specified') {
            condition = this.state.item.condition == 'new' ? 'Nuevo' : 'Usado';
        }

        hasStatus = !!(description || condition);

        return (
            <Layout>
                {categories.length > 0 &&
                    <Categories categories={categories} />
                }
                <section className="item-page">
                    <div className="item" >
                        <div className="item-row" >
                            <div className="item-image" >
                                <img width="500" height="500" alt={this.state.item.title} src={this.state.item.picture} className="item-image-src" />
                            </div>
                            <div className="item-detail" >
                                {hasStatus &&
                                    <div className="item-status" >
                                        {condition &&
                                            <span>{condition}</span>
                                        }
                                        {this.state.item.sold_quantity > 0 &&
                                            <span>&nbsp;-&nbsp;{this.state.item.sold_quantity + " vendidos"}</span>
                                        }
                                    </div>
                                }
                                <div className="item-title clear" >
                                    <h1>{this.state.item.title}</h1>
                                </div>
                                <div className="item-price clear" >
                                    <IntlProvider locale="es">
                                        <div>
                                            <span className="item-price-currency">{this.state.item.price.currency}&nbsp;</span>
                                            <span className="item-price-value">
                                                <FormattedNumber value={this.state.item.price.amount} />
                                                <span className="item-price-decimals" ><FormattedNumber value={this.state.item.price.decimals} minimumIntegerDigits={2} /></span>
                                            </span>
                                        </div>
                                    </IntlProvider>
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
            </Layout>
        );
    }

}

export default ItemDetails;
