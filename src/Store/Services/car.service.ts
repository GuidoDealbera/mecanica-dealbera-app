import { API_BASE_URL, apiAxios } from "../../axios.config";
import { CreateCarBody } from "../../Types/apiTypes";
import { Car } from "../../Types/types";
import { handleApiError } from "../../utils";

const SERVER_URL = `${API_BASE_URL}/cars`;

export const carService = {
  create: async (body: CreateCarBody): Promise<Car> => {
    try {
      return (await apiAxios.post<Car>(`${SERVER_URL}/register`, body)).data;
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear automóvil')
    }
  },
  getAll: async (): Promise<Car[]> => {
    try {
      return (await apiAxios.get<Car[]>(`${SERVER_URL}/all`)).data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getByLicence: async (licence: string): Promise<Car> => {
    try {
      return (await apiAxios.get<Car>(`${SERVER_URL}/${licence}`)).data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  update: async (id: string): Promise<Car> => {
    try {
      return (await apiAxios.patch<Car>(`${SERVER_URL}/update/${id}`)).data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  delete: async (licence: string): Promise<any> => {
    try {
      return (await apiAxios.delete(`${SERVER_URL}/delete/${licence}`)).data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  updateJob: async (
    licence: string,
    jobId: string,
    body: any
  ): Promise<any> => {
    try {
      return (
        await apiAxios.patch(`${SERVER_URL}/jobs/${licence}/${jobId}`, body)
      ).data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
