import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';

import { AppDispatch, RootState } from '../../store';
import { setPassengers } from '../../store/slice/reservation';

import { Accordion, Button,  Col, Container, FloatingLabel, Form, Nav, Navbar, Row } from 'react-bootstrap';
import Select from 'react-select'

import { IflightSearch,IOriginDestination } from '../../Interfaces';
import { passengerValidators } from '../../validators/passengerValidators';
import { FlightInformation } from './FlightInformation';

import { customSelectStyles } from '../../common';

const PassengersFlight = () => {

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const reservation: IflightSearch = useSelector((state: RootState) => state.reservation);
    const originDestination : IOriginDestination = useSelector((state: RootState) => state.originDestination);
    const {SelectedFlights,groupFlights } = reservation;
    const segmentsId = Object.entries(SelectedFlights ?? []).map(([__, flightId]) => (parseInt(flightId,0)));    
   
    const { register, handleSubmit,setValue,getValues, control,watch,
        formState: { errors }
    } = useForm<IflightSearch>({ defaultValues: reservation });

    const { fields: passengersFields, append } = useFieldArray<IflightSearch>({
        control,
        name: "passengers",
    });

    useEffect(() => {
        if (passengersFields.length === 0) {
            for (let i = 0; i < originDestination.pax; i++) {
                append({giveName: "", surName: '',typeCode:'ADT',identification:'DNI',documentNumber:'' });
            }
        }
    }, [append, passengersFields.length]);

    
    const [activeKeyAccordion, setActiveKeyAccordion] = useState<any>('0');
    const [expandedTab, setExpandedTab] = useState<boolean>(true);  
    const [selectedTypeDocument, setSelectedTypeDocument] = useState<{value:string,label:string}>({value:"DNI",label:"DNI"}); 
    
  
    

    const handleSelectAccordion = (eventKey: any) => {
        setActiveKeyAccordion(eventKey);
    };

    const handleFlightOptionChange = (id: string) => {       
    };

    const handleContinueIssuer = () => { 
        const passengers = getValues('passengers') ?? [];                
        dispatch(setPassengers(passengers))
        navigate('/summaryFlight');
    }
    const backToSearchFlight = () => {
        navigate('/availabilty')
    }

    
  return (
    <Container className='p-0 mt-5' >
        <Navbar  collapseOnSelect expand="lg" bg="light" variant="underline" expanded={expandedTab}>
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpandedTab(!expandedTab)} />
                        
                        <Nav  className="ms-auto">
                            <Button
                                title="Continuar"
                                onClick={handleSubmit(handleContinueIssuer)}                                
                                className="mt-1 me-2"
                                variant="outline-primary"
                                size="sm"
                            >
                                Continuar
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
                <Col xs={12} md={6}>
                    <Col xs={12} className='text-start ps-3 mb-1'>
                        <span className='text-muted fs-4 fw-bold text-center'>Información de pasajeros</span>
                    </Col>
                    <Col xs={12} className='mb-4'>
                        {
                            passengersFields.map((__,index) => {
                                const identification = watch(`passengers.${index}.identification`);
                                const validators = passengerValidators(identification);
                                return (<Accordion
                                    className="mb-2 pt-0"
                                    activeKey={activeKeyAccordion}
                                    onSelect={handleSelectAccordion}
                                    key={index}
                                >
                                    <Accordion.Item eventKey={index.toString()} key={index.toString()}  onClick={() => handleFlightOptionChange( index.toString())}>
                                        <Accordion.Header>
                                            Pasajero {index + 1}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Row>
                                                <Form.Group className='col-sm-6 mb-2'  controlId="">
                                                    <FloatingLabel
                                                    controlId=""
                                                    label="Nombre"                      
                                                    >
                                                    <Form.Control 
                                                    size="sm"
                                                    type="text" 
                                                    placeholder=""                                                    
                                                    {...register(`passengers.${index}.giveName`,validators.giveName)}
                                                    />
                                                    </FloatingLabel>
                                                    {errors.passengers?.[index]?.giveName && <span className="text-danger">{errors.passengers?.[index]?.giveName.message}</span>}
                                                </Form.Group>
                                                <Form.Group className='col-sm-6 mb-2'  controlId="">
                                                    <FloatingLabel
                                                    controlId=""
                                                    label="Apellido"                      
                                                    >
                                                    <Form.Control 
                                                    size="sm"
                                                    type="text" 
                                                    placeholder=""
                                                    {...register(`passengers.${index}.surName`,validators.surName)}
                                                    />
                                                    </FloatingLabel>
                                                    {errors.passengers?.[index]?.surName && <span className="text-danger">{errors.passengers?.[index]?.surName.message}</span>}
                                                </Form.Group> 
                                                <Form.Group className='col-sm-6 mb-2'  controlId="">
                                                    <FloatingLabel
                                                    controlId=""
                                                    label=""                      
                                                    >
                                                    <Select                                                         
                                                        styles={customSelectStyles}
                                                        className={"react-select"}
                                                        classNamePrefix={"react-select"}   
                                                        placeholder="Tipo Documento"                             
                                                        options={["DNI","PASSAPORTE"].map(d => ({ value: d, label: d }))}                         
                                                        value={selectedTypeDocument}    
                                                        {...register(`passengers.${index}.identification`, validators.identification)}                   
                                                        onChange={selectedOption => {  
                                                        setSelectedTypeDocument(selectedOption  as { value: string; label: string; });                           
                                                        setValue(`passengers.${index}.identification`, selectedOption?.value ?? "DNI");                                 
                                                        }}
                                                    />
                                                    </FloatingLabel> 
                                                    {errors.passengers?.[index]?.identification && <span className="text-danger">{errors.passengers?.[index]?.identification.message}</span>}                                                   
                                                </Form.Group>
                                                <Form.Group className='col-sm-6 mb-2'  controlId="">
                                                    <FloatingLabel
                                                    controlId=""
                                                    label="Número Documento"                      
                                                    >
                                                    <Form.Control 
                                                    size="sm"
                                                    type="text" 
                                                    placeholder=""    
                                                    {...register(`passengers.${index}.documentNumber`,validators.documentNumber)}                                                
                                                    />
                                                    </FloatingLabel>
                                                    {errors.passengers?.[index]?.documentNumber && <span className="text-danger">{errors.passengers?.[index]?.documentNumber.message}</span>}                                                   
                                                </Form.Group>                                                
                                            </Row>                                        
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            )})
                        }
                    </Col>
                </Col>
                {
                    groupFlights ? (<FlightInformation groupFlights={groupFlights} segmentsId={segmentsId} />  ) : ''
                }
                                         
            </Row>
           
    </Container>
  )
}

export default PassengersFlight
