import { Iflight } from "../flight/IFlight";
import { IPassenger } from "../passenger/IPassenger";

export interface IRservationRs {
    reservation:IRservation;
    paymentSession:IPaymentSession;
}

export interface IPaymentSession {
    cancelUrl:string;
    succcessUrl:string;
    url:string;
}
export interface IRservation {
    id:string;
    pnrLocator:string;
    status:string;
    currency:string;
    stripeChargeId:String;
    receiptUrl:string;
    //createdAt:Date;
    //updatedAt:Date;
    Segments:Iflight[];
    Passengers:IPassenger[];
}
