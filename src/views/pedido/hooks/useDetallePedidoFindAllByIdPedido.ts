import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type DetallePedidosResponse } from '../../../types';
import { DETALLE_PEDIDO_FIND_ALL_BY_ID_PEDIDO } from './QueryKeys';
import { DetallePedidoService } from '../../../services';

const useDetallePedidoFindAllByIdPedido = (id?: number): UseQueryResult<DetallePedidosResponse[], Error> => {
	const response = useQuery({
		queryKey: [DETALLE_PEDIDO_FIND_ALL_BY_ID_PEDIDO],
		queryFn: async () => await DetallePedidoService.findAllByIdPedido(Number(id)),
        enabled: !(id == 0 || id == undefined),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useDetallePedidoFindAllByIdPedido;
