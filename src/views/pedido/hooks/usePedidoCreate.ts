import { type UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import type { PedidoRequest, PedidoResponse } from '../../../types';
import { PedidoService } from '../../../services';
import { toastError, toastSuccess } from '../../../core/helpers/ToastHelper';
import { PEDIDO_PAGINATED_SEARCH } from './QueryKeys';

const usePedidoCreate = (): UseMutationResult<
	PedidoResponse,
	Error,
	PedidoRequest
> => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (pedido: PedidoRequest) =>
			await PedidoService.create(pedido),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [PEDIDO_PAGINATED_SEARCH] });
			toastSuccess('Pedido guardada correctamente');
			navigate('/pedidos');
		},
		onError: () => {
			toastError('Error al guardar Pedido');
		}
	});

	return response;
};

export default usePedidoCreate;
