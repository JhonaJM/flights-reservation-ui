import { Card, Col, Row } from 'react-bootstrap'
import { Iflight } from '../../Interfaces';
import moment from 'moment'


interface FlightInformationProps {
    groupFlights: [string, Iflight[]][] | undefined;
    segmentsId: number[];
}

export const FlightInformation: React.FC<FlightInformationProps> = ({ groupFlights, segmentsId }) => {

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

    const getTimeDifference = (departureTimeStr: string, arrivalTimeStr: string) => {

        const departureTime = moment(departureTimeStr, "HH:mm");
        const arrivalTime = moment(arrivalTimeStr, "HH:mm");

        let diffInMinutes = arrivalTime.diff(departureTime, 'minutes');

        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        return `${hours} hrs. ${minutes} min.`;
    };


    return (
        <Col xs={12} md={6}>
            <Col xs={12} className='text-start ps-3 mb-1'>
                <span className='text-muted fs-4 fw-bold text-center'>Información de Vuelo</span>
            </Col>
            {
                segmentsFounded.map(f => (
                    <Col xs={12} className='mb-4'>
                        <Card className="mb-2">
                            <Card.Body>
                                <Row className='align-items-center text-center '>
                                    <Col xs={4} className=''>
                                        <span className='fw-bold fs-2 text-muted'>{f.departureCity}</span>
                                    </Col>
                                    <Col xs={4}>
                                        <span className='text-muted align-items-center'>Duración {getTimeDifference(f.departureHour, f.arrivalHour)}</span>
                                    </Col>
                                    <Col xs={4}>
                                        <span className='fw-bold fs-2 text-muted'>{f.arrivalCity}</span>
                                    </Col>
                                </Row>
                                <div className='dashed-line'></div>
                                <Row className='align-items-center text-center'>
                                    <Col xs={4}>
                                        <span className='fw-bold fs-2 text-muted'>{f.departureHour}</span><br />
                                        <span className='text-muted '>{moment(f.dateFlight).format('YYYY-MM-DD')}</span>
                                    </Col>
                                    <Col xs={4}>
                                        <img src={`https://storage.googleapis.com/gcp-production-cdn/cms/images/mobile/airlines/icon-${f.airlineCode}.png`} alt="" /><br />
                                        <span className='text-muted '>{f.airlineCode}</span>
                                    </Col>
                                    <Col xs={4}>
                                        <span className='fw-bold fs-2 text-muted'>{f.arrivalHour}</span><br />
                                        <span className='text-muted '>{moment(f.dateFlight).format('YYYY-MM-DD')}</span>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }

        </Col>
    )
}

