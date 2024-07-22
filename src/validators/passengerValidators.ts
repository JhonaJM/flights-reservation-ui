export const passengerValidators = (identification: string) => ({
  giveName: {
    required: "El nombre es requerido",
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "El nombre solo puede contener letras",
    },
  },
  surName: {
    required: "El apellido es requerido",
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "El apellido solo puede contener letras",
    },
  },
  typeCode: {
    required: "El tipo de código es requerido",
    validate: (value: string) => {
      const validCodes = ["ADT", "CHD"];
      return validCodes.includes(value) || "El tipo de código no es válido";
    },
  },
  identification: {
    required: "El tipo de identificación es requerido",
    validate: (value: string) => {
      const validIdentifications = ["DNI", "PASSAPORTE"];
      return validIdentifications.includes(value) || "El tipo de identificación no es válido";
    },
  },
  documentNumber: {
    required: "El número de documento es requerido",
    validate: (value: string) => {
      if (identification === "DNI") {
        const dniPattern = /^\d{8}$/;
        return dniPattern.test(value) || "El DNI debe tener 8 dígitos";
      } else if (identification === "PASSAPORTE") {
        const passportPattern = /^[A-Za-z0-9]{5,10}$/;
        return passportPattern.test(value) || "El PASSAPORTE debe tener entre 5 y 10 caracteres alfanuméricos";
      }
      return true;
    },
  },
});