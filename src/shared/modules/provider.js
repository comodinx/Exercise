class Provider {
    getItems(search, options) {
        const { baseUrl = '' } = (options || {});

        return fetch(`${baseUrl}/api/items?search=${search}`)
            .then(res => res.json());
    }

    getItem(id, options) {
        const { baseUrl = '' } = (options || {});

        return fetch(`${baseUrl}/api/items/${id}`)
            .then(res => res.json());
    }
}

export default new Provider();
