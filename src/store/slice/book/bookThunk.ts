import { gatewayApi } from "../../../api/gateway";
import { AppDispatch, RootState } from "../../store";
import { setbook } from "./bookSlice";

export const getBookByid = (id:string) => {

    return async (dispatch: AppDispatch, getState: () => RootState) => {       
        try {       
            const {data}  = await gatewayApi.get(`/reservations/${id}`);                
            dispatch(setbook(data));
            
        } catch (error) {
            console.error('Error saving reservation:', error);
        }
    }

}