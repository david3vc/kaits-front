import { type JSX, type ReactNode } from 'react';

interface BaseProps {
	variant: string;
	children: ReactNode;
	className?: string;
	title?: string;
	pill?: boolean;
}
const BadgeCore = ({ children, variant, className, title, pill }: BaseProps): JSX.Element => {
	return (
		<span
			className={`badge text-bg-${variant} ${className} ${pill ?? false ? 'rounded-pill' : ''}`}
			title={title}
		>
			{children}
		</span>
	);
};

export default BadgeCore;
