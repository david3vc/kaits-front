import { type UseMutationResult, useQueryClient, useMutation } from '@tanstack/react-query';
import { type PedidoRequest, type PedidoResponse } from '../../../types';
import { PEDIDO_PAGINATED_SEARCH } from './QueryKeys';
import { PedidoService } from '../../../services';

interface PedidoUpdateProps {
	id: number;
	pedido:PedidoRequest;
}

const usePedidoUpdate = (): UseMutationResult<
	PedidoResponse,
	Error,
	PedidoUpdateProps
> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (payload: PedidoUpdateProps) =>
			await PedidoService.update(payload.id, payload.pedido),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [PEDIDO_PAGINATED_SEARCH] });
		},
	});

	return response;
};

export default usePedidoUpdate;
