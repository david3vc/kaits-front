import type { JSX } from "react";
import { BreadcrumbGuardarPedido, DatosGuardarPedido } from "./components";

const PedidoEdit = (): JSX.Element => {
    return (
        <>
            <BreadcrumbGuardarPedido
                titulo="Editar"
            />
            <DatosGuardarPedido />
        </>
    )
}

export default PedidoEdit;