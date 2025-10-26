import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { JSX } from 'react';
import Table from 'react-bootstrap/Table';

interface TableCoreProps<T> {
	columns: Array<ColumnDef<T, any>>;
	data: T[];
}

const TableCore = <T,>({ columns, data }: TableCoreProps<T>): JSX.Element => {
	const table = useReactTable<T>({
		columns,
		data: data ?? [],
		getCoreRowModel: getCoreRowModel(),
	});

	return (
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
	);
};

export default TableCore;
