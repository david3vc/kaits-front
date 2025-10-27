interface Option {
	value: number;
	label: string;
}
const mapDataToOptions = (data: Array<{ id: number; descripcion: string }>): Option[] => {
	return data.map(item => ({
		value: item.id,
		label: item.descripcion,
	}));
};
const mapDataToOptionsByNombre = (data: Array<{ id: number; nombre: string }>): Option[] => {
	return data.map(item => ({
		value: item.id,
		label: item.nombre,
	}));
};
export { type Option, mapDataToOptions, mapDataToOptionsByNombre };
