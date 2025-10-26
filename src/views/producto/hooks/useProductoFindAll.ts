import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type ProductoResponse } from '../../../types';
import { PRODUCTO_FIND_ALL } from './QueryKeys';
import { ProductoService } from '../../../services';

const useProductoFindAll = (): UseQueryResult<ProductoResponse[], Error> => {
	const response = useQuery({
		queryKey: [PRODUCTO_FIND_ALL],
		queryFn: async () => await ProductoService.findAll(),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useProductoFindAll;
