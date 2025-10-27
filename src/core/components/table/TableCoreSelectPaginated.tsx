import Table from 'react-bootstrap/Table';
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	type RowSelectionState,
	type Updater,
} from '@tanstack/react-table';
import type { FilterPage, HasId, PaginationResponse } from '../../../types';
import PaginationLinks from './PaginationLinks';
import IndeterminateCheck from './IndeterminateCheck';
import { useState, useEffect, type JSX } from 'react';

interface TableCoreSelectPaginatedProps<T extends HasId> {
	columns: Array<ColumnDef<T, any>>;
	data: PaginationResponse<T>;
	goToPage: (payload: FilterPage) => void;
	onRowSelection?: (payload: T[]) => void;
	selectedRows?: T[]; // Nueva prop para las filas seleccionadas
}

const TableCoreSelectPaginated = <T extends HasId,>({
	columns,
	data,
	goToPage,
	onRowSelection,
	selectedRows = [], // Inicializamos la prop
}: TableCoreSelectPaginatedProps<T>): JSX.Element => {
	// Convierte las filas seleccionadas en un estado de selección de filas
	const initialRowSelection = selectedRows.reduce<RowSelectionState>((acc, row) => {
		const rowIndex = data.data.findIndex(item => item.id === row.id);
		if (rowIndex !== -1) {
			acc[rowIndex] = true;
		}
		return acc;
	}, {});

	const [rowSelection, setRowSelection] = useState<RowSelectionState>(initialRowSelection);

	// Efecto para actualizar la selección cuando cambian las filas seleccionadas
	// useEffect(() => {
	// 	const newSelection = selectedRows.reduce<RowSelectionState>((acc, row) => {
	// 	  const rowIndex = data.data.findIndex(item => item.id === row.id);
	// 	  if (rowIndex !== -1) {
	// 		acc[rowIndex] = true;
	// 	  }
	// 	  return acc;
	// 	}, {});
	// 	setRowSelection(newSelection);
	//   }, [selectedRows, data]);

	useEffect(() => {
		const newSelection = selectedRows.reduce<RowSelectionState>((acc, row) => {
		  const rowIndex = data.data.findIndex(item => item.id === row.id);
		  if (rowIndex !== -1) {
			acc[rowIndex] = true;
		  }
		  return acc;
		}, {});
	  
		// Solo actualiza si la nueva selección es diferente a la actual
		if (JSON.stringify(newSelection) !== JSON.stringify(rowSelection)) {
		  setRowSelection(newSelection);
		}
	  }, [selectedRows, data]);
	  

	const table = useReactTable<T>({
		columns: [
			{
				id: 'select',
				header: ({ table: tbl }) => (
					<div className="text-center">
						{data?.data != null && (
							<IndeterminateCheck
								{...{
									checked: tbl.getIsAllRowsSelected(),
									indeterminate: tbl.getIsSomeRowsSelected(),
									onChange: tbl.getToggleAllRowsSelectedHandler(),
								}}
							/>
						)}
					</div>
				),
				cell: ({ row }) => (
					<div className="text-center">
						<IndeterminateCheck
							{...{
								checked: row.getIsSelected(),
								indeterminate: row.getIsSomeSelected(),
								onChange: row.getToggleSelectedHandler(),
								tipo: 'checkbox'
							}}
						/>
					</div>
				),
			},
			...columns,
		],
		data: data?.data ?? [],
		state: { rowSelection },
		onRowSelectionChange: (updaterOrValue: Updater<RowSelectionState>) => {
			setRowSelection(prev => {
				const next = typeof updaterOrValue === 'function' ? updaterOrValue(prev) : updaterOrValue;

				const arrayIndex: number[] = Object.keys(next).map(d => parseInt(d));

				const rows = table.getPreFilteredRowModel().rows;

				const selectedRows = rows.filter(d => arrayIndex.includes(d.index)).map(d => d.original);

				onRowSelection?.(selectedRows);

				return next;
			});
		},
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<Table responsive bordered hover size="sm">
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id} className="bg-primary-ligth">
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>

			{data?.data?.length > 0 && <PaginationLinks data={data} goToPage={goToPage} />}
		</>
	);
};

export default TableCoreSelectPaginated;
