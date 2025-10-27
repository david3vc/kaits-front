import { useEffect, useMemo, useState, type JSX } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { ButtonCore, NavLinkCore } from "../../../core/components/general";
import type { DetallePedidosRequest, DetallePedidosResponse, PedidoRequest, ProductoResponse } from "../../../types";
import { useFormik, type FormikErrors } from "formik";
import * as Yup from 'yup';
import { swalAlertConfirm } from "../../../core/helpers/SwalHelper";
import ModalSelectProducto from "./ModalSelectProducto";
import { useClienteFindAll } from "../../cliente/hooks";
import type { Option } from "../../../core/helpers/OptionsMapperHelper";
import { useDetallePedidoDeleteById, useDetallePedidoFindAllByIdPedido, usePedidoCreate, usePedidoFindById, usePedidoUpdate } from "../hooks";
import { useParams } from "react-router-dom";
import { dateStringToDate } from "../../../core/helpers/DayjsHelper";
import { toastSuccess } from "../../../core/helpers/ToastHelper";

interface Pedidoformik extends PedidoRequest {
    cliente: Option | null;
}

const DatosGuardarPedido = (): JSX.Element => {
    //Attributes
    const params = useParams();
    const { id } = params;

    // const [initialValues, setInitialValues] = useState<Pedidoformik>({
    //     fecha: new Date(),
    //     idCliente: 0,
    //     total: 0,
    //     cliente: null,
    //     detallePedidos: [],
    //     detallePedidoSaveDtos: []
    // });

    const { data: pedidoFindId, isFetching: isFetchingPedido, isSuccess: isSuccessPedido } = usePedidoFindById(Number(id ?? 0));
    const { data: detallePedidoData, isFetching: isFetchingDetallePedido, isSuccess: isSuccessDetallePedido } = useDetallePedidoFindAllByIdPedido(Number(id ?? 0));

    const initialValues = useMemo<Pedidoformik>(() => {
        if (id && pedidoFindId && detallePedidoData) {
            return {
                fecha: dateStringToDate(pedidoFindId.fecha),
                idCliente: pedidoFindId.idCliente,
                cliente: {
                    value: pedidoFindId.idCliente,
                    label: pedidoFindId.cliente.nombreCompleto,
                },
                total: pedidoFindId.total,
                detallePedidos: detallePedidoData,
                detallePedidoSaveDtos: [],
            };
        }
        // Estado inicial para "nuevo" o mientras carga
        return {
            fecha: new Date(),
            idCliente: 0,
            cliente: null,
            total: 0,
            detallePedidos: [],
            detallePedidoSaveDtos: [],
        };
    }, [id, pedidoFindId, detallePedidoData]);

    const formik = useFormik<Pedidoformik>({
        enableReinitialize: true,
        initialValues,
        validationSchema: Yup.object().shape({
            cliente: Yup.object().nullable().required('Cliente es requerido.'),
            fecha: Yup.date().nullable().required('Fecha es requerido'),
            detallePedidos: Yup.array()
                .of(
                    Yup.object().shape({
                        cantidad: Yup.number().nullable().required('Cantidad es requerido.').moreThan(0, 'Cantidad debe ser mayor que 0.')
                    })
                )
        }),
        onSubmit: async (values) => {
            const detallePedidoSaveMap: DetallePedidosRequest[] = values.detallePedidos.map(
                item => {
                    return {
                        id: item.id ?? null,
                        idProducto: item.idProducto,
                        idPedido: item.idPedido,
                        cantidad: item.cantidad,
                        subtotal: item.subtotal,
                    };
                },
            );
            const payload: PedidoRequest = {
                fecha: values.fecha,
                idCliente: values.cliente?.value ?? 0,
                total: values.total,
                detallePedidos: values.detallePedidos,
                detallePedidoSaveDtos: detallePedidoSaveMap
            }

            console.log(payload);
            await handleGuardar(payload);
        }
    });

    // Hooks
    const [showModalProducto, setShowModalProducto] = useState(false);
    const [indexProducto, setIndexProducto] = useState(-1);
    const { data: clientesData, isFetching: isFetchingClientes } = useClienteFindAll();
    // const { data: pedidoFindId, isFetching: isFetchingPedido, isSuccess: isSuccessPedido } = usePedidoFindById(Number(id ?? 0));
    // const { data: detallePedidoData, isFetching: isFetchingDetallePedido, isSuccess: isSuccessDetallePedido } = useDetallePedidoFindAllByIdPedido(Number(id ?? 0));
    const { mutateAsync: pedidoCreateAsync, data: dataPedidoCreateBackendGuardado, isPending: isPendingPedidoCreate, } = usePedidoCreate();
    const { mutateAsync: pedidoEditAsync, data: dataPedidoEditBackendGuardado, isPending: isPendingPedidoEdit, } = usePedidoUpdate();
    const { mutateAsync: deleteByIdAsync } = useDetallePedidoDeleteById();

    const clienteSimple = clientesData?.map(item => ({
        value: item.id,
        label: item.nombreCompleto ?? '',
    }))

    useEffect(() => {
        void formik.setFieldValue('total', total());
    }, [formik.values.detallePedidos, formik.values.detallePedidos.length]);

    // useEffect(() => {
    //     if (isSuccessPedido && isSuccessDetallePedido) {
    //         console.log(pedidoFindId, detallePedidoData);

    //         const clienteOption: Option = {
    //             value: pedidoFindId.idCliente,
    //             label: pedidoFindId.cliente.nombreCompleto
    //         }

    //         setInitialValues(prev => {
    //             return {
    //                 ...prev,
    //                 fecha: dateStringToDate(pedidoFindId.fecha),
    //                 idCliente: pedidoFindId.idCliente,
    //                 cliente: clienteOption,
    //                 detallePedidos: detallePedidoData ?? [],
    //                 total: pedidoFindId.total,
    //                 detallePedidoSaveDtos: []
    //             };
    //         });
    //     }
    // }, [isSuccessPedido, isSuccessDetallePedido, id]);

    // Methods
    const rowSubtotal = (det: DetallePedidosResponse) =>
        (Number(det.cantidad) || 0) * (det.producto?.precioUnitario ?? 0);

    const total = () =>
        (formik.values.detallePedidos ?? []).reduce((acc, det) => acc + rowSubtotal(det), 0);


    const handleAddDetallePedido = (): void => {
        const detalle: DetallePedidosResponse = {
            id: 0,
            idProducto: 0,
            idPedido: 0,
            cantidad: 0,
            subtotal: 0,
            fechaCreacion: new Date(),
            fechaActualizacion: null,
            estado: true,
            producto: null,
            pedido: null,
        };

        const detallePedidos = formik.values.detallePedidos ?? [];
        detallePedidos.push(detalle);
        void formik.setFieldValue('detallePedidos', detallePedidos);
    };

    const hanldeRemoveDetallePedido = async (
        index: number,
        detalle: DetallePedidosResponse,
    ): Promise<void> => {
        console.log(detalle)
        const pregunta = `¿Confirmar eliminación de producto?`;
        const opcionSeleccionado = await swalAlertConfirm(pregunta);
        if (!opcionSeleccionado.isConfirmed) return;

        const detallePedidos = formik.values.detallePedidos ?? [];
        detallePedidos.splice(index, 1);

        if (detalle.id !== 0) await deleteByIdAsync(detalle.id);
        else void formik.setFieldValue('detallePedidos', detallePedidos);
    };

    const openModalProducto = (index: number): void => {
        setIndexProducto(index);
        setShowModalProducto(true);
    };

    const selectAddProducto = (rows: ProductoResponse[]): void => {
        const [producto] = rows;
        console.log(producto, rows)
        const detallePedido = formik.values.detallePedidos[indexProducto];
        if (detallePedido.id !== 0) {
            const mismoDetallePedido: DetallePedidosResponse = {
                ...detallePedido,
                idProducto: producto.id,
                idPedido: Number(0),
                producto,
            };
            void formik.setFieldValue(`detallePedidos[${indexProducto}]`, mismoDetallePedido);
        } else {
            const detallePedidoNueva: DetallePedidosResponse = {
                id: 0,
                idProducto: producto.id,
                idPedido: 0,
                cantidad: 0,
                subtotal: 0,
                fechaCreacion: new Date(),
                fechaActualizacion: null,
                estado: true,
                producto,
                pedido: null,
            };
            void formik.setFieldValue(`detallePedidos[${indexProducto}]`, detallePedidoNueva);
        }
        setIndexProducto(-1);
    };

    const handleGuardar = async (payload: PedidoRequest): Promise<void> => {
        if (id != null) {
            await pedidoEditAsync({ id: Number(id ?? 0), pedido: payload })
        } else {
            await pedidoCreateAsync(payload);
        }
    }

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center bg-transparent fs-3 fw-bold">
                            <span>Datos generales</span>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={12} sm={6} md={4} xxl={3}>
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
                                    {(formik.touched.fecha ?? false) && formik.errors.fecha != null && (
                                        <small className="text-danger">{formik.errors.fecha}</small>
                                    )}
                                </Col>
                                <Col xs={12} sm={6} md={4} xxl={3}>
                                    <Form.Label>Cliente</Form.Label>
                                    <Select
                                        className="react__select"
                                        classNamePrefix="rs_react"
                                        name="cliente"
                                        value={formik.values.cliente ?? ''}
                                        options={clienteSimple}
                                        onChange={(option, target) => {
                                            void formik.setFieldValue(target?.name ?? '', option);
                                        }}
                                        placeholder="Buscar"
                                        menuPlacement="auto"
                                        isClearable
                                    />
                                    {(formik.touched.cliente ?? false) && formik.errors.cliente != null && (
                                        <small className="text-danger">{formik.errors.cliente}</small>
                                    )}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center bg-transparent fs-3 fw-bold">
                            <span>Detalle del pedido</span>

                            <ButtonCore
                                variant="outline-primary"
                                title="Agregar"
                                text="Agregar"
                                icon="fa-plus"
                                size="sm"
                                onClick={handleAddDetallePedido}
                            />
                        </Card.Header>
                        <Card.Body>
                            <Table responsive bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th className="text-nowrap text-center">Acción</th>
                                        <th className="text-nowrap text-center">Producto</th>
                                        <th className="text-nowrap text-center">Cantidad</th>
                                        <th className="text-nowrap text-center">Precio Unitario</th>
                                        <th className="text-nowrap text-center">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formik.values.detallePedidos.length > 0 &&
                                        formik.values.detallePedidos.map((item, index) => {
                                            const detallePedidosErrors = formik.errors.detallePedidos as Array<FormikErrors<DetallePedidosResponse>> ?? [];
                                            return (
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        <ButtonCore
                                                            variant="outline-danger"
                                                            className="border-0"
                                                            text="Eliminar"
                                                            title="Eliminar"
                                                            size="sm"
                                                            onClick={() => {
                                                                void hanldeRemoveDetallePedido(index, item);
                                                            }}
                                                        />
                                                        <ButtonCore
                                                            variant="outline-primary"
                                                            className="border-0"
                                                            text="Seleccionar"
                                                            title="Seleccionar"
                                                            icon="fa-solid fa-hand-pointer"
                                                            size="sm"
                                                            onClick={() => {
                                                                openModalProducto(index);
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <span>{item.producto?.descripcion ?? ''}</span>
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            type="number"
                                                            name={`detallePedidos[${index}].cantidad`}
                                                            value={item.cantidad ?? 0}
                                                            onChange={e => {
                                                                formik.handleChange(e);
                                                                const cantidad = Number(e.target.value) || 0;
                                                                const precioUnitario = item.producto?.precioUnitario ?? 0;
                                                                const subtotal = cantidad * precioUnitario;
                                                                void formik.setFieldValue(`detallePedidos[${index}].subtotal`, subtotal);
                                                            }}
                                                            size="lg"
                                                        />
                                                        {formik.touched.detallePedidos != null && detallePedidosErrors[index]?.cantidad != null && (
																<small className="text-danger">{detallePedidosErrors[index]?.cantidad}</small>
															)}
                                                    </td>
                                                    <td className="text-nowrap text-end">
                                                        <span>S/. {item.producto?.precioUnitario ?? '0.00'}</span>
                                                    </td>
                                                    <td className="text-nowrap text-end">
                                                        <span>S/. {rowSubtotal(item).toFixed(2)}</span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    <tr>
                                        <td className="text-nowrap text-center" colSpan={4}>
                                            <span className="fw-bold">Total</span>
                                        </td>
                                        <td>S/. {formik.values.total.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>

                        <Card.Footer className="d-flex justify-content-between align-items-center bg-transparent fs-3 fw-bold">
                            <NavLinkCore
                                variant=""
                                to={`/pedidos`}
                                text="Cancelar"
                                title="Cancelar"
                                size="sm"
                                // icon="fa-solid fa-pen-to-square"
                                className="btn btn-sm btn-light"

                            />

                            <ButtonCore
                                variant=""
                                className="btn btn-sm btn-dark"
                                text="Guardar"
                                title="Guardar"
                                textLoading="Guardando"
                                isLoading={id != null ? isPendingPedidoEdit : isPendingPedidoCreate}
                                size="sm"
                                onClick={() => {
                                    void formik.handleSubmit();
                                }}
                            />
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>

            <ModalSelectProducto
                handleAdd={selectAddProducto}
                setShowModal={setShowModalProducto}
                showModal={showModalProducto}
            />
        </>
    )
}

export default DatosGuardarPedido;