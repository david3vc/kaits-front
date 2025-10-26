import { type JSX, type ReactNode } from 'react';
import AccordionCollapse from 'react-bootstrap/AccordionCollapse';
import { useAccordionCoreItem } from '../context/AccordionCoreItemContext';

interface BodyProps {
	children?: ReactNode;
	className?: string;
}
const AccordionCoreBody = ({ children, className }: BodyProps): JSX.Element => {
	const { eventKey } = useAccordionCoreItem();

	return (
		<AccordionCollapse eventKey={eventKey}>
			<section className={`card-body ${className ?? ''}`}>{children}</section>
		</AccordionCollapse>
	);
};

export default AccordionCoreBody;
