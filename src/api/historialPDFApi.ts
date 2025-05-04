import axios from "axios";
import { handleAxiosError } from "@/utils/handleAxiosError"; 

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getHistorialPDF = async (pacienteId: string): Promise<Blob> => {
  try {
    const response = await axios.get(`${apiUrl}/historial-medico/pdf/${pacienteId}`, {
      withCredentials: true,
      responseType: "blob", 
    });
    return response.data;
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al obtener el PDF del historial");
  }
};