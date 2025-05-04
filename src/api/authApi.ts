import axios from "axios";
import { User } from "@/interface/auth";
import { handleAxiosError } from "@/utils/handleAxiosError"; 

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.post(
      `${apiUrl}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al iniciar sesión");
  }
};

export const getAuthenticatedUser = async (): Promise<User | null> => {
  try {
    const response = await axios.get(`${apiUrl}/auth/me`, {
      withCredentials: true,
    });

    const user: User = {
      id: response.data._id,
      nombre: response.data.nombre,
      email: response.data.email,
      rol: response.data.rol,
    };

    return user;
  } catch (error) {
    console.error(
      "Error al obtener usuario:",
      axios.isAxiosError(error) ? error.message : error
    );
    return null;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true });
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al cerrar sesión");
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al enviar código de recuperación");
  }
};

export const resetPassword = async (
  email: string,
  resetCode: string,
  newPassword: string
) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/reset-password`, {
      email,
      resetCode,
      newPassword,
    });
    return response.data;
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al restablecer contraseña");
  }
};