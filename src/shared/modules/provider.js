import React from 'react';

class Provider {
    getItems(search) {
        return fetch(`http://localhost:3000/api/items?search=${search}`)
            .then(res => res.json());
    }

    getItem(id) {
        return fetch(`http://localhost:3000/api/items/${id}`)
            .then(res => res.json());
    }
}

export default new Provider();
