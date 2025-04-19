import axios, { AxiosError } from "axios";

export enum CarsBrands {
  Coradir = "Coradir",
  VoltMotors = "Volt Motors",
  Chevrolet = "Chevrolet",
  Fiat = "Fiat",
  Ford = "Ford",
  Honda = "Honda",
  Hyundai = "Hyundai",
  Jeep = "Jeep",
  Kia = "Kia",
  Nissan = "Nissan",
  Peugeot = "Peugeot",
  Renault = "Renault",
  Toyota = "Toyota",
  Volkswagen = "Volkswagen",
  Citroen = "Citroën",
  DS = "DS Automobiles",
  BMW = "BMW",
  MercedesBenz = "Mercedes-Benz",
  Audi = "Audi",
  Mitsubishi = "Mitsubishi",
  Suzuki = "Suzuki",
  Chery = "Chery",
  Geely = "Geely",
  JAC = "JAC Motors",
  Baic = "BAIC",
  BYD = "BYD",
  Lifan = "Lifan",
  MG = "MG",
  Dodge = "Dodge",
  LandRover = "Land Rover",
  RangeRover = "Range Rover",
  Subaru = "Subaru",
  AlfaRomeo = "Alfa Romeo",
  Mini = "MINI",
  Porsche = "Porsche",
  Lexus = "Lexus",
  Volvo = "Volvo",
  Haval = "Haval",
  Isuzu = "Isuzu",
  Iveco = "Iveco",
  MAN = "MAN",
  DAF = "DAF",
  Kamaz = "Kamaz",
}

export const BRANDS = Object.values(CarsBrands)
  .map((brand) => brand.toUpperCase())
  .sort((a, b) => a.localeCompare(b));

export function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{
      detail: Array<{ msg: string }> | string | { error_origin: string };
    }>;
    if (axiosError.response) {
      const { detail } = axiosError.response.data;
      // Caso 1: Error simple con mensaje directo
      if (typeof detail === "string") {
        return {
          message: detail,
          details: [],
        };
      }

      // Caso 2: Error de procedimiento almacenado
      if (detail && typeof detail === "object" && "error_origin" in detail) {
        const userError = detail;
        return {
          message: userError.error_origin,
          details: [],
        };
      }

      // Caso 3: Array de errores de validación
      if (Array.isArray(detail)) {
        const errorDetails = detail.map((err) => err.msg);
        return {
          message: "Se produjo un error de validación",
          details: errorDetails,
        };
      }

      return {
        message: "Error en la respuesta del servidor",
        details: [],
      };
    }

    if (axiosError.request) {
      return {
        message: "No se recibió respuesta del servidor",
        details: [],
      };
    }

    return {
      message: "Error al configurar la petición",
      details: [],
    };
  }

  return {
    message: "Error desconocido en la operación de API",
    details: [],
  };
}

export const formatLicence = (licencePlate: string): string => {
  const licence = licencePlate.toUpperCase();
  if (licence.length === 7) {
    return `${licence.slice(0, 2)} ${licence.slice(2, 5)} ${licence.slice(5)}`;
  }
  return `${licence.slice(0, 3)} ${licence.slice(3)}`;
};
