import { type JSX } from 'react';
import { Link } from 'react-router-dom';
// import { IconCore } from '../../components/general';
import type { Menu } from '../../../types';
// import { faSitemap } from '@fortawesome/free-solid-svg-icons';

const Sidebar = (): JSX.Element => {


	const menus: Menu[] = [
		{
			nombre: 'Producto',
			urlMenu: '/productos',
			// icono: faSitemap 
		},
		{
			nombre: 'Pedido',
			urlMenu: '/pedidos',
			// icono: faSitemap 
		}
	]

	return (
		<nav id="sidebar" className="sidebar js-sidebar">
			<div className="sidebar-content js-simplebar">
				<a className="sidebar-brand" href="/">
					<span className="align-middle">AdminKit</span>
				</a>
				<ul className="sidebar-nav">
					{
						<>
							{(menus?.length ?? 0) > 0 &&
								menus?.map((menu, index) => (
										<li key={`menu-${index}`} className="sidebar-item">
											{/* {menu.nombre} */}
											<Link className="sidebar-link" to={menu.urlMenu}>
												{/* <IconCore icon={menu.icono} /> */}
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
