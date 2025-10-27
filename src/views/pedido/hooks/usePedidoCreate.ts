import { type UseMutationResult, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import type { PedidoRequest, PedidoResponse } from '../../../types';
import { PedidoService } from '../../../services';
import { toastError, toastSuccess } from '../../../core/helpers/ToastHelper';

const usePedidoCreate = (): UseMutationResult<
	PedidoResponse,
	Error,
	PedidoRequest
> => {
	const navigate = useNavigate();
	const response = useMutation({
		mutationFn: async (pedido: PedidoRequest) =>
			await PedidoService.create(pedido),
		onSuccess: () => {
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
