
import React, { Component } from 'react';
import { Redirect } from 'react-router';

import browserHistory from '../../modules/History.jsx';

const ITEM_ID_PATTERN = /^MLA\d+$/;

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: this.props.search || ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            search: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        var search = this.state.search;

        if (ITEM_ID_PATTERN.test(search)) {
            return browserHistory.push('/items/' + search, {
                id: search
            });
        }
        browserHistory.push('/items?search=' + search, {
            search
        });
    }

    render() {
        return (
            <header className="header header-sticky">
                <div className="bounds">
                    <a className="logo" href="/"></a>
                    <form className="search" onSubmit={this.handleSubmit} >
                        <input defaultValue={this.state.search} tabIndex="1" type="text" className="search-input" name="search" autoFocus={true} placeholder="Nunca dejes de buscar" onChange={this.handleChange} />
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
