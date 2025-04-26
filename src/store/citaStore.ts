import { create } from "zustand";
import { ActualizarFechaCita, Cita, CitasResponse, patchEstadoCita } from "@/interface/citas";
import { getCitas, crearCitas, eliminarCitas, actualizarCitas, actualizarEstadoCita } from "@/api/citasApi";

interface CitaState {
  citas: CitasResponse[];
  cargarCitas: () => Promise<void>;
  agregarCita: (cita: Cita) => Promise<void>;
  actualizarCita: (id: string, updateData: ActualizarFechaCita) => Promise<void>;
  actualizarEstadoCita: (id: string, updateData: patchEstadoCita) => Promise<void>;
  eliminarCita: (id: string) => Promise<void>;
}

export const useCitaStore = create<CitaState>((set) => ({
  citas: [],
  cargarCitas: async () => {
    const citas = await getCitas();
    set({ citas });
  },
  agregarCita: async (citaData) => {
    const nuevaCita = await crearCitas(citaData);
    set((state) => ({ citas: [...state.citas, nuevaCita] }));
  },
  actualizarCita: async (id: string, updateData: ActualizarFechaCita) => {
    const citaActualizada = await actualizarCitas(id, updateData);
    if(citaActualizada) {
      set((state) => ({
        citas: state.citas.map(cita => cita._id === id ? citaActualizada : cita),
      }));
    }
  },
  actualizarEstadoCita: async (id, updateData: patchEstadoCita) => {
    const citaActualizada = await actualizarEstadoCita(id, updateData);
    if(citaActualizada) {
      set((state) => ({
        citas: state.citas.map(cita => cita._id === id ? citaActualizada : cita),
      }));
    }
  },
  eliminarCita: async (id: string) => {
    await eliminarCitas(id);
    set((state) => ({
      citas: state.citas.filter(cita => cita._id !== id),
    }));
  },
}));