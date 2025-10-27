import { useState, type JSX } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { useFormik } from "formik";
import { createColumnHelper } from "@tanstack/react-table";
import { BadgeCore, BreadcrumbCore, ButtonCore, NavLinkCore } from "../../core/components/general";
import { usePedidoPaginatedSearch } from "./hooks";
import { LoadingTable } from "../../core/components/loading";
import { TableCorePaginated } from "../../core/components/table";
import type { FilterPage, PaginationRequest, PedidoFilter, PedidoResponse, RecordState } from "../../types";
import { AccordionCore } from "../../core/components/accordion";
import DatePicker from "react-datepicker";
import { useClienteFindAll } from "../cliente/hooks";
import type { Option } from "../../core/helpers/OptionsMapperHelper";

interface PedidoFilterFormik extends PedidoFilter {
    recordState: RecordState | null;
    cliente: Option | null;
}

const PedidoMain = (): JSX.Element => {

    //Attributes
    const [searchFilter, setSearchFilter] = useState<PaginationRequest<PedidoFilter>>({
        page: 1,
        perPage: 5,
        filter: {
            fecha: null,
            idCliente: null,
            total: null,
            estado: null,
        },
    });

    const formik = useFormik<PedidoFilterFormik>({
        initialValues: {
            fecha: null,
            idCliente: null,
            cliente: null,
            total: null,
            estado: null,
            recordState: null,
        },
        onSubmit: values => {
            // console.log(values.fecha?.toDateString())
            setSearchFilter(prev => {
                return {
                    ...prev,
                    page: 1,
                    filter: {
                        fecha: values.fecha ?? null,
                        idCliente: values.cliente?.value ?? null,
                        total: values.total ?? null,
                        estado: values.recordState?.value,
                    },
                };
            });
        },
    });

    const columnHelper = createColumnHelper<PedidoResponse>();

    const columns = [
        columnHelper.display({
            id: 'acciones',
            header: () => <span className="d-block text-center text-nowrap">Acciones</span>,
            cell: ({ row }) => (
                <span className="d-flex align-items-center justify-content-center">
                    <ButtonCore
                        variant={row.original.estado ? 'outline-danger' : 'outline-warning'}
                        text={row.original.estado ? 'Eliminar' : 'Restaurar'}
                        title={row.original.estado ? 'Eliminar' : 'Restaurar'}
                        size="sm"
                        // icon={row.original.state ? 'fa-solid fa-trash' : 'fa-solid fa-rotate-left'}
                        className="border-0"
                    // onClick={() => {
                    //     void removeCurso(row.original);
                    // }}
                    />{' '}
                    <NavLinkCore
                        variant="outline-primary"
                        to={`editar/${row.original.id}`}
                        text="Editar"
                        title="Editar"
                        size="md"
                        // icon="fa-solid fa-pen-to-square"
                        className="border-0"

                    />
                </span>
            ),
        }),
        columnHelper.accessor('fecha', {
            header: 'Fecha',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('cliente.nombreCompleto', {
            header: 'Cliente',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('total', {
            header: 'Total',
            // cell: info => info.getValue(),
            cell: ({ row }) => (
                <span>
                    S/. {row.original.total.toFixed(2)}
                </span>
            ),
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
    const { data: pedidosData, isFetching: isFetchingPedidosData } = usePedidoPaginatedSearch(searchFilter);
    const { data: clientesData } = useClienteFindAll();

    const clienteSimple = clientesData?.map(item => ({
        value: item.id,
        label: item.nombreCompleto ?? '',
    }))

    //Methods
    const goToPage = (payload: FilterPage): void => {
        console.log('payload', payload);
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
                    <BreadcrumbCore.Item active>Pedidos</BreadcrumbCore.Item>
                </BreadcrumbCore.Items>
                <BreadcrumbCore.Actions>
                    <NavLinkCore
                        to="/pedidos/registrar"
                        variant="primary"
                        text="Nuevo pedido"
                        size="sm"
                        // icon="fa-solid fa-circle-plus"
                        hiddenText='sm'
                    />
                </BreadcrumbCore.Actions>
            </BreadcrumbCore>

            <Row>
                <Col>
                    <AccordionCore className="accordion-spacing" defaultActiveKey={'busquedaBasica'}>
                        <AccordionCore.Item eventKey="busquedaBasica">
                            <AccordionCore.Header title="Búsqueda" className="py-1 fs-3 fw-bold">
                                <div className="d-flex justify-content-end">
                                    <div>
                                        <ButtonCore
                                            variant="outline-dark"
                                            size="sm"
                                            text="Limpiar"
                                            icon="fa-solid fa-arrows-rotate"
                                            hiddenText="sm"
                                            onClick={formik.handleReset}
                                        />{' '}
                                        <ButtonCore
                                            variant="primary"
                                            size="sm"
                                            text="Buscar"
                                            icon="fa-solid fa-magnifying-glass"
                                            hiddenText="sm"
                                            onClick={() => {
                                                formik.handleSubmit();
                                            }}
                                        />
                                    </div>
                                </div>
                            </AccordionCore.Header>
                            <AccordionCore.Body>
                                <Row className="g-3">
                                    <Col xs={12} sm={6} md={4} xxl={4}>
                                        <Form.Label>Fecha</Form.Label>
                                        <DatePicker
                                            className="form-control form-control-lg"
                                            dateFormat="dd-MM-yyyy"
                                            name='fecha'
                                            selected={formik.values?.fecha ?? null}
                                            onChange={date => {
                                                void formik.setFieldValue('fecha', date);
                                            }}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            locale="es"
                                            isClearable
                                        />
                                    </Col>
                                    <Col xs={12} sm={6} md={4} xxl={4}>
                                        <Form.Label>Cliente</Form.Label>
                                        <Select
                                            className="react__select"
                                            classNamePrefix="rs_react"
                                            name="cliente"
                                            value={formik.values.cliente ?? ''}
                                            options={clienteSimple}
                                            onChange={(option, target) => {
                                                void formik.setFieldValue(target?.name ?? '', option);
                                                // formik.handleSubmit();
                                            }}
                                            placeholder="Buscar"
                                            menuPlacement="auto"
                                            isSearchable={false}
                                            isClearable
                                        />
                                    </Col>
                                    <Col xs={12} sm={6} md={4} xxl={4}>
                                        <Form.Label>Total</Form.Label>
                                        <Form.Control
                                            type="number"
                                            size="lg"
                                            name="total"
                                            value={formik.values.total ?? ''}
                                            onChange={formik.handleChange}
                                        />
                                        {/* {(formik.touched.descripcion ?? false) && formik.errors.descripcion != null && (
                                <small className="text-danger">{formik.errors.descripcion}</small>
                            )} */}
                                    </Col>
                                </Row>
                            </AccordionCore.Body>
                        </AccordionCore.Item>
                    </AccordionCore>

                    <Card className="mt-4 mb-2">
                        <Card.Header className="d-flex justify-content-between align-items-center bg-transparent fs-3 fw-bold">
                            <span>Listado de pedidos</span>
                        </Card.Header>
                        <Card.Body>
                            {
                                isFetchingPedidosData ? (
                                    <LoadingTable />
                                ) : (
                                    <TableCorePaginated<PedidoResponse>
                                        columns={columns}
                                        data={pedidosData}
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

export default PedidoMain;