import axios from "axios";
import {
  CrearPacienteRequest,
  EditarPacienteRequest,
  Paciente,
  PacientesSelect,
} from "@/interface/pacientes";
import { handleAxiosError } from "@/utils/handleAxiosError"; 

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getPacientes = async (): Promise<Paciente[]> => {
  try {
    const response = await axios.get(`${apiUrl}/pacientes`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener pacientes:",
      axios.isAxiosError(error) ? error.message : error
    );
    return [];
  }
};

export const crearPaciente = async (
  pacienteData: CrearPacienteRequest
): Promise<Paciente> => {
  try {
    const response = await axios.post(
      `${apiUrl}/pacientes/crear-paciente`,
      pacienteData,
      { withCredentials: true }
    );
    return response.data.paciente;
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al crear el paciente");
  }
};

export const editarPaciente = async (
  id: string,
  pacienteData: EditarPacienteRequest
): Promise<Paciente> => {
  try {
    const response = await axios.put(
      `${apiUrl}/pacientes/${id}`,
      pacienteData,
      { withCredentials: true }
    );
    return response.data.paciente;
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al actualizar el paciente");
  }
};

export const eliminarPaciente = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/pacientes/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    return handleAxiosError(error as unknown, "Error al eliminar el paciente");
  }
};

export const pacientesSelect = async (): Promise<PacientesSelect[]> => {
  try {
    const response = await axios.get(`${apiUrl}/pacientes/pacientes-select`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener pacientes en el select:",
      axios.isAxiosError(error) ? error.message : error
    );
    return [];
  }
};