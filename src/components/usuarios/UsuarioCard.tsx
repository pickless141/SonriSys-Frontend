"use client";

import { useState } from "react";
import { Usuario } from "@/interface/usuarios";
import {
  Avatar,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import { MoreVert, Person } from "@mui/icons-material";
import { useUsuarioStore } from "@/store/usuarioStore";

interface Props {
  usuario: Usuario;
}

const UsuarioCard = ({ usuario }: Props) => {
  const { bloquearUsuario, borrarUsuario, resetearIntentos } = useUsuarioStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleToggleEstado = async () => {
    await bloquearUsuario(usuario._id, !usuario.estado);
    handleCloseMenu();
  };

  const handleResetear = async () => {
    await resetearIntentos(usuario._id);
    handleCloseMenu();
  };

  const handleEliminar = async () => {
    await borrarUsuario(usuario._id);
    handleCloseMenu();
  };

  return (
    <Card className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full max-w-sm mx-auto">
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar sx={{ bgcolor: "#FF6B6B", width: 48, height: 48 }}>
          <Person sx={{ color: "white" }} />
        </Avatar>
        <Box>
          <Typography className="font-semibold text-gray-800">{usuario.nombre}</Typography>
          <Typography className="text-gray-600 text-sm">{usuario.email}</Typography>
          <Typography className="text-sm text-coral-500 capitalize">{usuario.rol}</Typography>
          <Typography className="text-xs mt-1 text-gray-500">
            Estado: {usuario.estado ? "Activo" : "Inactivo"}
          </Typography>
          {usuario.intentosFallidos > 0 && (
            <Typography className="text-xs text-red-500">
              Intentos fallidos: {usuario.intentosFallidos}
            </Typography>
          )}
        </Box>
      </Box>

      <Tooltip title="Opciones">
        <IconButton onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleToggleEstado}>
          {usuario.estado ? "🔴 Desactivar" : "🟢 Activar"}
        </MenuItem>
        <MenuItem onClick={handleResetear}>🔁 Resetear Intentos</MenuItem>
        <MenuItem onClick={handleEliminar}>🗑️ Eliminar Usuario</MenuItem>
      </Menu>
    </Card>
  );
};

export default UsuarioCard;