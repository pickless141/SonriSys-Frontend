import { create } from "zustand";
import { CrearPacienteRequest, EditarPacienteRequest, Paciente, PacientesSelect } from "@/interface/pacientes";
import { crearPaciente, editarPaciente, eliminarPaciente, getPacientes, pacientesSelect } from "@/api/pacientesApi";

interface PacienteState {
  pacientes: Paciente[];
  pacientesSelect: PacientesSelect[];
  cargarPacientes: () => Promise<void>;
  cargarPacientesSelect: () => Promise<void>;
  agregarPaciente: (paciente: CrearPacienteRequest) => Promise<void>;
  eliminarPaciente: (id: string) => Promise<void>;
  editarPaciente: (id: string, paciente: EditarPacienteRequest) => Promise<void>;
}

export const usePacienteStore = create<PacienteState>((set) => ({
  pacientes: [],
  pacientesSelect: [],
  cargarPacientes: async () => {
    const pacientes = await getPacientes();
    set({ pacientes });
  },
  cargarPacientesSelect: async () => {
    const pacientesSelectList = await pacientesSelect();
    set({ pacientesSelect: pacientesSelectList });
  },
  agregarPaciente: async (pacienteData) => {
    const nuevoPaciente = await crearPaciente(pacienteData);
    set((state) => ({ pacientes: [...state.pacientes, nuevoPaciente] }));
  },
  editarPaciente: async (id, pacienteData) => {
    const pacienteActualizado = await editarPaciente(id, pacienteData);
    set((state) => ({
      pacientes: state.pacientes.map(p => p._id === id ? pacienteActualizado : p),
    }));
  },
  eliminarPaciente: async (id) => {
    await eliminarPaciente(id);
    set((state) => ({ pacientes: state.pacientes.filter(p => p._id !== id) }));
  },
}));