import {
	type FC,
	type HTMLAttributeAnchorTarget,
	type MouseEventHandler,
	useEffect,
	useState,
} from 'react';
import { NavLink } from 'react-router-dom';
// import IconCore from './IconCore';

interface NavLinkCoreProps {
	to: string;
	variant: string;
	size?: 'sm' | 'md' | 'lg';
	title?: string;
	icon?: string;
	text?: string;
	hiddenText?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
	className?: string;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
	target?: HTMLAttributeAnchorTarget;
	hidden?: boolean;
	isLoading?: boolean;
	textLoading?: string;
	disabled?: boolean;
}

const NavLinkCore: FC<NavLinkCoreProps> = ({
	variant,
	size,
	title,
	icon = '',
	text = '',
	hiddenText,
	className,
	to,
	onClick,
	hidden = false,
	isLoading = false,
	textLoading = '',
	target,
	disabled = false,
}) => {
	const [classNameFull, setClassNameFull] = useState<string>('');

	useEffect(() => {
		let currentClassName = '';

		if (variant != null) currentClassName += ` btn-${variant}`;
		if (size != null) currentClassName += ` btn-${size}`;
		if (className != null) currentClassName += ` ${className}`;

		setClassNameFull(currentClassName);
	}, [variant, size, className]);

	return (
		<NavLink
			to={to}
			className={`btn ${classNameFull.trim()}`}
			title={title}
			onClick={onClick}
			hidden={hidden}
			target={target}
			style={{ pointerEvents: disabled ? 'none' : 'auto' }}
		>
			{isLoading ? (
				<>
					<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />

					<span
						className={`d-none d-sm-inline-block ${
							text?.trim().length > 0 ? '' : 'visually-hidden'
						}`}
					>
						{textLoading?.trim().length > 0 ? <>{textLoading} </> : 'Loading...'}
					</span>
				</>
			) : (
				<>
					{/* {icon?.trim().length > 0 && <IconCore icon={icon} />} */}
					{text?.trim().length > 0 && (
						<span
							className={`${
								hiddenText?.length != null ? `d-none d-${hiddenText}-inline-block` : ''
							} ${icon?.trim().length !== 0 ? 'ms-1' : ''}`}
						>
							{text}
						</span>
					)}
				</>
			)}
		</NavLink>
	);
};

export default NavLinkCore;
