import type RecordState from "../Paginations/RecordState";

export default interface ClienteResponse {
    id: number;
    nombres: string | null;
    apellidoPaterno: string | null;
    apellidoMaterno: string | null;
    dni: string | null;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    estado: boolean;
    recordState: RecordState;
}