import { create } from "zustand";
import { PagoDetalle, ActualizarEstadoCosto } from "@/interface/Pagos";
import { obtenerPagosDetalles, actualizarEstadoCostoDiente } from "@/api/pagosApi";

interface PagosState {
  pagos: PagoDetalle[];
  cargarPagos: () => Promise<void>;
  actualizarEstadoDiente: (tratamientoId: string, dienteId: string, data: ActualizarEstadoCosto) => Promise<void>;
}

export const usePagosStore = create<PagosState>((set) => ({
  pagos: [],

  cargarPagos: async () => {
    const pagos = await obtenerPagosDetalles();
    set({ pagos });
  },

  actualizarEstadoDiente: async (tratamientoId, dienteId, data) => {
    const tratamientoActualizado = await actualizarEstadoCostoDiente(tratamientoId, dienteId, data);
    if (tratamientoActualizado) {
      set((state) => ({
        pagos: state.pagos.map(p =>
          p._id === tratamientoId ? tratamientoActualizado : p
        )
      }));
    }
  }
}));