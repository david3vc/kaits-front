import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type PedidoResponse } from '../../../types';
import { PEDIDO_FIND_BY_ID } from './QueryKeys';
import { PedidoService } from '../../../services';

const usePedidoFindById = (id?: number): UseQueryResult<PedidoResponse, Error> => {
	const response = useQuery({
		queryKey: [PEDIDO_FIND_BY_ID, id],
		queryFn: async () => await PedidoService.findById(Number(id)),
		enabled: !(id == 0 || id == undefined),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default usePedidoFindById;
