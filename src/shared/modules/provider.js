import React from 'react';

class Provider {
    getOptions(options) {
        if (!options && __isBrowser__) {
            options = window.__apiOptions__ || {
                baseUrl: 'http://localhost:3000'
            };
        }
        return options;
    }

    getItems(search, options) {
        const { baseUrl } = this.getOptions(options);

        return fetch(`${baseUrl}/api/items?search=${search}`)
            .then(res => res.json());
    }

    getItem(id, options) {
        const { baseUrl } = this.getOptions(options);

        return fetch(`${baseUrl}/api/items/${id}`)
            .then(res => res.json());
    }
}

export default new Provider();
