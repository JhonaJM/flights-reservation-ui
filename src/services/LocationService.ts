import { ILocation } from "../Interfaces";
import { locations } from '../data/locations'

export const getLocation = async (location: string): Promise<[ILocation[], string]> => {
    try {
        const filteredAirports = locations.airports.filter(airport =>

            airport.name.toUpperCase().includes(location.toUpperCase()) ||
            airport.city.toUpperCase() === location.toUpperCase());
        return [filteredAirports, ""];

    } catch (error: any) {
        console.error('Error al obtener locations :', error);
        return [[], error.response.data];
    }
};