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
  FormControlLabel,
  Checkbox,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { NuevoTratamiento } from "@/interface/tratamientos";
import { useTratamientoStore } from "@/store/tratamientoStore";
import { DIENTES } from "@/constants/dientes";
import { usePacienteStore } from "@/store/pacienteStore";

interface CrearTratamientoDialogProps {
  open: boolean;
  onClose: () => void;
}

const CrearTratamientoDialog: React.FC<CrearTratamientoDialogProps> = ({ open, onClose }) => {
  const agregarTratamiento = useTratamientoStore((state) => state.agregarTratamiento);
  const { pacientesSelect, cargarPacientesSelect } = usePacienteStore();
  const { tratamientos, cargarTratamientos } = useTratamientoStore();

  const [selectedPaciente, setSelectedPaciente] = useState<string>("");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedTeeth, setSelectedTeeth] = useState<{
    [key: number]: { descripcion: string; costo: number };
  }>({});

  useEffect(() => {
    if (open) {
      cargarPacientesSelect();
    
      setSelectedPaciente("");
      setFechaInicio("");
      setSelectedGroup("");
      setSelectedTeeth({});
    }
  }, [open, cargarPacientesSelect]);

  const handleToggleTooth = (tooth: number) => {
    setSelectedTeeth((prev) => {
      const newSelected = { ...prev };
      if (newSelected[tooth]) {
        delete newSelected[tooth];
      } else {
        newSelected[tooth] = { descripcion: "", costo: 0 };
      }
      return newSelected;
    });
  };

  const handleToothChange = (
    tooth: number,
    field: "descripcion" | "costo",
    value: string | number
  ) => {
    setSelectedTeeth((prev) => ({
      ...prev,
      [tooth]: {
        ...prev[tooth],
        [field]: field === "costo" ? Number(value) || 0 : value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dientesTratados = Object.entries(selectedTeeth).map(([key, { descripcion, costo }]) => ({
      numero: Number(key),
      descripcion,
      costo,
    }));

    const nuevoTratamiento: NuevoTratamiento = {
      paciente: selectedPaciente, 
      fechaInicio: fechaInicio || undefined,
      dientesTratados,
    };

    await agregarTratamiento(nuevoTratamiento);
    await cargarTratamientos();
    onClose();
  };


  const toothOptions = selectedGroup ? DIENTES[selectedGroup.toLowerCase() as keyof typeof DIENTES] || [] : [];

  const pacienteSeleccionado = pacientesSelect.find((p) => p.id === selectedPaciente);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className="bg-coral-500 text-white font-bold">
        Crear Tratamiento
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl fullWidth required>
                <InputLabel id="paciente-label">Paciente</InputLabel>
                <Select
                  labelId="paciente-label"
                  label="Paciente"
                  value={selectedPaciente ?? ""}
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
                label="Fecha de Inicio"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={fechaInicio ?? ""}
                onChange={(e) => setFechaInicio(e.target.value)}
                required
              />
            </Stack>

            {selectedPaciente && pacienteSeleccionado && (
              <Box>
                <Typography variant="body2">
                  Tratamiento para:{" "}
                  <strong>{pacienteSeleccionado.nombreCompleto}</strong>
                </Typography>
              </Box>
            )}

            <Box sx={{ minWidth: 200, maxWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel id="grupo-diente-label">
                  Grupo de Dientes
                </InputLabel>
                <Select
                  labelId="grupo-diente-label"
                  label="Grupo de Dientes"
                  value={selectedGroup ?? ""}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                >
                  <MenuItem value="molares">Molares</MenuItem>
                  <MenuItem value="premolares">Premolares</MenuItem>
                  <MenuItem value="caninos">Caninos</MenuItem>
                  <MenuItem value="incisivos">Incisivos</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {selectedGroup && (
              <Box>
                <Typography variant="subtitle1">
                  Selecciona los dientes:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {toothOptions.map((tooth: number) => {
                    const checked = !!selectedTeeth[tooth];
                    return (
                      <FormControlLabel
                        key={tooth}
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={() => handleToggleTooth(tooth)}
                          />
                        }
                        label={`Diente ${tooth}`}
                      />
                    );
                  })}
                </Stack>
              </Box>
            )}

            {Object.keys(selectedTeeth).length > 0 && (
              <Box>
                <Typography variant="subtitle1">
                  Detalles por diente:
                </Typography>
                <Stack spacing={2}>
                  {Object.keys(selectedTeeth).map((toothStr) => {
                    const tooth = Number(toothStr);
                    return (
                      <Stack
                        key={tooth}
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        alignItems="center"
                      >
                        <Typography>Diente {tooth}</Typography>

                        <TextField
                          label="Descripción"
                          multiline
                          rows={2}
                          fullWidth
                          value={selectedTeeth[tooth].descripcion}
                          onChange={(e) =>
                            handleToothChange(
                              tooth,
                              "descripcion",
                              e.target.value
                            )
                          }
                        />

                        <TextField
                          label="Costo"
                          type="number"
                          value={selectedTeeth[tooth].costo}
                          onChange={(e) =>
                            handleToothChange(tooth, "costo", e.target.value)
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
            Crear
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default CrearTratamientoDialog;