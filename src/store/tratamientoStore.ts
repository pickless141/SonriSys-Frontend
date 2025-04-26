import { create } from "zustand";
import { NuevoTratamiento, ActualizarEstadoTratamiento, Tratamiento, ActualizarTratamientoData } from '@/interface/tratamientos';
import { crearTratamiento, obtenerTratamientos, actualizarEstadoTratamiento, actualizarTratamiento, eliminarTratamiento } from '@/api/tratamientosApi';

interface TratamientoState {
  tratamientos: Tratamiento[];
  cargarTratamientos: () => Promise<void>;
  agregarTratamiento: (tratamiento: NuevoTratamiento) => Promise<void>;
  actualizarEstado: (id: string, estadoData: ActualizarEstadoTratamiento) => Promise<void>;
  editarTratamiento: (id: string, data: ActualizarTratamientoData) => Promise<void>;
  eliminarTratamiento: (id: string) => Promise<void>;
}

export const useTratamientoStore = create<TratamientoState>((set) => ({
  tratamientos: [],

  cargarTratamientos: async () => {
    const tratamientos = await obtenerTratamientos();
    set({ tratamientos });
  },

  agregarTratamiento: async (tratamientoData) => {
    const nuevoTratamiento = await crearTratamiento(tratamientoData);
    if (nuevoTratamiento) {
      set((state) => ({ tratamientos: [...state.tratamientos, nuevoTratamiento] }));
    }
  },

  actualizarEstado: async (id, estadoData) => {
    const tratamientoActualizado = await actualizarEstadoTratamiento(id, estadoData);
    if (tratamientoActualizado) {
      set((state) => ({
        tratamientos: state.tratamientos.map(t => t._id === id ? tratamientoActualizado : t),
      }));
    }
  },
  editarTratamiento: async (id, data) => {
    const tratamientoActualizado = await actualizarTratamiento(id, data);
    if (tratamientoActualizado) {
      set((state) => ({
        tratamientos: state.tratamientos.map(t =>
          t._id === id ? tratamientoActualizado : t
        ),
      }));
    }
  },
  eliminarTratamiento: async (id) => {
    await eliminarTratamiento(id);
    set((state) => ({
      tratamientos: state.tratamientos.filter((t) => t._id !== id),
    }));
  },
}));