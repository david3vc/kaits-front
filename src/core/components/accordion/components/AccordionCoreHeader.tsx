import { type FC, type JSX, type ReactNode, useContext } from 'react';
import AccordionContext, { isAccordionItemSelected } from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { useAccordionCoreItem } from '../context/AccordionCoreItemContext';

interface HeaderButtonProps {
	eventKey: string;
}

const HeaderButton: FC<HeaderButtonProps> = ({ eventKey }) => {
	const { activeEventKey } = useContext(AccordionContext);
	const decoratedOnClick = useAccordionButton(eventKey);

	return (
		<button
			type="button"
			className={`accordion-button ${
				!isAccordionItemSelected(activeEventKey, eventKey) ? 'collapsed' : ''
			}`}
			onClick={decoratedOnClick}
		>
			{' '}
		</button>
	);
};

interface HeaderProps {
	title: string;
	children?: ReactNode;
	className?: string;
}

const AccordionCoreHeader = ({ title, children, className }: HeaderProps): JSX.Element => {
	const { activeEventKey } = useContext(AccordionContext);
	const { eventKey } = useAccordionCoreItem();

	return (
		<header
			className={`card-header d-flex align-items-center justify-content-between ${
				className ?? ''
			} ${!isAccordionItemSelected(activeEventKey, eventKey) ? 'collapse' : ''}`}
		>
			<span>{title}</span>
			<div className="d-flex align-items-center justify-content-end">
				{children != null && <div className="my-n1 me-1">{children}</div>}
				<HeaderButton eventKey={eventKey} />
			</div>
		</header>
	);
};

export default AccordionCoreHeader;
