import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
//import { setFlight } from '../../store/slice/reservation';
import { Iflight, IflightSearch } from '../../Interfaces';

export const FlightIndex = () => {
    //const flight : IflightSearch = useSelector((state: RootState) => state);
    const dispatch = useDispatch()

    const initialState: IflightSearch = {
        loading : false,
        message : "",
        groupFlights : [],
    }

    return (
    <div>
       
    </div>
    )
}

