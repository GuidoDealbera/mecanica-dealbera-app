import { API_BASE_URL, apiAxios } from "../../axios.config";
import { APIResponse, CreateCarBody } from "../../Types/apiTypes";
import { Car } from "../../Types/types";
import { handleApiError } from "../../utils";

const SERVER_URL = `${API_BASE_URL}/cars`;

export const carService = {
  create: async (body: CreateCarBody): Promise<APIResponse> => {
    return (await apiAxios.post<APIResponse>(`${SERVER_URL}/register`, body))
      .data;
  },
  getAll: async (): Promise<APIResponse> => {
    return (await apiAxios.get<APIResponse>(`${SERVER_URL}/all`)).data;
  },
  getByLicence: async (licence: string): Promise<APIResponse> => {
    return (await apiAxios.get<APIResponse>(`${SERVER_URL}/${licence}`)).data;
  },
  update: async (id: string): Promise<Car> => {
    try {
      return (await apiAxios.patch<Car>(`${SERVER_URL}/update/${id}`)).data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  delete: async (licence: string): Promise<APIResponse> => {
    return (await apiAxios.delete<APIResponse>(`${SERVER_URL}/delete/${licence}`)).data;
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
