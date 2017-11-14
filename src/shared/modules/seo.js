import numeral from 'numeral';

const METAS = {
    items: options => {
        const titleRaw = `Encontrá ${options.search || 'lo que estas buscando'}`;
        const title = `${titleRaw} en Exercise`;
        const description = `${title}. Descubrí la mejor forma de comprar online.`;

        return {
            meta: [{
                property: 'og:title',
                content: titleRaw
            }, {
                name: 'description',
                content: description
            }],
            title
        };
    },
    item: options => {
        const price = numeral(options.item.price.amount).format(`${options.item.price.currency} 0,0[.]00`);
        const titleRaw = `${options.item.title} - ${price}`;
        const title = `${titleRaw} en Exercise`;
        const description = `${titleRaw}. Exercise - Donde comprar y vender de todo`;
        return {
            meta: [{
                property: 'og:title',
                content: titleRaw
            }, {
                name: 'description',
                content: description
            }],
            title
        };
    },
    'error': () => {
        return {
            title: 'Exersice - Donde comprar y vender de todo'
        };
    }
};

const DEFAULT_METAS = () => {
    return {
        title: 'Exersice - Donde comprar y vender de todo',
        meta: [{
            name: 'description',
            content: 'La comunidad de compra y venta online más grande de América Latina.'
        }]
    };
};

class Seo {
    get(name, options) {
        return (METAS[name] || DEFAULT_METAS)(options);
    }
}

export default new Seo();
