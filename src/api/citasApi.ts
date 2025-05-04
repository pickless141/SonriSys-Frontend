import axios from "axios";
import {
  ActualizarFechaCita,
  Cita,
  CitasResponse,
  patchEstadoCita,
} from "@/interface/citas";
import { handleAxiosError } from "@/utils/handleAxiosError"; 

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCitas = async (): Promise<CitasResponse[]> => {
  try {
    const response = await axios.get(`${apiUrl}/citas`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener citas:",
      axios.isAxiosError(error) ? error.message : error
    );
    return [];
  }
};

export const crearCitas = async (citaData: Cita): Promise<CitasResponse> => {
  try {
    const response = await axios.post(`${apiUrl}/citas/`, citaData, {
      withCredentials: true,
    });
    return response.data.cita;
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al crear la cita");
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
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al actualizar la cita");
  }
};

export const actualizarEstadoCita = async (
  id: string,
  updateData: patchEstadoCita
): Promise<CitasResponse> => {
  try {
    const response = await axios.patch(`${apiUrl}/citas/${id}/estado`, updateData, {
      withCredentials: true,
    });
    return response.data.cita;
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al actualizar la cita");
  }
};

export const eliminarCitas = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/citas/${id}`, { withCredentials: true });
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al eliminar la cita");
  }
};