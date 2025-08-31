import { DataSource } from 'typeorm'
import path from 'path'
import { app } from 'electron'
import { Car } from './entities/car.entity'
import { Client } from './entities/clients.entity'

// Función para obtener la ruta final del archivo sqlite
function getDBPath () {
    const userDBPath = app.getPath("userData")
    return path.join(userDBPath, "app.sqlite")
}

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: getDBPath(),
    entities: [Car, Client],
    synchronize: true,
    logging: false
})