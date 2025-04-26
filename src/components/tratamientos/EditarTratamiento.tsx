"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { Tratamiento } from "@/interface/tratamientos";
import { useTratamientoStore } from "@/store/tratamientoStore";
import { usePacienteStore } from "@/store/pacienteStore";
import { DIENTES } from "@/constants/dientes";

interface EditarTratamientoProps {
  open: boolean;
  onClose: () => void;
  tratamiento: Tratamiento;
}

export default function EditarTratamiento({
  open,
  onClose,
  tratamiento,
}: EditarTratamientoProps) {
  const { editarTratamiento } = useTratamientoStore();
  const { pacientesSelect, cargarPacientesSelect } = usePacienteStore();

  const pacienteIdInicial =
    typeof tratamiento.paciente !== "string"
      ? tratamiento.paciente._id
      : tratamiento.paciente;

  const [pacienteId, setPacienteId] = useState<string>(pacienteIdInicial);
  const [fechaInicio, setFechaInicio] = useState<string>(
    tratamiento.fechaInicio.slice(0, 10)
  );
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [dientesSeleccionados, setDientesSeleccionados] = useState<{
    [key: number]: { descripcion: string; costo: number };
  }>({});

  useEffect(() => {
    if (open) {
      cargarPacientesSelect();

      const nuevoState: { [key: number]: { descripcion: string; costo: number } } = {};
      tratamiento.dientesTratados.forEach((d) => {
        nuevoState[d.numero] = {
          descripcion: d.descripcion,
          costo: d.costo,
        };
      });
      setDientesSeleccionados(nuevoState);
    }
  }, [open, tratamiento.dientesTratados, cargarPacientesSelect]);

  const handleToggleTooth = (tooth: number) => {
    setDientesSeleccionados((prev) => {
      const newState = { ...prev };
      if (newState[tooth]) {
        delete newState[tooth];
      } else {
        newState[tooth] = { descripcion: "", costo: 0 };
      }
      return newState;
    });
  };

  const handleToothFieldChange = (
    tooth: number,
    field: "descripcion" | "costo",
    value: string | number
  ) => {
    setDientesSeleccionados((prev) => ({
      ...prev,
      [tooth]: {
        ...prev[tooth],
        [field]: field === "costo" ? Number(value) || 0 : value,
      },
    }));
  };

  const toothOptions = selectedGroup
    ? DIENTES[selectedGroup.toLowerCase() as keyof typeof DIENTES] || []
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dientesTratados = Object.entries(dientesSeleccionados).map(
      ([numeroStr, data]) => ({
        numero: Number(numeroStr),
        descripcion: data.descripcion,
        costo: data.costo,
      })
    );

    await editarTratamiento(tratamiento._id, {
      paciente: pacienteId,
      fechaInicio,
      dientesTratados,
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="text-center bg-coral-500 text-white">
        Editar Tratamiento
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel id="paciente-label">Paciente</InputLabel>
              <Select
                labelId="paciente-label"
                label="Paciente"
                value={pacienteId}
                onChange={(e) => setPacienteId(e.target.value)}
              >
                {pacientesSelect.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.nombreCompleto}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Fecha de Inicio"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel id="grupo-diente-label">Grupo de Dientes</InputLabel>
              <Select
                labelId="grupo-diente-label"
                label="Grupo de Dientes"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <MenuItem value="molares">Molares</MenuItem>
                <MenuItem value="premolares">Premolares</MenuItem>
                <MenuItem value="caninos">Caninos</MenuItem>
                <MenuItem value="incisivos">Incisivos</MenuItem>
              </Select>
            </FormControl>

            {selectedGroup && (
              <Box>
                <Typography variant="subtitle2">
                  Selecciona los dientes:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {toothOptions.map((numero: number) => {
                    const checked = !!dientesSeleccionados[numero];
                    return (
                      <FormControlLabel
                        key={numero}
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={() => handleToggleTooth(numero)}
                          />
                        }
                        label={`Diente ${numero}`}
                      />
                    );
                  })}
                </Stack>
              </Box>
            )}

            {Object.keys(dientesSeleccionados).length > 0 && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 3 }} gutterBottom>
                  Detalles de cada diente seleccionado:
                </Typography>
                <Stack spacing={2}> 
                  {Object.keys(dientesSeleccionados).map((numeroStr) => {
                    const numero = Number(numeroStr);
                    return (
                      <Stack
                        key={numero}
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        alignItems="center"
                      >
                        <Typography>Diente {numero}:</Typography>

                        <TextField
                          label="Descripción"
                          multiline
                          rows={2}
                          fullWidth
                          value={dientesSeleccionados[numero].descripcion}
                          onChange={(e) =>
                            handleToothFieldChange(
                              numero,
                              "descripcion",
                              e.target.value
                            )
                          }
                        />

                        <TextField
                          label="Costo"
                          type="number"
                          fullWidth
                          value={dientesSeleccionados[numero].costo}
                          onChange={(e) =>
                            handleToothFieldChange(
                              numero,
                              "costo",
                              e.target.value
                            )
                          }
                        />
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}  sx={{ color: "#FF6B6B" }}>Cancelar</Button>
          <Button sx={{ bgcolor: "#FF6B6B", color: "white", "&:hover": { bgcolor: "#CC4F4F" } }}type="submit">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}