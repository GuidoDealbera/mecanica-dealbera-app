import { API_BASE_URL, apiAxios } from "../../axios.config";
import {
  APIResponse,
  CreateCarBody,
  CreateCarJob,
  UpdateJobBody,
} from "../../Types/apiTypes";

const SERVER_URL = `${API_BASE_URL}/cars`;

export const carService = {
  create: async (carBody: CreateCarBody): Promise<any> => {
    return await window.api.createCar(carBody)
  },
  getAll: async (): Promise<APIResponse> => {
    return (await apiAxios.get<APIResponse>(`${SERVER_URL}/all`)).data;
  },
  getByLicence: async (licence: string): Promise<APIResponse> => {
    return (await apiAxios.get<APIResponse>(`${SERVER_URL}/${licence}`)).data;
  },
  createJob: async (
    carId: string,
    data: CreateCarJob
  ): Promise<APIResponse> => {
    return (
      await apiAxios.patch<APIResponse>(`${SERVER_URL}/update/${carId}`, {jobs: [data]})
    ).data;
  },
  delete: async (licence: string): Promise<APIResponse> => {
    return (
      await apiAxios.delete<APIResponse>(`${SERVER_URL}/delete/${licence}`)
    ).data;
  },
  updateJob: async (
    licence: string,
    jobId: string,
    body: UpdateJobBody
  ): Promise<APIResponse> => {
      return (
        await apiAxios.patch<APIResponse>(`${SERVER_URL}/jobs/${licence}/${jobId}`, body)
      ).data;
  },
};
