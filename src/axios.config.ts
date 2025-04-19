import axios, { AxiosInstance } from 'axios'

// Instancia para peticiones a la API
export const apiAxios: AxiosInstance = axios.create()

export const API_BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001/api'