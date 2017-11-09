
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
        if (url.startsWith('/api/items?search=error') || url.startsWith('/api/items/error')) {
            throw new Error('Force error');
        }
        else if (url.startsWith('/api/items?search=empty')) {
            return global.mockObjects.itemsEmpty;
        }
        else if (url.startsWith('/api/items?search') && !url.startsWith('/api/items?search=MLA')) {
            return global.mockObjects.items;
        }
        return global.mockObjects.item;
    }
}));

// Configure static objects
global.mockObjects = {};

global.mockObjects.event = {
    preventDefault: jest.fn(),
    target: {
        value: 'autos'
    }
};

global.mockObjects.itemsEmpty = {"items":[],"author":{"name":"Nicolas","lastname":"Molina"}};

global.mockObjects.items = {"items":[{"id":"MLA690608428","title":"Chevrolet Cruze Ltz  5 Puertas1.4 Turbo Manual No Usado Full","price":{"currency":"$","amount":137000,"decimals":0},"condition":"new","picture":"http://mla-s1-p.mlstatic.com/660933-MLA26286732903_112017-I.jpg","free_shipping":false,"location":"Capital Federal"},{"id":"MLA690607494","title":"Chevrolet Tracker Awd Ltz 5 Puertas 4x4x2 No S10 Usado Full","price":{"currency":"$","amount":135000,"decimals":0},"condition":"new","sold_quantity":0,"picture":"http://mla-s1-p.mlstatic.com/711926-MLA26286940494_112017-I.jpg","free_shipping":false,"location":"Capital Federal"},{"id":"MLA690515930","title":"208 Allure * C/nav * Impecable * 1°dueño * Blanco* Permuto","price":{"currency":"$","amount":229500,"decimals":0},"condition":"used","sold_quantity":0,"picture":"http://mla-s1-p.mlstatic.com/824535-MLA26283132397_112017-I.jpg","free_shipping":false,"location":"Capital Federal"},{"id":"MLA690394758","title":"Renault Mégane Ii","price":{"currency":"$","amount":95000,"decimals":0},"condition":"used","sold_quantity":0,"picture":"http://mla-s1-p.mlstatic.com/871899-MLA26279402021_112017-I.jpg","free_shipping":false,"location":"Capital Federal"}],"author":{"name":"Nicolas","lastname":"Molina"}};

global.mockObjects.item = {"categories":["Autos, Motos y Otros","Autos y Camionetas","Chevrolet","Cruze II"],"item":{"id":"MLA690608428","title":"Chevrolet Cruze Ltz  5 Puertas1.4 Turbo Manual No Usado Full","description":"<p><img src=\"https://assets-cdn.static-gm.com/Assets/7ed13197-4f11-4080-b210-e9dc35de8610/ccbe1a79-a94b-4c49-b12b-f6c19e2a3d1c/v-1485999741/Desktop.jpg\" height=\"363\" width=\"901\" /></p><p style=\"text-align: center;\"><span style=\"font-size: xx-large; font-family: tahoma,arial,helvetica,sans-serif;\"></span><br /><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\"><span style=\"color: #ff9900;\">CONCESIONARIO OFICIAL</span> CHEVROLET LIDER EN VENTAS</span></strong><br /><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\">VENTAS A TODO EL PAIS</span></strong><br /><br /><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\">TODOS LOS MEDIOS DE PAGO</span></strong><br /><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\">TOMAMOS UNIDADES USADAS AL MEJOR PRECIO EN PARTE DE PAGO</span></strong><br /><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\">TASA 0 % POR CUPO LIMITADO CONSULTA</span></strong></p><p style=\"text-align: center;\"><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\"><br /></span></strong></p><p style=\"text-align: center;\"><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\"><span style=\"font-size: xx-large;\">ENTREGA INMEDIATA</span></span></strong></p><p style=\"text-align: center;\"><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\"><span style=\"font-size: xx-large;\"><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\">LLAME <span style=\"color: #ff9900;\">AHORA</span> MISMO</span></strong></span></span></strong></p><p style=\"text-align: center;\"><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\"><span style=\"font-size: xx-large;\"></span> <span style=\"font-size: xx-large; font-family: trebuchet ms,geneva; color: #ff9900;\"><span style=\"color: #ff0000;\">Linea Directa</span> :&nbsp; 0111568268333</span></span></strong></p><p style=\"text-align: center;\"><strong><span style=\"font-size: x-large; font-family: trebuchet ms,geneva;\"><span style=\"font-size: xx-large; font-family: trebuchet ms,geneva; color: #ff9900;\"></span><img src=\"https://www.forbox.com.br/images/adaptacao/banner-chevrolet.jpg\" height=\"193\" width=\"861\" /><br /></span></strong></p>","price":{"currency":"$","amount":137000,"decimals":0},"condition":"new","sold_quantity":0,"picture":"http://mla-s1-p.mlstatic.com/660933-MLA26286732903_112017-O.jpg","free_shipping":false,"location":"Capital Federal"},"author":{"name":"Nicolas","lastname":"Molina"}};
