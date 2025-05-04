import axios from "axios";
import {
  NuevoTratamiento,
  ActualizarEstadoTratamiento,
  Tratamiento,
  ActualizarTratamientoData,
} from "@/interface/tratamientos";
import { handleAxiosError } from "@/utils/handleAxiosError";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const crearTratamiento = async (
  tratamientoData: NuevoTratamiento
): Promise<Tratamiento | null> => {
  try {
    const response = await axios.post(`${apiUrl}/tratamientos/`, tratamientoData, {
      withCredentials: true,
    });
    return response.data.tratamiento;
  } catch (error) {
    console.error(
      "Error al crear tratamiento:",
      axios.isAxiosError(error) ? error.message : error
    );
    return null;
  }
};

export const obtenerTratamientos = async (): Promise<Tratamiento[]> => {
  try {
    const response = await axios.get(`${apiUrl}/tratamientos/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener tratamientos:",
      axios.isAxiosError(error) ? error.message : error
    );
    return [];
  }
};

export const actualizarEstadoTratamiento = async (
  id: string,
  estadoData: ActualizarEstadoTratamiento
): Promise<Tratamiento | null> => {
  try {
    const response = await axios.patch(
      `${apiUrl}/tratamientos/${id}/estado`,
      estadoData,
      { withCredentials: true }
    );
    return response.data.tratamiento;
  } catch (error) {
    console.error(
      "Error al actualizar estado del tratamiento:",
      axios.isAxiosError(error) ? error.message : error
    );
    return null;
  }
};

export const actualizarTratamiento = async (
  id: string,
  data: ActualizarTratamientoData
): Promise<Tratamiento | null> => {
  try {
    const response = await axios.put(`${apiUrl}/tratamientos/${id}`, data, {
      withCredentials: true,
    });
    return response.data.tratamiento;
  } catch (error) {
    console.error(
      "Error al actualizar el tratamiento:",
      axios.isAxiosError(error) ? error.message : error
    );
    return null;
  }
};

export const eliminarTratamiento = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/tratamientos/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al eliminar el tratamiento");
  }
};