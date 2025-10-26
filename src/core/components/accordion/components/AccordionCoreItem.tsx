import { type JSX, type ReactNode } from 'react';
import { AccordionCoreItemContextProvider } from '../context/AccordionCoreItemContext';

interface ItemProps {
	eventKey: string;
	children?: ReactNode;
	className?: string;
}

const AccordionCoreItem = ({ eventKey, children, className }: ItemProps): JSX.Element => {
	return (
		<AccordionCoreItemContextProvider eventKey={eventKey}>
			<article className={`card ${className ?? ''}`}>{children}</article>
		</AccordionCoreItemContextProvider>
	);
};

export default AccordionCoreItem;
