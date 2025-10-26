import { type FC, type JSX, type ReactNode } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { type BreadcrumbItemProps } from 'react-bootstrap/BreadcrumbItem';
import { NavLink } from 'react-router-dom';

interface BaseProps {
	children?: ReactNode;
	className?: string;
}

const Item = (props: BreadcrumbItemProps): JSX.Element => {
	return (
		<Breadcrumb.Item {...props} linkAs="span">
			{props?.href != null ? <NavLink to={props.href}>{props?.children}</NavLink> : props?.children}
		</Breadcrumb.Item>
	);
};

const Items: FC<BaseProps> = ({ children, className }): JSX.Element => {
	return (
		<Col className="col-auto align-self-center">
			<Breadcrumb className={className}>{children}</Breadcrumb>
		</Col>
	);
};

const Actions: FC<BaseProps> = ({ children, className }): JSX.Element => {
	return (
		<Col className="d-flex justify-content-end align-items-center">
			<div className={`my-n1 ${className ?? ''}`}>{children}</div>
		</Col>
	);
};

const BreadcrumbCore = ({ children, className }: BaseProps): JSX.Element => {
	return <Row className={`page-titles ${className ?? ''}`}>{children}</Row>;
};

BreadcrumbCore.Items = Items;
BreadcrumbCore.Item = Item;
BreadcrumbCore.Actions = Actions;

export default BreadcrumbCore;
