export default interface PedidoFilter {
	fecha: string | null;
	idCliente: number | null;
	total: number | null;
	estado?: boolean | null;
}
