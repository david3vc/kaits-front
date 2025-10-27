import { useEffect, useState, type JSX } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { ButtonCore } from "../../../core/components/general";
import type { DetallePedidosRequest, DetallePedidosResponse, PedidoRequest, ProductoResponse } from "../../../types";
import { useFormik } from "formik";
import { swalAlertConfirm } from "../../../core/helpers/SwalHelper";
import ModalSelectProducto from "./ModalSelectProducto";
import { useClienteFindAll } from "../../cliente/hooks";
import type { Option } from "../../../core/helpers/OptionsMapperHelper";
import { usePedidoCreate } from "../hooks";

interface Pedidoformik extends PedidoRequest {
    cliente: Option | null;
}

const DatosGuardarPedido = (): JSX.Element => {
    //Attributes
    const [initialValues, setInitialValues] = useState<Pedidoformik>({
        fecha: new Date(),
        idCliente: 0,
        total: 0,
        cliente: null,
        detallePedidos: [],
        detallePedidoSaveDtos: []
    });

    const formik = useFormik<Pedidoformik>({
        enableReinitialize: true,
        initialValues,
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
            await pedidoCreateAsync(payload);
        }
    });

    // Hooks
    const [showModalProducto, setShowModalProducto] = useState(false);
    const [indexProducto, setIndexProducto] = useState(-1);
    const { data: clientesData, isFetching: isFetchingClientes } = useClienteFindAll();
    const { mutateAsync: pedidoCreateAsync, data: dataPedidoCreateBackendGuardado, isPending: isPendingPedidoCreate, } = usePedidoCreate();
    const clienteSimple = clientesData?.map(item => ({
        value: item.id,
        label: item.nombreCompleto ?? '',
    }))

    useEffect(() => {
        void formik.setFieldValue('total', total());
    }, [formik.values.detallePedidos, formik.values.detallePedidos.length]);

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
        const pregunta = `¿Confirmar eliminación de profesión?`;
        const opcionSeleccionado = await swalAlertConfirm(pregunta);
        if (!opcionSeleccionado.isConfirmed) return;

        const detallePedidos = formik.values.detallePedidos ?? [];
        detallePedidos.splice(index, 1);

        // if (detalle.id !== 0) await detalleDeleteAsync(detalle.id);
        // else void formik.setFieldValue('detallePedidos', detallePedidos);
        void formik.setFieldValue('detallePedidos', detallePedidos);
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
                                    {/* {(formik.touched.numeroDocumento ?? false) && formik.errors.numeroDocumento != null && (
											<small className="text-danger">{formik.errors.numeroDocumento}</small>
										)} */}
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
                                    {/* {(formik.touched.nombres ?? false) && formik.errors.nombres != null && (
											<small className="text-danger">{formik.errors.nombres}</small>
										)} */}
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
                                        formik.values.detallePedidos.map((item, index) => (
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
                                                </td>
                                                <td className="text-nowrap text-end">
                                                    <span>S/. {item.producto?.precioUnitario ?? ''}</span>
                                                </td>
                                                <td className="text-nowrap text-end">
                                                    <span>S/. {rowSubtotal(item).toFixed(2)}</span>
                                                </td>
                                            </tr>
                                        ))}
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
                            <ButtonCore
                                variant=""
                                className="btn btn-sm btn-light"
                                text="Cancelar"
                                title="Cancelar"
                                size="sm"
                            // onClick={() => {
                            // 	void formik.handleSubmit();
                            // }}
                            />

                            <ButtonCore
                                variant=""
                                className="btn btn-sm btn-dark"
                                text="Guardar"
                                title="Guardar"
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