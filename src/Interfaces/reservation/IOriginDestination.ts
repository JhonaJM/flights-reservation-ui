export interface IOriginDestination {
    pax:number,
    items : IOriginDestinationDetails[],
}

export interface IOriginDestinationDetails {
    departureDate : string,
    departureCity:string,
    arrivalCity:string,

}