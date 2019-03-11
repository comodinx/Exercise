
import 'raf/polyfill';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Configure enzyme
Enzyme.configure({ adapter: new Adapter() });

// Configure fetch. Mock responses
global.fetch = jest.fn().mockImplementation(url => Promise.resolve({
    ok: true,
    Id: '1',
    json: () => {
        if (url.startsWith(`/api/items?search=${global.mockObjects.params.query.forError}`)) {
            throw new Error('Force error');
        }
        else if (url.startsWith(`/api/items?search=${global.mockObjects.params.query.forResults}`)) {
            return global.mockObjects.responses.items();
        }
        else if (url.startsWith(`/api/items?search=${global.mockObjects.params.query.forEmpty}`)) {
            return global.mockObjects.response.items(/* withoutItems */ true);
        }
        else if (url.startsWith('/api/items/MLA00')) {
            return global.mockObjects.responses.item(parseInt(url.replace('/api/items/MLA', ''), 10) - 1);
        }
        return global.mockObjects.responses.error();
    }
}));

// Configure constans
global.__isBrowser__ = true;

// Configure static objects
global.mockObjects = {};

global.mockObjects.event = {
    preventDefault: jest.fn(),
    target: {
        value: 'autos'
    }
};

global.mockObjects.author = {"name":"Nicolas","lastname":"Molina"};
global.mockObjects.categories = [
    {"id":"MLA0124","name":"Autos, Motos y Otros"},
    {"id":"MLA1744","name":"Autos y Camionetas"},
    {"id":"MLA3185","name":"Chevrolet"},
    {"id":"MLA404045","name":"Cruze II"}
];
global.mockObjects.items = [
    {"id":"MLA001","title":"Chevrolet Cruze Ltz 5 Puertas1.4 Turbo Manual No Usado Full","description":"<p><img src=\"https://assets-cdn.static-gm.com/Assets/7ed13197-4f11-4080-b210-e9dc35de8610/ccbe1a79-a94b-4c49-b12b-f6c19e2a3d1c/v-1485999741/Desktop.jpg\" height=\"363\" width=\"901\" /></p><p style=\"text-align: center;\"><span style=\"font-size: xx-large; font-family: tahoma,arial,helvetica,sans-serif;\"></span><br /><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\"><span style=\"color: #ff9900;\">CONCESIONARIO OFICIAL</span> CHEVROLET LIDER EN VENTAS</span></strong><br /><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\">VENTAS A TODO EL PAIS</span></strong><br /><br /><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\">TODOS LOS MEDIOS DE PAGO</span></strong><br /><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\">TOMAMOS UNIDADES USADAS AL MEJOR PRECIO EN PARTE DE PAGO</span></strong><br /><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\">TASA 0 % POR CUPO LIMITADO CONSULTA</span></strong></p><p style=\"text-align: center;\"><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\"><br /></span></strong></p><p style=\"text-align: center;\"><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\"><span style=\"font-size: xx-large;\">ENTREGA INMEDIATA</span></span></strong></p><p style=\"text-align: center;\"><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\"><span style=\"font-size: xx-large;\"><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\">LLAME <span style=\"color: #ff9900;\">AHORA</span> MISMO</span></strong></span></span></strong></p><p style=\"text-align: center;\"><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\"><span style=\"font-size: xx-large;\"></span> <span style=\"font-size: xx-large; font-family: trebuchet ms,geneva; color: #ff9900;\"><span style=\"color: #ff0000;\">Linea Directa</span> :&nbsp; 0111568268333</span></span></strong></p><p style=\"text-align: center;\"><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\"><span style=\"font-size: xx-large; font-family: trebuchet ms,geneva; color: #ff9900;\"></span><img src=\"https://www.forbox.com.br/images/adaptacao/banner-chevrolet.jpg\" height=\"193\" width=\"861\" /><br /></span></strong></p>","price":{"currency":"$","amount":137000,"decimals":0},"condition":"new","sold_quantity":1,"picture":"http://mla-s1-p.mlstatic.com/660933-MLA26286732903_112017-O.jpg","free_shipping":false,"location":"Capital Federal"},
    {"id":"MLA002","title":"Chevrolet Cruze Ltz 5 Puertas1.4 Turbo Manual No Usado Full","price":{"currency":"$","amount":137000,"decimals":0},"condition":"new","sold_quantity":2,"picture":"http://mla-s1-p.mlstatic.com/660933-MLA26286732903_112017-O.jpg","free_shipping":false,"location":"Capital Federal"},
    {"id":"MLA003","title":"Chevrolet Cruze Ltz 5 Puertas1.4 Turbo Manual No Usado Full","price":{"currency":"$","amount":137000,"decimals":0},"condition":"not_specified","sold_quantity":1,"picture":"http://mla-s1-p.mlstatic.com/660933-MLA26286732903_112017-O.jpg","free_shipping":false,"location":"Capital Federal"},
    {"id":"MLA004","title":"Chevrolet Cruze Ltz 5 Puertas1.4 Turbo Manual No Usado Full","price":{"currency":"$","amount":137000,"decimals":0},"condition":"used","sold_quantity":0,"picture":"http://mla-s1-p.mlstatic.com/660933-MLA26286732903_112017-O.jpg","free_shipping":false},
    {"id":"MLA005","title":"Chevrolet Cruze Ltz 5 Puertas1.4 Turbo Manual No Usado Full","price":{"currency":"$","amount":137000,"decimals":0},"condition":"not_specified","sold_quantity":0,"picture":"http://mla-s1-p.mlstatic.com/660933-MLA26286732903_112017-O.jpg","free_shipping":true,"location":"Capital Federal"}
];

global.mockObjects.responses = {
    items: withoutItems => {
        return {
            items: withoutItems ? [] : global.mockObjects.items,
            categories: withoutItems ? null : global.mockObjects.categories,
            author: global.mockObjects.author
        };
    },
    item: itemIndex => {
        return {
            item: itemIndex >= 0 && itemIndex < global.mockObjects.items.length ? global.mockObjects.items[itemIndex] : null,
            categories: global.mockObjects.categories,
            author: global.mockObjects.author
        };
    },
    error: () => {
        return {
            error: new Error('Force error'),
            author: global.mockObjects.author
        };
    }
};

global.mockObjects.params = {
    query: {
        forEmpty: 'djhgdgdghjgdhgdgdghfkdgdkhdkjhfkhgfhfkhfkhjfhjkfhjgkhjfhjfk',
        forResults: 'autos',
        forError: 'error'
    }
};
