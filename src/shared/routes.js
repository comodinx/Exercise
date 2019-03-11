import Home from './components/home';
import Items from './components/items';
import ItemDetails from './components/items/details';
import NotFound from './components/errors/notFound';
import Error500 from './components/errors/error';

const routes = [{
    path: '/',
    exact: true,
    component: Home
}, {
    path: '/items/:id',
    component: ItemDetails
}, {
    path: '/items',
    component: Items
}, {
    path: '/500',
    component: Error500
}, {
    component: NotFound
}];

export default routes;
