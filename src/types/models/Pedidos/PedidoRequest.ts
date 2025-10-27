import type { DetallePedidosRequest, DetallePedidosResponse } from "../..";

export default interface PedidoRequest {
	fecha: Date | null;
	idCliente: number;
	total: number;
    detallePedidos: DetallePedidosResponse[];
	detallePedidoSaveDtos : DetallePedidosRequest[];
}