import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';

import { AppDispatch, RootState } from '../../store';

import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaEarthAmericas } from 'react-icons/fa6';

import { getBookByid } from '../../store/slice/reservation';
import { IRservation } from '../../Interfaces/reservation/IRservationRs';

import moment from 'moment';



const CompleteReservation = () => {    
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const reservation: IRservation = useSelector((state: RootState) => state.book);
    const [loading, setLoading] = useState<boolean>(true);
    const getBook  = async () => { 
       await dispatch(getBookByid(id ?? ""));
       setLoading(false);

    }

    const handleOpenLink = () => {
        window.open(reservation.receiptUrl, '_blank');
    };
    const home = () => {
        navigate("/");
    };

    useEffect(() => {
        getBook();
    }, [])

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
                       
            <Row>
                <Col xs={12} md={6}>
                    <Col xs={12} className='text-start ps-3 mb-1'>
                        <span className='text-muted fs-4 fw-bold text-center'>Información de la Reserva</span>
                    </Col>
                    <Col xs={12} className='text-start ps-3 mb-1'>
                        <Card className="text-center">
                           
                            <Card.Body>
                                <Card.Title>Felicidades, Reservaste con exito!</Card.Title>
                                <Card.Text>
                                    Código de reserva  <br /><span className='fs-3 color-custom fw-bold'> {reservation.pnrLocator}</span>
                                </Card.Text>
                                <Button className='button-custom me-1' onClick={handleOpenLink}>Ver Voucher</Button>
                                <Button variant="secondary" onClick={home}>Buscar otro vuelo</Button>
                            </Card.Body>
                            {/* <Card.Footer className="text-muted"></Card.Footer> */}
                        </Card>
                    </Col>
                   
                </Col>
                <Col xs={12} md={6}>
                    <Col xs={12} className='text-start ps-3 mb-1'>
                        <span className='text-muted fs-4 fw-bold text-center'>Detalles del itinerario</span>
                    </Col>
                    {
                        reservation.Segments.map(segment => (
                            <Col xs={12} className='text-start ps-3 mb-1'>
                                <Card className="mb-2">                                           
                                    <Card.Body>
                                        <Row className='align-items-center text-center '>
                                            <Col xs={4} className=''>
                                                <span className='fw-bold fs-2 text-muted'>{segment.departureCity}</span>
                                            </Col>
                                            <Col xs={4}>
                                                <span className='text-muted align-items-center'>Duración total 2h 10m</span>
                                            </Col>
                                            <Col xs={4}>
                                                <span className='fw-bold fs-2 text-muted'>{segment.arrivalCity}</span>
                                            </Col>
                                        </Row>
                                        <div className='dashed-line'></div>
                                        <Row className='align-items-center text-center'>
                                            <Col xs={4}>
                                                <span className='fw-bold fs-2 text-muted'>{segment.departureHour}</span><br />
                                                <span className='text-muted '>{moment(segment.dateFlight).format('YYYY-MM-DD') }</span>                                                                
                                            </Col>
                                            <Col xs={4}>
                                                <img src={`https://storage.googleapis.com/gcp-production-cdn/cms/images/mobile/airlines/icon-${segment.airlineCode}.png`} alt="" /><br />
                                                <span className='text-muted '>{segment.airlineCode}</span>   
                                            </Col>
                                            <Col xs={4}>
                                                <span className='fw-bold fs-2 text-muted'>{segment.arrivalHour}</span><br />
                                                <span className='text-muted '>{moment(segment.dateFlight).format('YYYY-MM-DD') }</span>   
                                            </Col>
                                        </Row>
                                    </Card.Body>                    
                                </Card>
                            </Col>
                        ))
                    }
                    
                </Col>
            </Row>

        </Container>
    )
}

export default CompleteReservation
