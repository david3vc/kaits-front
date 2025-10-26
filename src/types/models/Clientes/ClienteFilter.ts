export default interface ClienteFilter {
	nombres: string | null;
    apellidoPaterno: string | null;
    apellidoMaterno: string | null;
    dni: string | null;
	estado?: boolean | null;
}
