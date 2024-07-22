import { Iflight } from "../flight/IFlight";
import { IPassenger } from "../passenger/IPassenger";

export interface IRservationRq {
    segments:Iflight[]
    passengers:IPassenger[]
}