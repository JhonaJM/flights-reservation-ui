import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRservation } from "../../../Interfaces/reservation/IRservationRs"

const initialState: IRservation = {    
    id:"",
    pnrLocator:"",
    status:"",
    currency:"",
    stripeChargeId:"",
    receiptUrl:"",
    Segments:[],
    Passengers:[]
}
export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
      
      setbook: (state, action: PayloadAction<IRservation>) => {           
        return { ...state, ...action.payload };
      },
     
    },
  })
  
  export const {setbook} = bookSlice.actions
  