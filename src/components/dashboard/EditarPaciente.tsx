"use client";

import { useState, useEffect } from "react";
import { usePacienteStore } from "@/store/pacienteStore";
import { EditarPacienteRequest, Paciente } from "@/interface/pacientes";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Box, Stack } from "@mui/material";

export default function EditarPaciente({ 
    open, onClose, 
    paciente, 
    setSnackbarMessage, 
    setSnackbarOpen 
}: { 
    open: boolean; 
    onClose: () => void; 
    paciente: Paciente; 
    setSnackbarMessage: (message: string) => void; 
    setSnackbarOpen: (open: boolean) => void; 
}) {
  
    const { editarPaciente } = usePacienteStore();
    
    const [formData, setFormData] = useState<EditarPacienteRequest>({
        nombreCompleto: paciente.nombreCompleto,
        fechaNacimiento: paciente.fechaNacimiento,
        edad: paciente.edad,
        sexo: paciente.sexo,
        direccion: paciente.direccion,
        telefono: paciente.telefono,
        email: paciente.email,
        ocupacion: paciente.ocupacion,
        estadoCivil: paciente.estadoCivil,
        recomendadoPor: paciente.recomendadoPor || "",
        responsableTutor: paciente.responsableTutor || { nombre: "" },
    });

    useEffect(() => {
        setFormData({
            nombreCompleto: paciente.nombreCompleto,
            fechaNacimiento: paciente.fechaNacimiento,
            edad: paciente.edad,
            sexo: paciente.sexo,
            direccion: paciente.direccion,
            telefono: paciente.telefono,
            email: paciente.email,
            ocupacion: paciente.ocupacion,
            estadoCivil: paciente.estadoCivil,
            recomendadoPor: paciente.recomendadoPor || "",
            responsableTutor: paciente.responsableTutor || { nombre: "" },
        });
    }, [paciente]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTutorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            responsableTutor: { ...formData.responsableTutor, [e.target.name]: e.target.value }
        });
    };

    const handleSubmit = async () => {
        await editarPaciente(paciente._id, formData);
        setSnackbarMessage(`Paciente ${paciente.nombreCompleto} actualizado correctamente`);
        setSnackbarOpen(true);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle className="bg-coral-500 text-white font-bold text-center">Editar Paciente</DialogTitle>
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
                                value={formData.nombreCompleto}
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
                                value={formData.fechaNacimiento}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Edad"
                                name="edad"
                                type="number"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={formData.edad}
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
                            <TextField
                                label="Recomendado por"
                                name="recomendadoPor"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={formData.recomendadoPor}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Nombre del Tutor/Responsable"
                                name="nombre"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={formData.responsableTutor?.nombre || ""}
                                onChange={handleTutorChange}
                            />
                        </Stack>

                        <Stack spacing={2} flex={1}>
                            <TextField
                                label="Dirección"
                                name="direccion"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={formData.direccion}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Teléfono"
                                name="telefono"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Ocupación"
                                name="ocupacion"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={formData.ocupacion}
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
                </Box>
            </DialogContent>

            <DialogActions className="flex justify-between px-4 pb-4">
                <Button onClick={onClose} sx={{ color: "#FF6B6B" }}>Cancelar</Button>
                <Button 
                    onClick={handleSubmit} 
                    sx={{ bgcolor: "#FF6B6B", color: "white", "&:hover": { bgcolor: "#CC4F4F" } }} 
                    variant="contained"
                >
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}