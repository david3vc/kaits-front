import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import type { Menu } from '../../../types';

const Sidebar = (): JSX.Element => {


	const menus: Menu[] = [
		{
			nombre: 'Producto',
			urlMenu: '/productos',
		},
		{
			nombre: 'Cliente',
			urlMenu: '/clientes',
		},
		{
			nombre: 'Pedido',
			urlMenu: '/pedidos',
		},
	]

	return (
		<nav id="sidebar" className="sidebar js-sidebar">
			<div className="sidebar-content js-simplebar">
				<a className="sidebar-brand" href="/">
					<span className="align-middle">Kaits</span>
				</a>
				<ul className="sidebar-nav">
					{
						<>
							{(menus?.length ?? 0) > 0 &&
								menus?.map((menu, index) => (
										<li key={`menu-${index}`} className="sidebar-item">
											<Link className="sidebar-link" to={menu.urlMenu}>
												<span className="align-middle">{menu.nombre}</span>
											</Link>
										</li>
								))}
						</>
					}
				</ul>
			</div>
		</nav>
	);
};

export default Sidebar;
