import axios from "axios";
import { CrearHistorialRequest, HistorialMedico } from "@/interface/HistorialMedico";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const crearHistorialMedico = async (historialData: CrearHistorialRequest): Promise<HistorialMedico> => {
    const response = await axios.post(`${apiUrl}/historial-medico/crear`, historialData, { withCredentials: true });
    return response.data.historiaMedica;
};

export const obtenerHistorialPorPaciente = async (pacienteId: string): Promise<HistorialMedico | null> => {
    try {
        const response = await axios.get(`${apiUrl}/historial-medico/${pacienteId}`, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null; 
        }
        throw new Error(error.response?.data?.mensaje || "Error al obtener el historial médico");
    }
};