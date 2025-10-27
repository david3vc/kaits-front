import { forwardRef, type MutableRefObject, useEffect, useRef } from 'react';
import type { FormCheckType } from 'react-bootstrap/esm/FormCheck';
import Form from 'react-bootstrap/Form';

interface IndeterminateCheckProps {
	indeterminate: boolean;
	tipo?: FormCheckType;
	className?: string;
}

const IndeterminateCheck = forwardRef<HTMLInputElement, IndeterminateCheckProps>(
	({ indeterminate, className, tipo, ...rest }, ref) => {
		const defaultRef = useRef<HTMLInputElement>(null);
		const resolvedRef = (ref ?? defaultRef) as MutableRefObject<HTMLInputElement>;

		useEffect(() => {
			if (typeof indeterminate === 'boolean' && resolvedRef != null)
				resolvedRef.current.indeterminate = indeterminate;
		}, [resolvedRef, indeterminate]);

		return <Form.Check type={tipo} className={className} ref={resolvedRef} {...rest} />;
	},
);

IndeterminateCheck.displayName = 'IndeterminateCheck';

export default IndeterminateCheck;
