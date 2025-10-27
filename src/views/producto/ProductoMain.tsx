import { useState, type JSX } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { BadgeCore, BreadcrumbCore } from "../../core/components/general";
import { useProductoPaginatedSearch } from "./hooks";
import { LoadingTable } from "../../core/components/loading";
import { TableCorePaginated } from "../../core/components/table";
import type { FilterPage, PaginationRequest, ProductoFilter, ProductoResponse } from "../../types";
import { createColumnHelper } from "@tanstack/react-table";

const ProductoMain = (): JSX.Element => {

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
    const goToPage = (payload: FilterPage): void => {
        setSearchFilter({
            ...searchFilter,
            page: payload.page,
            perPage: payload.perPage,
        });
    };


    return (
        <>
            <BreadcrumbCore>
                <BreadcrumbCore.Items className="py-3">
                    <BreadcrumbCore.Item href="/">
                    </BreadcrumbCore.Item>
                    <BreadcrumbCore.Item active>Productos</BreadcrumbCore.Item>
                </BreadcrumbCore.Items>
            </BreadcrumbCore>

            <Row>
                <Col>
                    <Card className="mt-4 mb-2">
                        <Card.Header className="d-flex justify-content-between align-items-center bg-transparent fs-3 fw-bold">
                            <span>Listado de productos</span>
                        </Card.Header>
                        <Card.Body>
                            {
                                isFetchingProductosData ? (
                                    <LoadingTable />
                                ) : (
                                    <TableCorePaginated<ProductoResponse>
                                        columns={columns}
                                        data={productosData}
                                        goToPage={goToPage}
                                    />
                                )
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductoMain;