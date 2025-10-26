import { type JSX } from 'react';
// import avatar5 from '../../templates/img/avatars/avatar-5.jpg';
// import avatar4 from '../../templates/img/avatars/avatar-4.jpg';
// import avatar3 from '../../templates/img/avatars/avatar-3.jpg';
// import avatar2 from '../../templates/img/avatars/avatar-2.jpg';
// import { useNavigate } from 'react-router';
// import { IconCore } from '../../components/general';

const PageHeader = (): JSX.Element => {
	// const navigate = useNavigate();

	// const cerrarSesion = (e: { preventDefault: () => void }): void => {
	// 	e.preventDefault();
	// 	navigate('/login');
	// };

	return (
		<nav className="navbar navbar-expand navbar-light navbar-bg">
			<a className="sidebar-toggle js-sidebar-toggle">
				<i className="hamburger align-self-center"></i>
			</a>

			
		</nav>
	);
};

export default PageHeader;
