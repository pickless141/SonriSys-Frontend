import axios from "axios";
import { CrearPacienteRequest, EditarPacienteRequest, Paciente } from "@/interface/pacientes";
import { PacientesSelect } from "@/interface/pacientes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getPacientes = async (): Promise<Paciente[]> => {
  try {
    const response = await axios.get(`${apiUrl}/pacientes`, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener pacientes:", error);
    return [];
  }
};

export const crearPaciente = async (pacienteData: CrearPacienteRequest): Promise<Paciente> => {
    try {
      const response = await axios.post(`${apiUrl}/pacientes/crear-paciente`, pacienteData, { withCredentials: true });
      return response.data.paciente;
    } catch (error: any) {
      throw new Error(error.response?.data?.mensaje || "Error al crear el paciente");
    }
};

export const editarPaciente = async (id: string, pacienteData: EditarPacienteRequest): Promise<Paciente> => {
    try {
        const response = await axios.put(`${apiUrl}/pacientes/${id}`, pacienteData, { withCredentials: true });
        return response.data.paciente;
    } catch (error: any) {
        throw new Error(error.response?.data?.mensaje || "Error al actualizar el paciente");
    }
};

export const eliminarPaciente = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${apiUrl}/pacientes/${id}`, {withCredentials: true});
    } catch (error: any) {
        throw new Error(error.response?.data?.mensaje || "Error al eliminar el paciente")
    }
}

export const pacientesSelect = async (): Promise<PacientesSelect[]> => {
  try {
      const response = await axios.get(`${apiUrl}/pacientes/pacientes-select`, {withCredentials: true})
      return response.data
  } catch (error: any) {
      console.error("Error al obtener pacientes en el select:", error)
      return [];
  }
}
