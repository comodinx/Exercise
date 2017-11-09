
import React, { Component } from 'react';
import { Redirect } from 'react-router';

import browserHistory from '../../modules/History.jsx';

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

        browserHistory.push('/items?search=' + this.state.search);
    }

    render() {
        return (
            <header className="header header-sticky">
                <div className="bounds">
                    <a className="logo" href="/"></a>
                    <form className="search" onSubmit={this.handleSubmit} >
                        <input defaultValue={this.state.search} tabIndex="1" type="text" className="search-input" name="search" autoFocus={true} placeholder="Nunca dejes de buscar" onChange={this.handleChange} />
                        <button type="submit" className="search-btn">
                            <i className="fa fa-search"><span></span></i>
                        </button>
                    </form>
                </div>
            </header>
        );
    }

}

export default Header;
