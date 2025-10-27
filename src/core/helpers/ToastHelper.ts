import { Toastme } from 'toastmejs';

interface ToastProps {
	timeout: number;
	positionY: 'top' | 'bottom';
	positionX: 'right' | 'left' | 'center';
	distanceY: number;
	distanceX: number;
	zIndex: number;
	theme: 'default' | 'ligh' | 'dark';
}

interface PositionProps {
	y: 'top' | 'bottom';
	x: 'right' | 'left' | 'center';
}

interface ToastClientProps {
	timeout?: number;
	position?: PositionProps;
	type?: 'error' | 'success' | 'info' | 'warning';
}

interface ToastBuildProps {
	showToast: (type: 'error' | 'success' | 'info' | 'warning', message: string) => void;
}

const config: ToastProps = {
	timeout: 5000,
	positionY: 'top',
	positionX: 'right',
	distanceY: 20,
	distanceX: 20,
	zIndex: 9999,
	theme: 'default',
};

const toastBuild = ({ timeout, position }: ToastClientProps): ToastBuildProps => {
	const currentOptions = Object.assign(config, {});
	currentOptions.timeout = timeout ?? config.timeout;
	currentOptions.positionY = position?.y ?? config.positionY;
	currentOptions.positionX = position?.x ?? config.positionX;

	return new Toastme(currentOptions);
};

const toastFire = (
	message: string,
	{ type = 'info', timeout, position }: ToastClientProps,
): void => {
	const toast = toastBuild({ type, timeout, position });

	toast.showToast(type, message);
};

const toastSuccess = (message: string, timeout?: number): void => {
	const toast = toastBuild({ timeout });

	toast.showToast('success', message);
};

const toastError = (message: string, timeout?: number): void => {
	const toast = toastBuild({ timeout });

	toast.showToast('error', message);
};

const toastInfo = (message: string, timeout?: number): void => {
	const toast = toastBuild({ timeout });

	toast.showToast('info', message);
};

const toastWarning = (message: string, timeout?: number): void => {
	const toast = toastBuild({ timeout });

	toast.showToast('warning', message);
};

export { toastFire, toastSuccess, toastError, toastInfo, toastWarning };
