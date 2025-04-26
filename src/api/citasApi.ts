import axios from "axios";
import { ActualizarFechaCita, Cita, CitasResponse, patchEstadoCita } from "@/interface/citas";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCitas = async (): Promise<CitasResponse[]> => {
  try {
    const response = await axios.get(`${apiUrl}/citas`, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener citas:", error);
    return [];
  }
};

export const crearCitas = async (citaData: Cita): Promise<CitasResponse> => {
  try {
    const response = await axios.post(`${apiUrl}/citas/`, citaData, { withCredentials: true });
    return response.data.cita;
  } catch (error: any) {
    throw new Error(error.response?.data?.mensaje || "Error al crear la cita");
  }
};

export const actualizarCitas = async (
  id: string,
  updateData: ActualizarFechaCita
): Promise<CitasResponse> => {
  try {
    const response = await axios.patch(`${apiUrl}/citas/${id}`, updateData, { 
      withCredentials: true,
    });
    return response.data.cita; 
  } catch (error: any) {
    throw new Error(error.response?.data?.mensaje || "Error al actualizar la cita");
  }
};

export const actualizarEstadoCita = async (
  id: string,
  updateData: patchEstadoCita
): Promise<CitasResponse> => {
  try {
    const response = await axios.patch(`${apiUrl}/citas/${id}/estado`, updateData, {
      withCredentials: true,
    })
    return response.data.cita;
  } catch (error: any) {
    throw new Error(error.response?.data?.mensaje || "Error al actualizar la cita");
  }
}

export const eliminarCitas = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/citas/${id}`, { withCredentials: true });
  } catch (error: any) {
    throw new Error(error.response?.data?.mensaje || "Error al eliminar la cita");
  }
};