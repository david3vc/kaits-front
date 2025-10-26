import { type JSX, type ReactNode } from 'react';
import Accordion, { type AccordionProps } from 'react-bootstrap/Accordion';
import AccordionCoreItem from './components/AccordionCoreItem';
import AccordionCoreHeader from './components/AccordionCoreHeader';
import AccordionCoreBody from './components/AccordionCoreBody';

interface AccordionCoreProps extends AccordionProps {
	children?: ReactNode;
	className?: string;
}

const AccordionCore = ({
	activeKey,
	defaultActiveKey,
	onSelect,
	flush,
	alwaysOpen,
	className,
	children,
}: AccordionCoreProps): JSX.Element => {
	return (
		<Accordion
			as="section"
			activeKey={activeKey}
			defaultActiveKey={defaultActiveKey}
			onSelect={onSelect}
			flush={flush}
			alwaysOpen={alwaysOpen}
			className={`accordion-flat ${className ?? ''}`}
		>
			{children}
		</Accordion>
	);
};

export default Object.assign(AccordionCore, {
	Item: AccordionCoreItem,
	Header: AccordionCoreHeader,
	Body: AccordionCoreBody,
});
