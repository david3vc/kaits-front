import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import Home from '../../home';
import Pedido from '../../views/pedido/PedidoMain';
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
			}
		],
	}
];

export default createBrowserRouter(routes);
