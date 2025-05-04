import axios from "axios";

export const handleAxiosError = (error: unknown, mensajeFallback: string): never => {
  if (axios.isAxiosError(error) && error.response?.data?.mensaje) {
    throw new Error(error.response.data.mensaje);
  }
  throw new Error(mensajeFallback);
};