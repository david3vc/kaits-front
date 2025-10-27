import type RecordState from "../Paginations/RecordState";

export default interface ClienteResponse {
    id: number;
    nombreCompleto: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    dni: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    estado: boolean;
    recordState: RecordState;
}