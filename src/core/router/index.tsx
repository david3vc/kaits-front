import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import Home from '../../home';
import Pedido from '../../views/pedido/PedidoMain';
import Producto from '../../views/producto/ProductoMain';
import Cliente from '../../views/cliente/ClienteMain';
import Admin from '../layouts/Admin'

const routes: RouteObject[] = [
	{
		path: '/',
		element: (
			<Admin />
		),
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/pedidos',
				element: <Pedido />,
			},
			{
				path: '/productos',
				element: <Producto />,
			},
			{
				path: '/clientes',
				element: <Cliente />,
			}
		],
	}
];

export default createBrowserRouter(routes);
