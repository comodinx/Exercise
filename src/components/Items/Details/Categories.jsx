
import React, { Component } from 'react';

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: this.props.categories
        };
    }

    render() {
        return (
            <section className="categories" >
                <ul className="categories-results" >
                    {this.state.categories.map(category => {
                        return (
                            <li className="category" key={category}>
                                <span className="category-name">{category}</span>
                            </li>
                        );
                    })}
                </ul>
            </section>
        );
    }

}

export default Categories;
