import { type DefinedUseQueryResult, useQuery } from '@tanstack/react-query';
import { ClienteService } from '../../../services';
import type {
	PaginationRequest,
	PaginationResponse,
	ClienteFilter,
	ClienteResponse,
} from '../../../types';
import { CLIENTE_PAGINATED_SEARCH } from './QueryKeys';

const useClientePaginatedSearch = (
	paginationRequest: PaginationRequest<ClienteFilter>,
): DefinedUseQueryResult<PaginationResponse<ClienteResponse>, Error> => {
	const response = useQuery({
		queryKey: [CLIENTE_PAGINATED_SEARCH, paginationRequest],
		queryFn: async () => await ClienteService.paginatedSearch(paginationRequest),
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

export default useClientePaginatedSearch;
