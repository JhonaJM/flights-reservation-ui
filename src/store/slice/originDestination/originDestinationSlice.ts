import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IOriginDestination,IOriginDestinationDetails } from '../../../Interfaces';

const InitialoriginDestinationDetails: IOriginDestinationDetails[] = [{
    departureCity: "",
    arrivalCity: "",
    departureDate: new Date(new Date()).toISOString().split('T')[0],
}];

const initialState: IOriginDestination = {
    items: InitialoriginDestinationDetails,
    pax: 1
};

export const originDestinationSlice = createSlice({
  name: 'originDestination',
  initialState,
  reducers: {
    setOriginDestination: (state, action: PayloadAction<IOriginDestination>) => {
    return { ...state, ...action.payload };
    },
    resetOriginDestination: () => initialState,
  },
})
export const { setOriginDestination} = originDestinationSlice.actions