import { create } from "zustand";
import { HistorialMedico } from "@/interface/HistorialMedico";
import { crearHistorialMedico, obtenerHistorialPorPaciente } from "@/api/historialMedicoApi";

interface HistorialState {
    historial: HistorialMedico | null;
    cargarHistorial: (pacienteId: string) => Promise<void>;
    agregarHistorial: (historial: HistorialMedico) => Promise<void>;
}

export const useHistorialStore = create<HistorialState>((set) => ({
    historial: null,
    
    cargarHistorial: async (pacienteId) => {
        const historia = await obtenerHistorialPorPaciente(pacienteId);
        set({ historial: historia });
    },

    agregarHistorial: async (historial) => {
        const nuevoHistorial = await crearHistorialMedico(historial);
        set({ historial: nuevoHistorial });
    }
}));