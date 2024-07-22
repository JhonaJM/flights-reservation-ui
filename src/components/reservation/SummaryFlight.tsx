import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from '../../store';
import { completeReservation } from '../../store/slice/reservation';

import { Button, Card, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { FaEarthAmericas } from 'react-icons/fa6';

import { Iflight, IflightSearch } from '../../Interfaces';
import { FlightInformation } from './FlightInformation';

import './reservations.css';

const SummaryFlight = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, airBook, groupFlights, SelectedFlights }: IflightSearch = useSelector((state: RootState) => state.reservation);
    const { pax } = useSelector((state: RootState) => state.originDestination);
    const segmentsId = Object.entries(SelectedFlights ?? []).map(([__, flightId]) => (parseInt(flightId, 0)));

    let segmentsFounded: Iflight[] = [];
    groupFlights?.map((flightGroup) => {
        Object.entries(flightGroup).map(([__, flights]) => {
            if (Array.isArray(flights) && flights.length > 0) {
                const f = flights.find(x => segmentsId.includes(x.id))
                if (f != undefined)
                    segmentsFounded.push(f);
            }

        });
    });

    const handleCheckout = (url: string) => {
        const stripeCheckoutUrl = url;
        window.location.href = stripeCheckoutUrl;
    };

    const handleContinueIssuer = async () => {
        await dispatch(completeReservation());
    }
    const backToSearchFlight = () => {
        navigate('/PassengersFlight')
    }

    useEffect(() => {
        if (!!airBook?.paymentSession.url) {
            handleCheckout(airBook?.paymentSession.url ?? "");
        }
    }, [airBook])


    return (
        <Container className='p-0 mt-5' >
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
            <Navbar collapseOnSelect expand="lg" bg="light" variant="underline" expanded={true}>
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Nav className="ms-auto">
                        <Button
                            title="Finalizar Compra"
                            onClick={handleContinueIssuer}
                            className="mt-1 me-2"
                            variant="outline-primary"
                            size="sm"
                        >
                            Finalizar Compra
                        </Button>
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

            <Row>
                {
                    groupFlights ? (<FlightInformation groupFlights={groupFlights} segmentsId={segmentsId} />) : ''
                }

                <Col xs={12} md={6}>
                    <Col xs={12} className='text-start ps-3 mb-1'>
                        <span className='text-muted fs-4 fw-bold text-center'>Detalle de la compra</span>
                    </Col>
                    <Col xs={12} className='mb-4'>
                        <Card className="mb-2">
                            <Card.Header>
                                <Row className='align-items-center text-center '>
                                    <Col xs={12}>
                                        <Row>
                                            <Col xs={6} className='text-start'>
                                                <span className='text-muted text-start col-6'>Tarifa Base</span>
                                            </Col>
                                            <Col xs={3} className='text-end'>
                                                <span className='fw-bold fs-6 text-muted text-end col-6'>USD</span>
                                            </Col>

                                            <Col xs={3} className='text-start'>
                                                <span className='fw-bold fs-6 text-muted text-end col-6'>{segmentsFounded.reduce((total, segment) => total + segment.price, 0)}</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Row className='align-items-center text-center '>
                                    <Col xs={12}>
                                        <Row>
                                            <Col xs={6} className='text-start'>
                                                <span className='text-muted text-start col-6'>Cargos Administrativos</span>
                                            </Col>
                                            <Col xs={3} className='text-end'>
                                                <span className='fw-bold fs-6 text-muted text-end col-6'>USD</span>
                                            </Col>

                                            <Col xs={3} className='text-start'>
                                                <span className='fw-bold fs-6 text-muted text-end col-6'>0.00</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    <Col xs={6} className='text-start'>
                                        <span className='fw-bold fs-5  text-end col-6 color-custom'>Monto Vuelos</span>
                                    </Col>
                                    <Col xs={3} className='text-end'>
                                        <span className='fw-bold fs-5  text-end col-6 color-custom'>USD</span>
                                    </Col>

                                    <Col xs={3} className='text-start'>
                                        <span className='fw-bold fs-5  text-end col-6 color-custom'>{segmentsFounded.reduce((total, segment) => total + segment.price, 0)}</span>
                                    </Col>
                                </Row>
                            </Card.Footer>
                            <Card.Footer>
                                <Row>
                                    <Col xs={6} className='text-start'>
                                        <span className='fw-bold fs-6  text-end col-6 color-custom'>Pax</span>
                                    </Col>
                                    <Col xs={3} className='text-end'>
                                        <span className='fw-bold fs-6 text-end col-6 color-custom'></span>
                                    </Col>

                                    <Col xs={3} className='text-start'>
                                        <span className='fw-bold fs-6  text-end col-6 color-custom' style={{ marginLeft: '50px' }}>{pax}</span>
                                    </Col>
                                </Row>
                            </Card.Footer>
                            <Card.Footer>
                                <Row>
                                    <Col xs={6} className='text-start'>
                                        <span className='fw-bold fs-5 text-danger  text-end col-6 color-custom'>Total</span>
                                    </Col>
                                    <Col xs={3} className='text-end'>
                                        <span className='fw-bold fs-5 text-danger  text-end col-6 color-custom'>USD</span>
                                    </Col>

                                    <Col xs={3} className='text-start'>
                                        <span className='fw-bold fs-5 text-danger  text-end col-6 color-custom'>{pax * segmentsFounded.reduce((total, segment) => total + segment.price, 0)}</span>
                                    </Col>
                                </Row>
                            </Card.Footer>

                        </Card>
                    </Col>
                </Col>
            </Row>

        </Container>
    )
}

export default SummaryFlight
