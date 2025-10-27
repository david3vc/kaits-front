export default interface DetallePedidosRequest {
	id?: number | null;
	idProducto: number;
	idPedido: number;
	cantidad: number;
    subtotal: number;
}