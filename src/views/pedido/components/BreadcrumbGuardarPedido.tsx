import { type JSX } from 'react';
import { BreadcrumbCore } from '../../../core/components/general';

interface BreadcrumbGuardarPedidoProps {
	titulo: string;
}

const BreadcrumbGuardarPedido = ({
	titulo,
}: BreadcrumbGuardarPedidoProps): JSX.Element => {
	return (
		<BreadcrumbCore>
			<BreadcrumbCore.Items className="py-3">
				<BreadcrumbCore.Item href="/">
				</BreadcrumbCore.Item>
				<BreadcrumbCore.Item active>Pedido</BreadcrumbCore.Item>
				<BreadcrumbCore.Item active>{titulo}</BreadcrumbCore.Item>
			</BreadcrumbCore.Items>
		</BreadcrumbCore>
	);
};

export default BreadcrumbGuardarPedido;
