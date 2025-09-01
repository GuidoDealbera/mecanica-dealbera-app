import {CreateCarDto} from './electron/database/Types/car.dto'
import { APIResponse } from './src/Types/apiTypes'
import { Car, Client } from './src/Types/types'
export {}

declare global {
    interface Window {
        api: {
            cars: {
                createCar: (car: CreateCarDto) => Promise<APIResponse>
                getAllCars: () => Promise<Car[]>
                getCarByLicense: (license: string) => Promise<APIResponse>
            }

            clients: {
                getAllClients: () => Promise<Client[]>
            }
        }
    }
}