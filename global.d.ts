import {CreateCarDto} from './electron/database/Types/car.dto'
export {}

declare global {
    interface Window {
        api: {
            createCar: (car: CreateCarDto) => Promise<any>
        }
    }
}