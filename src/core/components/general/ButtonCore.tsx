import { type FC, type MouseEventHandler, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
// import IconCore from './IconCore';

interface ButtonCoreProps {
	variant: string;
	size?: 'sm' | 'md' | 'lg';
	title?: string;
	icon?: string;
	text?: string;
	hiddenText?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
	className?: string;
	type?: 'submit' | 'reset' | 'button' | undefined;
	form?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	hidden?: boolean;
	isLoading?: boolean;
	textLoading?: string;
	disabled?: boolean;
}

const ButtonCore: FC<ButtonCoreProps> = ({
	variant,
	size,
	title,
	icon = '',
	text = '',
	hiddenText,
	className,
	type = 'button',
	form,
	onClick,
	hidden = false,
	isLoading = false,
	textLoading = '',
	disabled = false,
}) => {
	const [classNameFull, setClassNameFull] = useState<string>('');

	useEffect(() => {
		let currentClassName = '';

		// if (variant != null) currentClassName += ` btn-${variant}`;
		if (size != null) currentClassName += ` btn-${size}`;
		if (className != null) currentClassName += ` ${className}`;

		setClassNameFull(currentClassName);
	}, [size, className/*, variant*/]);

	return (
		<Button
			variant={variant}
			// size={size}
			title={title}
			onClick={onClick}
			// className={className}
			className={`btn ${classNameFull.trim()}`}
			form={form}
			type={type}
			hidden={hidden}
			disabled={disabled || isLoading}
		>
			{isLoading ? (
				<>
					<span className="spinner-grow spinner-grow-sm " role="status" aria-hidden="true" />

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
		</Button>
	);
};

export default ButtonCore;
