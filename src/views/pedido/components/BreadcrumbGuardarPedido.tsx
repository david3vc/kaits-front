import { type JSX } from 'react';
import { BreadcrumbCore, ButtonCore } from '../../../core/components/general';

interface BreadcrumbGuardarPedidoProps {
	titulo: string;
}

const BreadcrumbGuardarPedido = ({
	titulo,
}: BreadcrumbGuardarPedidoProps): JSX.Element => {
	// const guardar = (): void => {
	// 	console.log('guardar!')
	// }
	return (
		<BreadcrumbCore>
			<BreadcrumbCore.Items className="py-3">
				<BreadcrumbCore.Item href="/">
					{/* <IconCore icon="fa-solid fa-house" className="text-dark" /> */}
				</BreadcrumbCore.Item>
				<BreadcrumbCore.Item active>Pedido</BreadcrumbCore.Item>
				<BreadcrumbCore.Item active>{titulo}</BreadcrumbCore.Item>
			</BreadcrumbCore.Items>
			{/* <BreadcrumbCore.Actions>
				<ButtonCore
					variant=""
					className="btn btn-sm btn-dark"
					text="Guardar"
					title="Guardar"
					size="sm"
					onClick={() => {
						void guardar();
					}}
				/>
			</BreadcrumbCore.Actions> */}
		</BreadcrumbCore>
	);
};

export default BreadcrumbGuardarPedido;
