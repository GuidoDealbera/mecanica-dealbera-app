import { useDispatch } from "react-redux"
import { AppDispatch } from "../Store/store"
import { CreateCarBody } from "../Types/apiTypes"
import { createCar } from "../Store/async.methods"
import { handleApiError } from "../utils"

export const useQueries = () => {
    const dispatch = useDispatch<AppDispatch>()
    
    const create = async (body: CreateCarBody) => {
        try {
            const result = await dispatch(createCar(body)).unwrap()
            return result
        } catch (error) {
            console.error(error)
            throw handleApiError(error)
        }
    }

    return  {
        create
    }
}