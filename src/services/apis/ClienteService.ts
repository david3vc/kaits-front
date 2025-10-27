import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../core/constants/env';
import type { PaginationRequest, PaginationResponse, ClienteFilter, ClienteResponse } from '../../types';
import { stringify } from 'qs';
import { getRecordState } from '../../core/helpers/RecordStateHelper';

export const findAll = async (): Promise<ClienteResponse[]> => {
	const response: AxiosResponse<ClienteResponse[]> = await axios.get(
		`${API_BASE_URL}/api/cliente`,
	);

	return response.data;
};

export const paginatedSearch = async (
	paginationRequest: PaginationRequest<ClienteFilter>,
): Promise<PaginationResponse<ClienteResponse>> => {
	const paramsString: string = stringify(paginationRequest, { allowDots: true });

	const response: AxiosResponse<PaginationResponse<ClienteResponse>> = await axios.get(
		`${API_BASE_URL}/api/cliente/paginatedsearch?${paramsString}`,
	);

	const paginationResponse: PaginationResponse<ClienteResponse> = response.data;

	const clientes: ClienteResponse[] = paginationResponse.data.map(item => {
		const cliente: ClienteResponse = {
			...item,
			recordState: getRecordState(item.estado),
		};

		return cliente;
	});

	const paginationCliente: PaginationResponse<ClienteResponse> = {
		from: paginationResponse.from,
		to: paginationResponse.to,
		perPage: paginationResponse.perPage,
		currentPage: paginationResponse.currentPage,
		lastPage: paginationResponse.lastPage,
		total: paginationResponse.total,
		data: clientes,
	};

	return paginationCliente;
};