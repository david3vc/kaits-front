import { useState, type JSX } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { BadgeCore, BreadcrumbCore } from "../../core/components/general";
import { useClientePaginatedSearch } from "./hooks";
import { LoadingTable } from "../../core/components/loading";
import { TableCorePaginated } from "../../core/components/table";
import type { FilterPage, PaginationRequest, ClienteFilter, ClienteResponse } from "../../types";
import { createColumnHelper } from "@tanstack/react-table";

const ClienteMain = (): JSX.Element => {

    //Attributes
    const [searchFilter, setSearchFilter] = useState<PaginationRequest<ClienteFilter>>({
        page: 1,
        perPage: 5,
        filter: {
            nombres: null,
            apellidoPaterno: null,
            apellidoMaterno: null,
            dni: null,
            estado: null,
        },
    });

    const columnHelper = createColumnHelper<ClienteResponse>();

    const columns = [
        columnHelper.accessor('nombres', {
            header: 'Nombres',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('apellidoPaterno', {
            header: 'Apellido Paterno',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('apellidoMaterno', {
            header: 'Apellido Materno',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('dni', {
            header: 'DNI',
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
    const { data: clientesData, isFetching: isFetchingClientesData } = useClientePaginatedSearch(searchFilter);

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
                    <BreadcrumbCore.Item active>Clientes</BreadcrumbCore.Item>
                </BreadcrumbCore.Items>
            </BreadcrumbCore>

            <Row>
                <Col>
                    <Card className="mt-4 mb-2">
                        <Card.Header className="d-flex justify-content-between align-items-center bg-transparent fs-3 fw-bold">
                            <span>Listado de clientes</span>
                        </Card.Header>
                        <Card.Body>
                            {
                                isFetchingClientesData ? (
                                    <LoadingTable />
                                ) : (
                                    <TableCorePaginated<ClienteResponse>
                                        columns={columns}
                                        data={clientesData}
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

export default ClienteMain;