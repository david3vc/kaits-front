import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../core/constants/env';
import type { PaginationRequest, PaginationResponse, ProductoFilter, ProductoResponse } from '../../types';
import { stringify } from 'qs';
import { getRecordState } from '../../core/helpers/RecordStateHelper';

export const findAll = async (): Promise<ProductoResponse[]> => {
	const response: AxiosResponse<ProductoResponse[]> = await axios.get(
		`${API_BASE_URL}/api/producto`,
	);

	const productos: ProductoResponse[] = response.data.map(item => {
		const producto: ProductoResponse = {
			...item,
			recordState: getRecordState(item.estado),
		};

		return producto;
	});

	return productos;
};

export const paginatedSearch = async (
	paginationRequest: PaginationRequest<ProductoFilter>,
): Promise<PaginationResponse<ProductoResponse>> => {
	const paramsString: string = stringify(paginationRequest, { allowDots: true });

	const response: AxiosResponse<PaginationResponse<ProductoResponse>> = await axios.get(
		`${API_BASE_URL}/api/producto/paginatedsearch?${paramsString}`,
	);

	const paginationResponse: PaginationResponse<ProductoResponse> = response.data;

	const productos: ProductoResponse[] = paginationResponse.data.map(item => {
		const producto: ProductoResponse = {
			...item,
			recordState: getRecordState(item.estado),
		};

		return producto;
	});

	const paginationProducto: PaginationResponse<ProductoResponse> = {
		from: paginationResponse.from,
		to: paginationResponse.to,
		perPage: paginationResponse.perPage,
		currentPage: paginationResponse.currentPage,
		lastPage: paginationResponse.lastPage,
		total: paginationResponse.total,
		data: productos,
	};

	return paginationProducto;
};