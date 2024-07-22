import { IPassenger } from "../passenger/IPassenger";
import { IRservationRs } from "../reservation/IRservationRs";

export interface Iflight {
    id: number;
    airlineCode: string;
    departureCity: string;
    arrivalCity: string;
    dateFlight: Date;
    flightNumber: string;
    departureHour: string;
    arrivalHour: string;
    availableSeats: number;
    currency: string;
    price: number;
}


export interface ISelectedFlights {
    [key: string]: string;
}

export interface IflightSearch {
    loading: boolean;
    message: string;
    groupFlights?: [string, Iflight[]][];
    SelectedFlights?: ISelectedFlights;
    passengers?: IPassenger[]
    airBook?: IRservationRs
}
