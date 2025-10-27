import { type UseMutationResult, useQueryClient, useMutation } from '@tanstack/react-query';
import { type PedidoRequest, type PedidoResponse } from '../../../types';
import { PEDIDO_PAGINATED_SEARCH } from './QueryKeys';
import { PedidoService } from '../../../services';
import { toastError, toastSuccess } from '../../../core/helpers/ToastHelper';
import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();
	const response = useMutation({
		mutationFn: async (payload: PedidoUpdateProps) =>
			await PedidoService.update(payload.id, payload.pedido),
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

export default usePedidoUpdate;
