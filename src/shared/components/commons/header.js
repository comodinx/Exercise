import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

const ITEM_ID_PATTERN = /^MLA\d+$/;

class Header extends Component {
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

        this.search = this.props.search || '';
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.search = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();

        const { history } = this.context.router;
        const search = this.search;

        history.push(ITEM_ID_PATTERN.test(search) ? `/items/${search}` : `/items?search=${search}`);
    }

    render() {
        return (
            <header className="header header-sticky">
                <div className="bounds">
                    <a className="logo" href="/"></a>
                    <form className="search" onSubmit={this.handleSubmit} >
                        <input defaultValue={this.search} tabIndex="1" type="text" className="search-input" name="search" autoFocus={true} placeholder="Nunca dejes de buscar" onChange={this.handleChange} />
                        <button type="submit" className="search-btn">
                            <img width="20" height="20" src="/assets/img/ic_search.png" className="search-btn-icon" />
                        </button>
                    </form>
                </div>
            </header>
        );
    }
}

export default Header;
