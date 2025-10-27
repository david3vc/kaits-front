import { type DefinedUseQueryResult, useQuery } from '@tanstack/react-query';
import { PedidoService } from '../../../services';
import type {
	PaginationRequest,
	PaginationResponse,
	PedidoFilter,
	PedidoResponse,
} from '../../../types';
import { PEDIDO_PAGINATED_SEARCH } from './QueryKeys';

const usePedidoPaginatedSearch = (
	paginationRequest: PaginationRequest<PedidoFilter>,
): DefinedUseQueryResult<PaginationResponse<PedidoResponse>, Error> => {
	const response = useQuery({
		queryKey: [PEDIDO_PAGINATED_SEARCH, paginationRequest],
		queryFn: async () => await PedidoService.paginatedSearch(paginationRequest),
		retry: 0,
		refetchOnWindowFocus: false,
		initialData: {
			from: 0,
			to: 0,
			perPage: 0,
			currentPage: 0,
			lastPage: 0,
			total: 0,
			data: [],
		},
	});

	return response;
};

export default usePedidoPaginatedSearch;
