import Home from './components/home';
import Items from './components/items';
import ItemDetails from './components/items/details';
import NotFound from './components/errors/notFound';

const routes = [{
    path: '/',
    exact: true,
    component: Home
}, {
    path: '/items/:id',
    component: ItemDetails
}, {
    // path: new RegExp('^\/items(?:\/(?=.*))?(?=\/|.*)', 'i'),
    path: '/items',
    component: Items
}, {
    component: NotFound
}];

export default routes;