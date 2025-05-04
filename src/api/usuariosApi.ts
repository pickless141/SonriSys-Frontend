import axios from "axios";
import {
  Usuario,
  CrearUsuarioRequest,
  EditarUsuarioRequest,
} from "@/interface/usuarios";
import { handleAxiosError } from "@/utils/handleAxiosError";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getUsuarios = async (): Promise<Usuario[]> => {
  try {
    const response = await axios.get(`${apiUrl}/users`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener usuarios:",
      axios.isAxiosError(error) ? error.message : error
    );
    return [];
  }
};

export const crearUsuario = async (data: CrearUsuarioRequest): Promise<void> => {
  try {
    await axios.post(`${apiUrl}/users/register`, data, { withCredentials: true });
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al crear el usuario");
  }
};

export const editarUsuario = async (
  id: string,
  data: EditarUsuarioRequest
): Promise<Usuario> => {
  try {
    const response = await axios.put(`${apiUrl}/users/${id}`, data, {
      withCredentials: true,
    });
    return response.data.usuario;
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al editar el usuario");
  }
};

export const actualizarEstadoUsuario = async (
  id: string,
  estado: boolean
): Promise<Usuario> => {
  try {
    const response = await axios.patch(
      `${apiUrl}/users/${id}/estado`,
      { estado },
      { withCredentials: true }
    );
    return response.data.usuario;
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al actualizar el estado del usuario");
  }
};

export const eliminarUsuario = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/users/${id}`, { withCredentials: true });
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al eliminar el usuario");
  }
};

export const resetearIntentosUsuario = async (id: string): Promise<void> => {
  try {
    await axios.patch(`${apiUrl}/users/${id}/reset`, {}, { withCredentials: true });
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al resetear intentos");
  }
};