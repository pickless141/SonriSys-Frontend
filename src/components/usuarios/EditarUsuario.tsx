"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { Usuario } from "@/interface/usuarios";
import { useUsuarioStore } from "@/store/usuarioStore";

interface Props {
  open: boolean;
  onClose: () => void;
  usuario: Usuario | null;
}

const roles = ["admin", "usuario"];

const EditarUsuario = ({ open, onClose, usuario }: Props) => {
  const { actualizarUsuario } = useUsuarioStore();
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState<"admin" | "usuario">("usuario");

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setRol(usuario.rol);
    }
  }, [usuario]);

  const handleGuardar = async () => {
    if (usuario) {
      await actualizarUsuario(usuario._id, { nombre, rol });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="bg-coral-500 text-white font-bold text-center">
        Editar Usuario
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="Rol"
            value={rol}
            onChange={(e) => setRol(e.target.value as "admin" | "usuario")}
            fullWidth
          >
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleGuardar} variant="contained" sx={{ backgroundColor: "#FF6B6B" }}>
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarUsuario;