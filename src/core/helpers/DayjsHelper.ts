import dayjs from 'dayjs';

export const API_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const API_DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT = 'DD-MM-YYYY';

const dateStringIsValid = (dateString: string, format = API_DATE_TIME_FORMAT): boolean =>
	dayjs(dateString, format, true).isValid();

const dateStrignFormatter = (
	dateString: string,
	format = API_DATE_TIME_FORMAT,
	outFormat = DATE_FORMAT,
): string => dayjs(dateString, format, true).format(outFormat);

const dateStringToDate = (dateString: string, format = API_DATE_TIME_FORMAT): Date =>
	dayjs(dateString, format, true).toDate();

const dateFormatterToString = (date: Date, outFormat = DATE_FORMAT): string =>
	dayjs(date).format(outFormat);

export { dateStringIsValid, dateStrignFormatter, dateStringToDate, dateFormatterToString };
