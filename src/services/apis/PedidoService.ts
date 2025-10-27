import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../core/constants/env';
import type { PaginationRequest, PaginationResponse, PedidoFilter, PedidoRequest, PedidoResponse } from '../../types';
import { stringify } from 'qs';
import { getRecordState } from '../../core/helpers/RecordStateHelper';

export const paginatedSearch = async (
	paginationRequest: PaginationRequest<PedidoFilter>,
): Promise<PaginationResponse<PedidoResponse>> => {
	const paramsString: string = stringify(paginationRequest, { allowDots: true });

	const response: AxiosResponse<PaginationResponse<PedidoResponse>> = await axios.get(
		`${API_BASE_URL}/api/pedido/paginatedsearch?${paramsString}`,
	);

	const paginationResponse: PaginationResponse<PedidoResponse> = response.data;

	const pedidos: PedidoResponse[] = paginationResponse.data.map(item => {
		const pedido: PedidoResponse = {
			...item,
			recordState: getRecordState(item.estado),
		};

		return pedido;
	});

	const paginationPedido: PaginationResponse<PedidoResponse> = {
		from: paginationResponse.from,
		to: paginationResponse.to,
		perPage: paginationResponse.perPage,
		currentPage: paginationResponse.currentPage,
		lastPage: paginationResponse.lastPage,
		total: paginationResponse.total,
		data: pedidos,
	};

	return paginationPedido;
};

export const create = async (pedido: PedidoRequest): Promise<PedidoResponse> => {
	const response: AxiosResponse<PedidoResponse> = await axios.post(
		`${API_BASE_URL}/api/pedido`,
		pedido,
	);

	return response.data;
};