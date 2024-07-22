import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { RootState } from "../../store";
import { setOriginDestination } from "../../store/slice/originDestination";

import { Button, Card, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap"
import Select from "react-select"
import AsyncSelect from "react-select/async";
import { BsTrash2Fill, BsPlusCircleFill } from "react-icons/bs"
import moment from "moment";

import { customSelectStyles } from "../../common";
import { ILocation, IOriginDestination } from "../../Interfaces";
import { getLocation } from "../../services";

import './reservations.css'

import { originDestinationValidators } from "../../validators/originDestinationValidators";

export const SearchFlights = () => {
    const originDestination: IOriginDestination = useSelector((state: RootState) => state.originDestination);
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const { register, handleSubmit, setValue, control,
        formState: { errors }
    } = useForm<IOriginDestination>({ defaultValues: originDestination });

    const { fields: originDestinationDetailsFields, append, remove } = useFieldArray<IOriginDestination>({
        control,
        name: "items",
    });

    const loadLocations = async (value: string) => {
        if (value.length < 3 && value !== "") {
            return [];
        }

        const [location] = await getLocation(value);

        return location.map((location: ILocation) => ({
            label: `${location.name} - ${location.airport}`,
            value: location.city,
        }));
    };

    const getMinDate = (index: number) => {
        if (index === 0) {
            return moment(new Date()).add(0, 'days').format('YYYY-MM-DD')
        } else {
            const previousDate = originDestinationDetailsFields[index - 1]?.departureDate;
            if (previousDate) {
                return moment(previousDate).add(0, 'days').format('YYYY-MM-DD');
            }
        }
    };

    const handleAddSearch = () => {
        append(originDestination.items);
    }

    const onSubmit = async (data: IOriginDestination) => {
        try {
            dispatch(setOriginDestination(data));
            navigate('/availabilty');
        } catch (error: any) {
        }
    }



    return (
        <Container className='p-0 mt-5' >
            <Row className='justify-content-center'>
                <Col xs={12}>
                    <Card text="light">
                        <Card.Header style={{ background: '#001529' }}>
                            <Row>
                                <Col xs={6} md={6} lg={4} style={{ paddingTop: "5px" }}>
                                    <h5 className="card-title ">Búsqueda de vuelos</h5>
                                </Col>
                            </Row>
                        </Card.Header>
                    </Card>
                    <Card className="mt-4">
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col xs={12} md={2} className="mb-2">
                                        <Form.Group controlId="">
                                            <span className=" mb-5" style={{ fontSize: '14px', fontWeight: 'bold', color: '#001529' }}>Pasajeros</span><br />
                                            <Select
                                                className={"react-select"}
                                                classNamePrefix={"react-select"}
                                                options={[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => ({ value: n, label: n }))}
                                                defaultValue={{ value: originDestination.pax, label: originDestination.pax }}
                                                placeholder=""
                                                {...register('pax')}
                                                onChange={(selectedOption: any) => {
                                                    setValue('pax', selectedOption?.value ?? 0);
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {
                                    originDestinationDetailsFields.map((originDestination, id) => (
                                        <Row key={id}>
                                            <Col xs={12} md={4} className="mb-2">
                                                <Form.Group controlId="formGroupDepartureCity">
                                                    <FloatingLabel controlId="floatingInputDepartureCity" label="">
                                                        <Controller
                                                            control={control}
                                                            name={`items.${id}.departureCity`}
                                                            render={() => (
                                                                <AsyncSelect
                                                                    cacheOptions
                                                                    defaultOptions
                                                                    isClearable
                                                                    styles={customSelectStyles}
                                                                    className={"react-select"}
                                                                    classNamePrefix={"react-select"}
                                                                    loadOptions={loadLocations}
                                                                    placeholder="Desde"
                                                                    {...register(`items.${id}.departureCity`, originDestinationValidators.departureCity)}
                                                                    defaultValue={{ value: originDestination.departureCity.length > 0 ? originDestination.departureCity : 'Desde', label: originDestination.departureCity.length > 0 ? originDestination.departureCity : 'Desde' }}
                                                                    onChange={selectedOption => {
                                                                        setValue(`items.${id}.departureCity`, selectedOption?.value ?? "");
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </FloatingLabel>
                                                    {errors.items?.[id]?.departureCity && <span className="text-danger">{errors.items?.[id]?.departureCity.message}</span>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} md={4} className="mb-2">
                                                <Form.Group controlId="formGroupArrivalCity">
                                                    <FloatingLabel controlId="floatingInputArrivalCity" label="">
                                                        <Controller
                                                            control={control}
                                                            name={`items.${id}.arrivalCity`}
                                                            render={() => (
                                                                <AsyncSelect
                                                                    cacheOptions
                                                                    defaultOptions
                                                                    isClearable
                                                                    styles={customSelectStyles}
                                                                    className={"react-select"}
                                                                    classNamePrefix={"react-select"}
                                                                    loadOptions={loadLocations}
                                                                    placeholder="Hasta"
                                                                    {...register(`items.${id}.arrivalCity`, originDestinationValidators.arrivalCity)}
                                                                    defaultValue={{ value: originDestination.arrivalCity.length > 0 ? originDestination.arrivalCity : 'Hasta', label: originDestination.arrivalCity.length > 0 ? originDestination.arrivalCity : 'Hasta' }}
                                                                    onChange={selectedOption => {
                                                                        setValue(`items.${id}.arrivalCity`, selectedOption?.value ?? "");
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </FloatingLabel>
                                                    {errors.items?.[id]?.arrivalCity && <span className="text-danger">{errors.items?.[id]?.arrivalCity.message}</span>}
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} md={2} className="mb-2">
                                                <Form.Group controlId="formGroupArrivalCity">
                                                    <FloatingLabel controlId="floatingInputArrivalCity" label="">
                                                        <Form.Group controlId={`formGroupDate_${id}`}>
                                                            <FloatingLabel controlId={`floatingInputDate_${id}`} label="Fecha">

                                                                <Form.Control
                                                                    type="date"
                                                                    {...register(`items.${id}.departureDate`, originDestinationValidators.departureDate)}
                                                                    onChange={(e) => setValue(`items.${id}.departureDate`, new Date(e.target.value).toISOString().split('T')[0])}
                                                                    min={getMinDate(id)}
                                                                />
                                                            </FloatingLabel>
                                                            {errors.items?.[id]?.departureDate && <span className="text-danger">{errors.items?.[id]?.departureDate.message}</span>}
                                                        </Form.Group>
                                                    </FloatingLabel>
                                                </Form.Group>
                                            </Col>
                                            <Col md={2}
                                                className="text-start "
                                            >
                                                {(originDestinationDetailsFields.length - 1 == id) && (
                                                    <>
                                                        <Button
                                                            title="Agregar Vuelo"
                                                            onClick={handleAddSearch}
                                                            className="mt-1 me-2 button-custom-outline"
                                                            size="lg"
                                                        >
                                                            <BsPlusCircleFill />
                                                        </Button>
                                                        {(originDestinationDetailsFields.length - 1 != 0) && (
                                                            <Button
                                                                title="Quitar Vuelo"
                                                                onClick={() => remove(id)}
                                                                className="mt-1"
                                                                variant="outline-danger"
                                                                size="lg"
                                                            >
                                                                <BsTrash2Fill />
                                                            </Button>
                                                        )}

                                                    </>

                                                )}
                                            </Col>

                                        </Row>
                                    ))
                                }
                                <Row>
                                    <Col xs={12} md={{ span: 4, offset: 6 }} className="mb-2 d-flex justify-content-end">
                                        <Button
                                            title="Agregar Vuelo"
                                            onClick={handleSubmit(onSubmit)}
                                            className="mt-1 button-custom-outline"
                                            //variant="outline-primary"
                                            size="lg"
                                        >
                                            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Buscar Vuelos</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>

        </Container>
    )
}

export default SearchFlights
