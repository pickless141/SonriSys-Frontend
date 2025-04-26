"use client";

import { useState } from "react";
import { usePacienteStore } from "@/store/pacienteStore";
import { CrearPacienteRequest } from "@/interface/pacientes";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, MenuItem, Box, Stack, FormControlLabel, Checkbox 
} from "@mui/material";

export default function CrearPaciente({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { agregarPaciente } = usePacienteStore();
  const [esMenor, setEsMenor] = useState(false); 

  const [formData, setFormData] = useState<CrearPacienteRequest>({
    nombreCompleto: "",
    fechaNacimiento: "",
    edad: 0,
    sexo: "Masculino",
    direccion: "",
    telefono: "",
    email: "", 
    ocupacion: "",
    estadoCivil: "Soltero",
    recomendadoPor: "",
    responsableTutor: undefined, 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEsMenor(e.target.checked);
    if (!e.target.checked) {
      setFormData({ ...formData, responsableTutor: undefined }); 
    } else {
      setFormData({ ...formData, responsableTutor: { nombre: "" } }); 
    }
  };

  const handleSubmit = async () => {
    await agregarPaciente(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="bg-coral-500 text-white font-bold text-center">Crear Nuevo Paciente</DialogTitle>
      <br />
      <DialogContent sx={{ paddingTop: 2 }}> 
        <Box component="form" noValidate autoComplete="off">
          <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
            <Stack spacing={2} flex={1}>
              <TextField
                label="Nombre Completo"
                name="nombreCompleto"
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Ej: Juan Pérez"
                onChange={handleChange}
              />
              <TextField
                label="Recomendado por:"
                name="recomendadoPor"
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Ej: Dr. Pierre Fauchard"
                onChange={handleChange}
              />
              <TextField
                label="Fecha de Nacimiento"
                name="fechaNacimiento"
                type="date"
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
              <TextField
                label="Edad"
                name="edad"
                type="number"
                fullWidth
                variant="outlined"
                size="small"
                onChange={handleChange}
              />
              <TextField
                select
                label="Sexo"
                name="sexo"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.sexo}
                onChange={handleChange}
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Femenino">Femenino</MenuItem>
              </TextField>
            </Stack>

            <Stack spacing={2} flex={1}>
              <TextField
                label="Dirección"
                name="direccion"
                fullWidth
                variant="outlined"
                size="small"
                onChange={handleChange}
              />
              <TextField
                label="Teléfono"
                name="telefono"
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Ej: +595981234567"
                onChange={handleChange}
              />
              <TextField
                label="Email (opcional)"
                name="email"
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Ej: correo@ejemplo.com"
                onChange={handleChange}
              />
              <TextField
                label="Ocupación"
                name="ocupacion"
                fullWidth
                variant="outlined"
                size="small"
                onChange={handleChange}
              />
              <TextField
                select
                label="Estado Civil"
                name="estadoCivil"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.estadoCivil}
                onChange={handleChange}
              >
                <MenuItem value="Soltero">Soltero/a</MenuItem>
                <MenuItem value="Casado">Casado/a</MenuItem>
                <MenuItem value="Divorciado">Divorciado/a</MenuItem>
                <MenuItem value="Viudo">Viudo/a</MenuItem>
                <MenuItem value="Unión libre">Unión libre</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </TextField>
            </Stack>
          </Stack>

          <FormControlLabel
            control={<Checkbox checked={esMenor} onChange={handleCheckboxChange} />}
            label="Paciente menor?"
            sx={{ marginTop: 2 }}
          />

          {esMenor && (
            <Stack spacing={2} marginTop={2}>
              <TextField
                label="Nombre del Tutor/Responsable"
                name="nombre"
                fullWidth
                variant="outlined"
                size="small"
                onChange={(e) => setFormData({ 
                  ...formData, 
                  responsableTutor: { nombre: e.target.value } 
                })}
              />
            </Stack>
          )}
        </Box>
      </DialogContent>

      <DialogActions className="flex justify-between px-4 pb-4">
        <Button onClick={onClose} sx={{ color: "#FF6B6B" }}>Cancelar</Button>
        <Button 
          onClick={handleSubmit} 
          sx={{ bgcolor: "#FF6B6B", color: "white", "&:hover": { bgcolor: "#CC4F4F" } }} 
          variant="contained"
        >
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}