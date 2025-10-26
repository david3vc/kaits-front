import { createContext, type JSX, type ReactNode, useContext, useMemo } from 'react';

interface ContextProps {
	eventKey: string;
	children?: ReactNode;
}

const AccordionCoreItemContext = createContext<ContextProps>({ eventKey: 'defaultIdAccordion' });

const AccordionCoreItemContextProvider = ({ eventKey, children }: ContextProps): JSX.Element => {
	// Methods
	const value = useMemo(() => {
		return {
			eventKey,
		};
	}, [eventKey]);

	return (
		<AccordionCoreItemContext.Provider value={value}>{children}</AccordionCoreItemContext.Provider>
	);
};

const useAccordionCoreItem = (): ContextProps => {
	const context = useContext(AccordionCoreItemContext);

	if (Object.keys(context).length === 0)
		throw new Error('useAccordionCoreItem must be used within AccordionCoreItemContextProvider');

	return context;
};

export { AccordionCoreItemContext, AccordionCoreItemContextProvider, useAccordionCoreItem };
