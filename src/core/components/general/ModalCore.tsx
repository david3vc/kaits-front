import { type JSX, type ReactNode, useEffect, useRef } from 'react';
import { type AbstractModalHeaderProps } from 'react-bootstrap/esm/AbstractModalHeader';
import Modal, { type ModalProps } from 'react-bootstrap/Modal';
import Draggabilly from 'draggabilly';

interface BaseProps {
	children?: ReactNode;
	className?: string;
}

const Title = ({ children, className }: BaseProps): JSX.Element => {
	return <span className={className}>{children}</span>;
};

const Actions = ({ children, className }: BaseProps): JSX.Element => {
	return <div className={`my-n1 me-2 ${className ?? ''}`}>{children}</div>;
};

const Header = (props: AbstractModalHeaderProps): JSX.Element => {
	return (
		<Modal.Header {...props}>
			<Modal.Title
				as="div"
				className="d-flex align-items-center justify-content-between flex-grow-1"
			>
				{props?.children}
			</Modal.Title>
		</Modal.Header>
	);
};

const Body = ({ children, className }: BaseProps): JSX.Element => {
	return <Modal.Body className={className}>{children}</Modal.Body>;
};

const Footer = ({ children, className }: BaseProps): JSX.Element => {
	return (
		<Modal.Footer className={className}>
			<div className="my-n1">{children}</div>
		</Modal.Footer>
	);
};

interface ModalCoreProps extends ModalProps {
	isWidget?: boolean;
}

const ModalCore = (props: ModalCoreProps): JSX.Element => {
	const refModal = useRef<ModalProps>(null);
	const modalProps: ModalProps = Object.assign({}, props);
	delete modalProps.isWidget;

	useEffect(() => {
		let draggie: Draggabilly;
		const { show = false, isWidget = false } = props;

		if (show && isWidget && refModal.current?.dialog != null) {
			draggie = new Draggabilly(refModal.current?.dialog, {
				handle: '.modal-header',
			});
		}

		return () => {
			draggie?.destroy();
		};
	}, [props.show, props.isWidget]);

	return (
		<Modal
			animation={!(props.isWidget ?? false)}
			ref={refModal}
			{...modalProps}
			className={props.isWidget ?? false ? 'modal-widget' : ''}
			backdropClassName={props.isWidget ?? false ? 'd-none' : ''}
		>
			{props?.children}
		</Modal>
	);
};

ModalCore.Title = Title;
ModalCore.Actions = Actions;
ModalCore.Header = Header;
ModalCore.Body = Body;
ModalCore.Footer = Footer;

export default ModalCore;
