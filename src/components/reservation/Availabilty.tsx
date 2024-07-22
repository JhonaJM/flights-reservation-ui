import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from '../../store';
import { choosedItineraries, ClearItineraries, getAvailability } from '../../store/slice/reservation';
import { Accordion, Button, Card, Col, Container, Nav, Navbar, Row, Tab } from 'react-bootstrap';
import { FaEarthAmericas } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import moment from 'moment';

import { IflightSearch, ISelectedFlights } from '../../Interfaces';
import './reservations.css';

export const Availabilty = () => {

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const reservation: IflightSearch = useSelector((state: RootState) => state.reservation);
    const { loading, groupFlights, SelectedFlights } = reservation;
    const firstKey = groupFlights?.[0] ? Object.keys(groupFlights[0])[0] : '';

    const [activeButton, setActiveButton] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<any>(firstKey);
    const [activeKeyAccordion, setActiveKeyAccordion] = useState<any>('0');
    const [expandedTab, setExpandedTab] = useState<boolean>(true);

    const [selectedFlights, setSelectedFlights] = useState<ISelectedFlights>(SelectedFlights || {});

    const handleSelect = (eventKey: string | null) => {
        setActiveTab(eventKey ?? "");
    };
    const handleSelectAccordion = (eventKey: any) => {
        setActiveKeyAccordion(eventKey);
    };

    const handleFlightOptionChange = (group: string, flightId: string) => {
        setSelectedFlights((prevState: any) => ({
            ...prevState,
            [group]: flightId,
        }));


    };

    const handleContinueIssuer = () => {
        dispatch(choosedItineraries(selectedFlights))
        navigate('/PassengersFlight');
    }
    const backToSearchFlight = () => {
        dispatch(ClearItineraries())
        navigate('/home');
    }
    const getTimeDifference = (departureTimeStr: string, arrivalTimeStr: string) => {

        const departureTime = moment(departureTimeStr, "HH:mm");
        const arrivalTime = moment(arrivalTimeStr, "HH:mm");

        const diffInMinutes = arrivalTime.diff(departureTime, 'minutes');


        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        return `${hours} horas ${minutes} minutos`;
    };


    const checkFlightsAvailability = async () => {
        try {
            await dispatch(getAvailability());
            handleSelect(firstKey);
            let noFlightsFound = false;
            const emptyKeys: string[] = [];

            groupFlights?.map((flightGroup) => {
                Object.entries(flightGroup).map(([key, flights]) => {
                    if (Array.isArray(flights) && flights.length == 0) {
                        noFlightsFound = true;
                        emptyKeys.push(key);
                    }

                });
            });

            if (noFlightsFound) {
                const result = await Swal.fire({
                    icon: 'warning',
                    title: 'Vuelos no encontrados',
                    text: `No se encontraron vuelos para: ${emptyKeys.join(', ')}`,
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Volver',
                    customClass: {
                        confirmButton: 'btn button-custom ',
                        cancelButton: 'btn btn-danger'
                    }
                });

                if (result.isDismissed)
                    backToSearchFlight()

            }


        } catch (error) {

        }
    }

    useEffect(() => {
        checkFlightsAvailability();
    }, [firstKey])

    useEffect(() => {
        if (selectedFlights)
            setActiveButton(true);
        else
            setActiveButton(false);

    }, [selectedFlights])

    return (
        <div>
            {loading && (
                <div className="spinner-overlay">
                    <div className="spinner-border color-custom" role="status">
                        <span className="sr-only">
                            <FaEarthAmericas className="spinner-icon" />
                        </span>
                    </div>
                </div>
            )
            }
            <Tab.Container activeKey={activeTab}>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="underline" expanded={expandedTab}>
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpandedTab(!expandedTab)} />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto" onSelect={handleSelect} defaultActiveKey={firstKey}>
                                {groupFlights?.map((flightGroup, index) =>
                                    Object.entries(flightGroup).map(([key]) => (
                                        <Nav.Item key={`nav_${key}_${index}`}>
                                            <Nav.Link eventKey={key}>{key}</Nav.Link>
                                        </Nav.Item>
                                    ))
                                )}
                            </Nav>
                        </Navbar.Collapse>
                        <Nav>
                            <button
                                title="Continuar"
                                onClick={handleContinueIssuer}
                                className="mt-1 me-2 btn btn-sm button-custom-outline"
                                disabled={!activeButton}
                            >
                                Continuar
                            </button>
                            <Button
                                title="Volver"
                                onClick={backToSearchFlight}
                                className="mt-1 me-2"
                                variant="outline-secondary"
                                size="sm"
                            >
                                Volver
                            </Button>
                        </Nav>
                    </Container>
                </Navbar>

                <Container>
                    <Row>
                        <Col sm={12} className='mt-5'>
                            <Tab.Content>
                                {groupFlights?.map((flightGroup, groupIndex) =>
                                    Object.entries(flightGroup).map(([key, flights]) => (
                                        <Tab.Pane eventKey={`${key}`} key={`tab_${key}_${groupIndex}`}>
                                            {Array.isArray(flights) && flights.length > 0 ? (
                                                flights.map((x) => (
                                                    <Accordion
                                                        className="mb-5 pt-0"
                                                        activeKey={activeKeyAccordion}
                                                        onSelect={handleSelectAccordion}
                                                        key={`accordion_${key}_${x.id}`}
                                                    >
                                                        <Accordion.Item eventKey={x.id.toString()} key={x.id} onClick={() => handleFlightOptionChange(key, x.id.toString())}>
                                                            <Accordion.Header>
                                                                <Row className="w-100 text-center align-items-center pt-0">
                                                                    <Col xs={12} md={4} className="w-100">
                                                                        <Card className="text-center text-muted mt-0 col-sm-12 col-md-3 border-info">
                                                                            <Card.Body>
                                                                                <span>Fecha Vuelo: {x.dateFlight.toString().substring(0, 10)}</span>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>

                                                                    <Col xs={1}>
                                                                        <input
                                                                            type="radio"
                                                                            name={`flightGroup_${key}`}
                                                                            checked={selectedFlights != null ? selectedFlights[key] === x.id.toString() : false}
                                                                            onChange={() => handleFlightOptionChange(key, x.id.toString())}
                                                                        />
                                                                    </Col>

                                                                    <Col xs={4} md={1} className="text-center mt-2">
                                                                        <img
                                                                            src={`https://storage.googleapis.com/gcp-production-cdn/cms/images/mobile/airlines/icon-${x.airlineCode}.png`}
                                                                            alt={`${x.airlineCode} icon`}
                                                                        />
                                                                        <br />
                                                                        <span style={{ fontSize: '10px' }} className="text-muted">
                                                                            {x.airlineCode}
                                                                        </span>
                                                                    </Col>

                                                                    <Col xs={4} md={1} className="text-muted fw-bold">
                                                                        {`${x.departureHour} ${x.departureCity}`}
                                                                    </Col>

                                                                    <Col xs={0} md={1} className="text-muted fw-bold d-none d-md-block text-center">
                                                                        <div className="line"></div>
                                                                    </Col>

                                                                    <Col xs={0} md={2} className="text-muted d-none d-md-block text-center">
                                                                        Duración <br />{getTimeDifference(x.departureHour, x.arrivalHour)}
                                                                    </Col>

                                                                    <Col xs={0} md={1} className="text-muted fw-bold d-none d-md-block">
                                                                        <div className="line"></div>
                                                                    </Col>

                                                                    <Col xs={4} md={1} className="text-muted fw-bold">
                                                                        {`${x.arrivalHour}  ${x.arrivalCity}`}
                                                                    </Col>

                                                                    <Col className="mt-xs-mobile-5 text-primary fw-bold fs-4" xs={12} md={4}>
                                                                        {x.currency} {x.price.toFixed(2)}
                                                                    </Col>
                                                                </Row>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <Col>a</Col>
                                                                <Col>f</Col>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                ))
                                            ) : (
                                                <Card className="text-center border-info">
                                                    <Card.Body className="text-info border-info">No flights available {`${key}`}</Card.Body>
                                                </Card>
                                            )}
                                        </Tab.Pane>
                                    ))
                                )}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Container>
            </Tab.Container>
        </div>
    )
}

