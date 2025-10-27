import type { JSX } from "react";
import { BreadcrumbGuardarPedido, DatosGuardarPedido } from "./components";

const PedidoCreate = (): JSX.Element => {
    return (
        <>
            <BreadcrumbGuardarPedido
                titulo="Registrar"
            />
            <DatosGuardarPedido />
        </>
    )
}

export default PedidoCreate;