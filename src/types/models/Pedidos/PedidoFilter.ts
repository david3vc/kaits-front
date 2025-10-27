export default interface PedidoFilter {
	fecha: Date | null;
	idCliente: number | null;
	total: number | null;
	estado?: boolean | null;
}
