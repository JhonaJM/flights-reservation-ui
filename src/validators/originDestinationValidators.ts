import moment from "moment";

export const originDestinationValidators = {
    departureCity: {
        required: {
          value: true,
          message: "La ciudad de salida es requerida"
        },
        validate: (value: string) => {
          return value && value.length === 3 || "Código Iata incorrecto";
        }
      },
    arrivalCity: {
        required: {
          value: true,
          message: "La ciudad de llegada es requerida"
        },
        validate: (value: string) => {
          return value && value.length === 3 || "Código Iata incorrecto";
        }
    },
    departureDate: {
        required: {
          value: true,
          message: "La fecha es requerida"
        },
        validate: (value: string) => {            
            const isValidDate = moment(value, 'YYYY-MM-DD', true).isValid();            
            const isNotInThePast = moment(value).isSameOrAfter(moment(), 'day');
            return isValidDate && isNotInThePast || "Fecha inválida o en el pasado";
    }}
  };