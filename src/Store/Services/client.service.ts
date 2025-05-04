import { API_BASE_URL, apiAxios } from "../../axios.config";
import { APIResponse } from "../../Types/apiTypes";

const SERVER_URL = `${API_BASE_URL}/clients`;

export const clientService = {
  getAll: async (): Promise<APIResponse> => {
    return (await apiAxios.get<APIResponse>(`${SERVER_URL}/all`)).data;
  },
  getOne: async (fullname:string): Promise<APIResponse> => {
    return (await apiAxios.get<APIResponse>(`${SERVER_URL}/${fullname}`)).data;
  },
  update: async (body: any): Promise<APIResponse> => {
    return (await apiAxios.patch<APIResponse>(`${SERVER_URL}/update`, body)).data;
  }
};
