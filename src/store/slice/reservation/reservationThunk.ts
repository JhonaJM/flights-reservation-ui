import { AppDispatch, RootState } from "../..";
import { gatewayApi } from "../../../api/gateway";
import { setAirBook, setItineraries, startLoadingItineraries } from "./reservationSlice";

export const getAvailability = () => {

    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startLoadingItineraries());
        try {
            const {data} : any = await gatewayApi.post('/flights/availability', getState().originDestination);
            const itineraries = data.itineraries;
            setTimeout(() => {
                dispatch(setItineraries(itineraries));
            }, 1000);
                       
        } catch (error) {
            console.error('Error fetching flight data:', error);
        }
    }

}

export const completeReservation = () => {

    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startLoadingItineraries());
        try {
          
            const reservationInfo = getState().reservation;
            const { SelectedFlights,passengers } = reservationInfo;            
            const segments = Object.entries(SelectedFlights ?? []).map(([__, flightId]) => ({ id: parseInt(flightId,0) }));            
            const {data}  = await gatewayApi.post('/reservations', {segments,passengers});                       
            dispatch(setAirBook(data));
            
        } catch (error) {
            console.error('Error saving reservation:', error);
        }
    }

}
