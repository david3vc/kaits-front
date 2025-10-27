import { useState, type JSX } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useProductoPaginatedSearch } from "../../producto/hooks";
import { BadgeCore, BreadcrumbCore, ModalCore } from "../../../core/components/general";
import type { FilterPage, PaginationRequest, ProductoFilter, ProductoResponse } from "../../../types";
import { createColumnHelper } from "@tanstack/react-table";
import { LoadingTable } from "../../../core/components/loading";
import { TableCoreSelectPaginated } from "../../../core/components/table";

interface ModalSelectProductoProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleAdd: (rows: ProductoResponse[]) => void;
}

const ModalSelectProducto = ({
    setShowModal,
    showModal,
    handleAdd,
}: ModalSelectProductoProps): JSX.Element => {
    //Attributes
    const [searchFilter, setSearchFilter] = useState<PaginationRequest<ProductoFilter>>({
        page: 1,
        perPage: 5,
        filter: {
            descripcion: null,
            precioUnitario: null,
            estado: null,
        },
    });

    const columnHelper = createColumnHelper<ProductoResponse>();

    const columns = [
        columnHelper.accessor('descripcion', {
            header: 'Descripción',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('precioUnitario', {
            header: 'Precio',
            // cell: info => info.getValue(),
            cell: ({ row }) => (
                <>
                    S/. {row.original.precioUnitario}
                </>
            ),
        }),
        columnHelper.accessor('fechaCreacion', {
            header: 'Fecha',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('recordState', {
            header: 'Estado',
            cell: ({ row }) => (
                <BadgeCore variant={row?.original.recordState.color} pill={true}>
                    {row?.original.recordState.label}
                </BadgeCore>
            ),
        }),
    ];

    //Hooks
    const { data: productosData, isFetching: isFetchingProductosData } = useProductoPaginatedSearch(searchFilter);

    //Methods
    const closeModal = (): void => {
        setShowModal(false);
    };

    const goToPage = (payload: FilterPage): void => {
        console.log('payload', payload);
        setSearchFilter({
            ...searchFilter,
            page: payload.page,
            perPage: payload.perPage,
        });
    };

    const onRowSelection = (rows: ProductoResponse[]): void => {
        console.log('rows', rows);
        handleAdd(rows);
        closeModal();
    };

    return (
        <ModalCore show={showModal} onHide={closeModal} backdrop="static" keyboard={false} size="lg">
            <ModalCore.Header closeButton closeVariant="white" className="bg-primary text-white">
                <ModalCore.Title>Seleccionar Producto</ModalCore.Title>
            </ModalCore.Header>
            <ModalCore.Body className="bg-white">
                <Card className="mt-4 mb-2">
                    <Card.Header className="d-flex justify-content-between align-items-center bg-transparent fs-3 fw-bold">
                        <span>Listado de productos</span>
                    </Card.Header>
                    <Card.Body>
                        {
                            isFetchingProductosData ? (
                                <LoadingTable />
                            ) : (
                                <TableCoreSelectPaginated<ProductoResponse>
                                    columns={columns}
                                    data={productosData}
                                    goToPage={goToPage}
                                    onRowSelection={onRowSelection}
                                />
                            )
                        }
                    </Card.Body>
                </Card>
            </ModalCore.Body>
        </ModalCore>
    )
}

export default ModalSelectProducto;