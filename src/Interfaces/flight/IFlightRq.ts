export interface IFlightRq {
    departureCity: string;
    arrivalCity: string;
    departureDate: Date;

    pageIndex: number,
    pageSize: number,
}