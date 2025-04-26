"use client";

import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { CitasResponse } from "@/interface/citas";
import { DateTime } from "luxon";

interface CitasCardProps {
  cita: CitasResponse;
  onEliminar: (cita: { _id: string }) => void;
  onActualizar?: (
    id: string,
    updateData: { fechaProgramada?: Date }
  ) => void;
  onActualizarEstado?: (
    id: string,
    updateData: {
      estadoCita?: "PENDIENTE" | "RE-AGENDADO" | "COMPLETADO" | "CANCELADO";
    }
  ) => void;
}

const CitasCard: React.FC<CitasCardProps> = ({
  cita,
  onEliminar,
  onActualizar,
  onActualizarEstado,
}) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFecha, setEditFecha] = useState<string>("");

  const fechaProgramadaDisplay = DateTime.fromISO(cita.fechaProgramada, { zone: "utc" })
    .toFormat("yyyy-MM-dd HH:mm");

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEliminar = () => {
    handleMenuClose();
    setConfirmDeleteOpen(true);
  };

  const confirmEliminar = () => {
    setConfirmDeleteOpen(false);
    onEliminar({ _id: cita._id });
  };

  const handleEditar = () => {
    handleMenuClose();
    const formattedFecha = DateTime.fromISO(cita.fechaProgramada, { zone: "utc" })
      .toFormat("yyyy-MM-dd'T'HH:mm");
    setEditFecha(formattedFecha);
    setEditDialogOpen(true);
  };

  const handleGuardarEdicion = () => {
    if (onActualizar) {
      const utcDate = DateTime.fromFormat(editFecha, "yyyy-MM-dd'T'HH:mm", { zone: "utc" }).toJSDate();
      onActualizar(cita._id, { fechaProgramada: utcDate });
    }
    setEditDialogOpen(false);
  };

  const handleEstadoChange = (
    event: SelectChangeEvent<"PENDIENTE" | "RE-AGENDADO" | "COMPLETADO" | "CANCELADO">,
    child: React.ReactNode
  ) => {
    if (onActualizarEstado) {
      onActualizarEstado(cita._id, {
        estadoCita: event.target.value as "PENDIENTE" | "RE-AGENDADO" | "COMPLETADO" | "CANCELADO",
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 relative flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-coral-600">
          {typeof cita.paciente === "string"
            ? cita.paciente
            : cita.paciente.nombreCompleto}
        </h3>
        <IconButton onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>
      </div>

      <Typography className="mt-2">
        Fecha Programada:{" "}
        <span className="text-gray-500">{fechaProgramadaDisplay}</span>
      </Typography>

      <FormControl
        variant="outlined"
        size="small"
        sx={{ minWidth: 100, mt: 2 }}
      >
        <InputLabel id="estado-cita-label" sx={{ fontSize: "0.8rem" }}>
          Estado
        </InputLabel>
        <Select
          labelId="estado-cita-label"
          label="Estado"
          value={cita.estadoCita}
          onChange={handleEstadoChange}
          sx={{ fontSize: "0.8rem", height: 32 }}
        >
          <MenuItem value="PENDIENTE" sx={{ fontSize: "0.8rem" }}>
            PENDIENTE
          </MenuItem>
          <MenuItem value="RE-AGENDADO" sx={{ fontSize: "0.8rem" }}>
            RE-AGENDADO
          </MenuItem>
          <MenuItem value="COMPLETADO" sx={{ fontSize: "0.8rem" }}>
            COMPLETADO
          </MenuItem>
          <MenuItem value="CANCELADO" sx={{ fontSize: "0.8rem" }}>
            CANCELADO
          </MenuItem>
        </Select>
      </FormControl>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditar}>✏️ Editar Fecha</MenuItem>
        <MenuItem onClick={handleEliminar}>🗑️ Eliminar</MenuItem>
      </Menu>

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="font-bold text-center">
          ¿Eliminar Cita?
        </DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar la cita de{" "}
            <strong>
              {typeof cita.paciente === "string"
                ? cita.paciente
                : cita.paciente.nombreCompleto}
            </strong>
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={confirmEliminar}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="bg-coral-500 text-white text-center">
          Editar Cita
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Fecha y Hora"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={editFecha}
              onChange={(e) => setEditFecha(e.target.value)}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditDialogOpen(false)}
            sx={{ color: "#FF6B6B" }}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleGuardarEdicion}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CitasCard;