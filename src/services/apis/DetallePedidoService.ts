import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../core/constants/env';
import type { DetallePedidosResponse } from '../../types';

export const findAllByIdPedido = async (id: number): Promise<DetallePedidosResponse[]> => {
	const response: AxiosResponse<DetallePedidosResponse[]> = await axios.get(
		`${API_BASE_URL}/api/detallepedido/FindAllByIdPedido/${id}`,
	);

	return response.data;
};