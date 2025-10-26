import type { RecordState } from '../../types';

export const RECORD_STATE_ACTIVE = {
	value: true,
	label: 'Activo',
	color: 'success',
};
export const RECORD_STATE_INACTIVE = {
	value: false,
	label: 'Inactivo',
	color: 'danger',
};
export const RECORD_STATUS = [RECORD_STATE_ACTIVE, RECORD_STATE_INACTIVE];
export const getRecordState = (value: boolean): RecordState => {
	return RECORD_STATUS.find(status => status.value === value) ?? RECORD_STATE_INACTIVE;
};