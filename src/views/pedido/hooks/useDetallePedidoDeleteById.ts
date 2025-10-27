import { type UseMutationResult, useQueryClient, useMutation } from '@tanstack/react-query';
import { type DetallePedidosResponse } from '../../../types';
import { PEDIDO_PAGINATED_SEARCH } from './QueryKeys';
import { DetallePedidoService } from '../../../services';
import { toastSuccess } from '../../../core/helpers/ToastHelper';

const useDetallePedidoDeleteById = (): UseMutationResult<DetallePedidosResponse, Error, number> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (id: number) => await DetallePedidoService.deleteById(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [PEDIDO_PAGINATED_SEARCH] });
			toastSuccess('Producto eliminado correctamente');
		},
	});

	return response;
};

export default useDetallePedidoDeleteById;
