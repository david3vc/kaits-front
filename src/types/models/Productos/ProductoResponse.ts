import type RecordState from "../Paginations/RecordState";

export default interface ProductoResponse {
	id: number;
	descripcion: string;
    precioUnitario: number;
	fechaCreacion: Date;
	fechaActualizacion: Date;
	estado: boolean;
	recordState: RecordState;
}