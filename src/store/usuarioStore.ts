import { create } from "zustand";
import {
  Usuario,
  CrearUsuarioRequest,
  EditarUsuarioRequest,
} from "@/interface/usuarios";
import {
  getUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  actualizarEstadoUsuario,
  resetearIntentosUsuario,
} from "@/api/usuariosApi";

interface UsuarioState {
  usuarios: Usuario[];
  cargarUsuarios: () => Promise<void>;
  agregarUsuario: (data: CrearUsuarioRequest) => Promise<void>;
  actualizarUsuario: (id: string, data: EditarUsuarioRequest) => Promise<void>;
  bloquearUsuario: (id: string, estado: boolean) => Promise<void>;
  borrarUsuario: (id: string) => Promise<void>;
  resetearIntentos: (id: string) => Promise<void>;
}

export const useUsuarioStore = create<UsuarioState>((set) => ({
  usuarios: [],

  cargarUsuarios: async () => {
    const usuarios = await getUsuarios();
    set({ usuarios });
  },

  agregarUsuario: async (data) => {
    await crearUsuario(data);
    const usuarios = await getUsuarios();
    set({ usuarios });
  },

  actualizarUsuario: async (id, data) => {
    const actualizado = await editarUsuario(id, data);
    set((state) => ({
      usuarios: state.usuarios.map((u) => (u._id === id ? actualizado : u)),
    }));
  },

  bloquearUsuario: async (id, estado) => {
    const actualizado = await actualizarEstadoUsuario(id, estado);
    set((state) => ({
      usuarios: state.usuarios.map((u) => (u._id === id ? actualizado : u)),
    }));
  },

  borrarUsuario: async (id) => {
    await eliminarUsuario(id);
    set((state) => ({
      usuarios: state.usuarios.filter((u) => u._id !== id),
    }));
  },

  resetearIntentos: async (id) => {
    await resetearIntentosUsuario(id);
    const usuarios = await getUsuarios();
    set({ usuarios });
  },
}));