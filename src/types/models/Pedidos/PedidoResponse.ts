import type ClienteResponse from "../Clientes/ClienteResponse";
import type DetallePedidosResponse from "../DetallePedidos/DetallePedidosResponse";
import type RecordState from "../Paginations/RecordState";

export default interface PedidoResponse {
	id: number;
	fecha: string;
	idCliente: number;
	total: number;
	fechaCreacion: Date;
	fechaActualizacion: Date;
	estado: boolean;
	recordState: RecordState;
	cliente: ClienteResponse;
	detallePedido: DetallePedidosResponse[]
}