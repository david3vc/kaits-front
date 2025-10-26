import { type DefinedUseQueryResult, useQuery } from '@tanstack/react-query';
import { ProductoService } from '../../../services';
import type {
	PaginationRequest,
	PaginationResponse,
	ProductoFilter,
	ProductoResponse,
} from '../../../types';
import { PRODUCTO_PAGINATED_SEARCH } from './QueryKeys';

const useProductoPaginatedSearch = (
	paginationRequest: PaginationRequest<ProductoFilter>,
): DefinedUseQueryResult<PaginationResponse<ProductoResponse>, Error> => {
	const response = useQuery({
		queryKey: [PRODUCTO_PAGINATED_SEARCH, paginationRequest],
		queryFn: async () => await ProductoService.paginatedSearch(paginationRequest),
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

export default useProductoPaginatedSearch;
