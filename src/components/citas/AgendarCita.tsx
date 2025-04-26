"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { usePacienteStore } from "@/store/pacienteStore";
import { useCitaStore } from "@/store/citaStore";

interface AgendarCitaProps {
  open: boolean;
  onClose: () => void;
}

const AgendarCita: React.FC<AgendarCitaProps> = ({ open, onClose }) => {
  const { pacientesSelect, cargarPacientesSelect } = usePacienteStore();
  const { agregarCita, cargarCitas } = useCitaStore();

  const [selectedPaciente, setSelectedPaciente] = useState<string>("");
  const [fechaProgramada, setFechaProgramada] = useState<string>("");

  useEffect(() => {
    if (open) {
      cargarPacientesSelect();
      setSelectedPaciente("");
      setFechaProgramada("");
    }
  }, [open, cargarPacientesSelect]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await agregarCita({
        paciente: selectedPaciente,
        fechaProgramada: new Date(fechaProgramada + "Z"),
      });
      await cargarCitas();
      onClose();
    } catch (error) {
      console.error("Error al agendar la cita:", error);
    }
  };

  const pacienteSeleccionado = pacientesSelect.find((p) => p.id === selectedPaciente);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="bg-coral-500 text-white font-bold">
        Agendar Cita
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Stack spacing={2}>
            <FormControl fullWidth required>
              <InputLabel id="paciente-label">Paciente</InputLabel>
              <Select
                labelId="paciente-label"
                label="Paciente"
                value={selectedPaciente}
                onChange={(e) => setSelectedPaciente(e.target.value)}
              >
                {pacientesSelect.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.nombreCompleto}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Fecha y Hora"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={fechaProgramada}
              onChange={(e) => setFechaProgramada(e.target.value)}
              required
            />

            {selectedPaciente && pacienteSeleccionado && (
              <Box>
                <Typography variant="body2">
                  Agendando cita para:{" "}
                  <strong>{pacienteSeleccionado.nombreCompleto}</strong>
                </Typography>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ color: "#FF6B6B" }}>
            Cancelar
          </Button>
          <Button
            type="submit"
            sx={{
              bgcolor: "#FF6B6B",
              color: "white",
              "&:hover": { bgcolor: "#CC4F4F" },
            }}
          >
            Agendar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AgendarCita;
