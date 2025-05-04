import { isAxiosError } from "axios";
import { APIResponse } from "./Types/apiTypes";

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

  export function handleApiError(error: unknown): APIResponse {
    let statusCode = 500;
    let message = 'Ocurrió un error inesperado';
    
    if (isAxiosError(error)) {
      if (error.response) {
        statusCode = error.response.status;
  
        if (typeof error.response.data === 'string') {
          message = error.response.data;
        } else if (typeof error.response.data?.message === 'string') {
          message = error.response.data.message;
        } else if (Array.isArray(error.response.data?.message)) {
          message = error.response.data.message[0]; // en caso de validaciones tipo DTO
        } else {
          message = 'Error en la respuesta del servidor';
        }
  
      } else {
        // Error sin respuesta (por ejemplo, sin internet)
        statusCode = error.status || 500;
        message = error.message || 'No se pudo conectar al servidor';
      }
  
    } else if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }
  
    return {
      statusCode,
      message,
      result: null,
    };
  }

export const formatLicence = (licencePlate: string): string => {
  const licence = licencePlate.toUpperCase();
  if (licence.length === 7) {
    return `${licence.slice(0, 2)} ${licence.slice(2, 5)} ${licence.slice(5)}`;
  }
  return `${licence.slice(0, 3)} ${licence.slice(3)}`;
};
