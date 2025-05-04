"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";
import { useUsuarioStore } from "@/store/usuarioStore";
import { CrearUsuarioRequest } from "@/interface/usuarios";

interface Props {
  open: boolean;
  onClose: () => void;
  setSnackbarMessage: (message: string) => void;
}

const roles = ["admin", "usuario"];

const CrearUsuarioDialog = ({ open, onClose, setSnackbarMessage }: Props) => {
  const { agregarUsuario } = useUsuarioStore();

  const [form, setForm] = useState<CrearUsuarioRequest>({
    nombre: "",
    email: "",
    password: "",
    rol: "usuario",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCrear = async () => {
    await agregarUsuario(form);
    setSnackbarMessage("✅ Usuario creado correctamente");
    onClose();
    setForm({ nombre: "", email: "", password: "", rol: "usuario" }); 
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="bg-coral-500 text-white text-center font-bold">
        Crear Nuevo Usuario
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            select
            label="Rol"
            name="rol"
            value={form.rol}
            onChange={handleChange}
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
        <Button onClick={handleCrear} variant="contained" sx={{ backgroundColor: "#FF6B6B" }}>
          Crear Usuario
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrearUsuarioDialog;