import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IflightSearch, Iflight, ISelectedFlights } from '../../../Interfaces'
import { IPassenger } from '../../../Interfaces/passenger/IPassenger'
import { IRservationRs } from '../../../Interfaces/reservation/IRservationRs'

const initialState: IflightSearch = {
  loading : false,
  message : "",
  groupFlights : [],
  passengers:[]
}

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    startLoadingItineraries:(state) => {
      state.loading = true;
    },
    ClearItineraries: (state) => {   
      state.loading = false;
      state.groupFlights = [];
    },
    setItineraries: (state, action: PayloadAction<[string, Iflight[]][]>) => {   
      state.loading = false;
      state.groupFlights = action.payload;
    },

    ClearSelectedItineraries: (state) => {   
      state.loading = false;
      state.SelectedFlights = {};
    },

    choosedItineraries: (state, action: PayloadAction<ISelectedFlights>) => {   
      state.loading = false;
      state.SelectedFlights = action.payload;
    },
    setPassengers: (state, action: PayloadAction<IPassenger[]>) => {        
      state.passengers = action.payload;
    },
    setAirBook: (state, action: PayloadAction<IRservationRs>) => {    
      state.loading = false;    
      state.airBook = action.payload;
    },
   
  },
})

export const {startLoadingItineraries,setItineraries,choosedItineraries,setPassengers,setAirBook,ClearItineraries,ClearSelectedItineraries } = reservationSlice.actions
