"use client";

import { useEffect, useState } from "react";
import { useUsuarioStore } from "@/store/usuarioStore";
import UsuarioCard from "@/components/usuarios/UsuarioCard";
import CrearUsuario from "@/components/usuarios/CrearUsuario";

import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add } from "@mui/icons-material";

export default function UsuariosPage() {
  const { usuarios, cargarUsuarios } = useUsuarioStore();
  const [openCrear, setOpenCrear] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, [cargarUsuarios]);

  const handleOpenCrear = () => setOpenCrear(true);
  const handleCloseCrear = () => setOpenCrear(false);

  const handleShowSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <Box p={3}>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5" className="text-gray-800 font-semibold">
          Administración de Usuarios
        </Typography>

        <Tooltip title="Crear Usuario">
          <IconButton
            onClick={handleOpenCrear}
            sx={{
              bgcolor: "#FF6B6B",
              "&:hover": { bgcolor: "#E65C5C" },
              width: 50,
              height: 50,
            }}
          >
            <Add sx={{ color: "white", fontSize: 28 }} />
          </IconButton>
        </Tooltip>
      </div>

      {usuarios.length === 0 ? (
        <p className="text-gray-600">No hay usuarios registrados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {usuarios.map((usuario) => (
            <UsuarioCard
              key={usuario._id}
              usuario={usuario}
            />
          ))}
        </div>
      )}

      <CrearUsuario
        open={openCrear}
        onClose={handleCloseCrear}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}