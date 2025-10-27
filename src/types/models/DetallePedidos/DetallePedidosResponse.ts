import type PedidoResponse from "../Pedidos/PedidoResponse";
import type ProductoResponse from "../Productos/ProductoResponse";

export default interface DetallePedidosResponse {
    id: number;
    idProducto: number;
    idPedido: number;
    cantidad: number;
    subtotal: number;
    fechaCreacion: Date;
    fechaActualizacion: Date | null;
    estado: boolean;
    producto: ProductoResponse | null;
    pedido: PedidoResponse | null;
}