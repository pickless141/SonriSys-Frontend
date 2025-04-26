import { create } from "zustand";
import { getHistorialPDF } from "@/api/historialPDFApi";

interface HistorialPDFState {
  pdfUrl: string | null;
  cargarHistorialPDF: (pacienteId: string) => Promise<void>;
  limpiarPDF: () => void;
}

export const useHistorialPDFStore = create<HistorialPDFState>((set) => ({
  pdfUrl: null,
  cargarHistorialPDF: async (pacienteId: string) => {
    const blob = await getHistorialPDF(pacienteId);
    const url = URL.createObjectURL(blob);
    set({ pdfUrl: url });
  },
  limpiarPDF: () => {
    set({ pdfUrl: null });
  },
}));