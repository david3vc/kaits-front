import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type ClienteResponse } from '../../../types';
import { CLIENTE_FIND_ALL } from './QueryKeys';
import { ClienteService } from '../../../services';

const useClienteFindAll = (): UseQueryResult<ClienteResponse[], Error> => {
	const response = useQuery({
		queryKey: [CLIENTE_FIND_ALL],
		queryFn: async () => await ClienteService.findAll(),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useClienteFindAll;
