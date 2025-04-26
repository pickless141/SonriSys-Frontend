"use client";
import { useState } from "react";
import { Paciente } from "@/interface/pacientes";
import { usePacienteStore } from "@/store/pacienteStore";
import {
  Avatar,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { MoreVert, Person } from "@mui/icons-material";
import EditarPaciente from "./EditarPaciente";
import HistorialMedicoModal from "./HistorialMedico";
import { getHistorialPDF } from "@/api/historialPDFApi";
import { useHistorialPDFStore } from "@/store/historialPDFStore";
import HistorialPDFDialog from "./HistorialPDFDialog";

export default function PacienteCard({ 
  paciente, 
  setSnackbarMessage, 
  setSnackbarOpen 
}: { 
  paciente: Paciente;
  setSnackbarMessage: (message: string) => void;
  setSnackbarOpen: (open: boolean) => void;
}) {
  const { eliminarPaciente } = usePacienteStore();
  const { cargarHistorialPDF } = useHistorialPDFStore();
  const { pdfUrl } = useHistorialPDFStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [openHistorial, setOpenHistorial] = useState(false);
  const [openPDFDialog, setOpenPDFDialog] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleVerPaciente = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleEditPaciente = () => {
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    setConfirmDialogOpen(true);
    handleMenuClose();
  };

  const handleDeletePaciente = async () => {
    try {
      await eliminarPaciente(paciente._id);
      setConfirmDialogOpen(false);
      setSnackbarMessage(`Paciente ${paciente.nombreCompleto} eliminado correctamente`);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error al eliminar el paciente");
      setSnackbarOpen(true);
    }
  };

  const handleOpenPDFDialog = async () => {
    try {
      await cargarHistorialPDF(paciente._id);
      setOpenPDFDialog(true);
      handleMenuClose();
    } catch (error) {
      console.error("Error al cargar PDF:", error);
      setSnackbarMessage("Error al cargar historial PDF");
      setSnackbarOpen(true);
      handleMenuClose();
    }
  };

  return (
    <>
      <Card className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full md:w-80">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Avatar sx={{ bgcolor: "#FF6B6B", width: 48, height: 48 }}>
              <Person sx={{ color: "white", fontSize: 30 }} />
            </Avatar>
            <div>
              <Typography variant="h6" className="font-semibold text-gray-600">
                {paciente.nombreCompleto}
              </Typography>
              <Typography
                variant="body2"
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setOpenHistorial(true)}
              >
                Historial Médico
              </Typography>
            </div>
          </div>
        </div>

        <IconButton onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleVerPaciente}>🔍 Ver Paciente</MenuItem>
          <MenuItem onClick={handleEditPaciente}>✏️ Editar Paciente</MenuItem>
          <MenuItem onClick={handleConfirmDelete}>🗑️ Eliminar Paciente</MenuItem>
          <MenuItem onClick={handleOpenPDFDialog}>📥 Descargar Historial</MenuItem>
        </Menu>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-coral-500 text-white font-bold text-center">
          Ficha del Paciente:  <span className="text-white">{paciente.nombreCompleto}</span>
        </DialogTitle>
        <DialogContent>
          <Box component="div" sx={{ padding: 2 }}>
            <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
              <Stack spacing={2} flex={1}>
                <Typography>
                  <strong>Fecha de Nacimiento:</strong> {paciente.fechaNacimiento ? new Date(paciente.fechaNacimiento).toLocaleDateString() : "No tiene"}
                </Typography>
                <Typography><strong>Edad:</strong> {paciente.edad ?? "No tiene"} años</Typography>
                <Typography><strong>Sexo:</strong> {paciente.sexo ?? "No tiene"}</Typography>
                <Typography>
                  <strong>Teléfono:</strong> {paciente.telefono?.trim() ? paciente.telefono : "No tiene"}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {paciente.email?.trim() ? paciente.email : "No tiene"}
                </Typography>
                <Typography>
                  <strong>Dirección:</strong> {paciente.direccion?.trim() ? paciente.direccion : "No tiene"}
                </Typography>
              </Stack>
              <Stack spacing={2} flex={1}>
                <Typography>
                  <strong>Fecha de Registro:</strong> {paciente.createdAt ? new Date(paciente.createdAt).toLocaleDateString() : "No tiene"}
                </Typography>
                <Typography><strong>Estado Civil:</strong> {paciente.estadoCivil ?? "No tiene"}</Typography>
                <Typography>
                  <strong>Ocupación:</strong> {paciente.ocupacion?.trim() ? paciente.ocupacion : "No tiene"}
                </Typography>
                <Typography>
                  <strong>Recomendado por:</strong> {paciente.recomendadoPor?.trim() ? paciente.recomendadoPor : "No tiene"}
                </Typography>
                <Typography>
                  <strong>Responsable/Tutor:</strong> {paciente.responsableTutor?.nombre?.trim() ? paciente.responsableTutor.nombre : "No tiene"}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: "#FF6B6B" }}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle className="text-center font-bold text-lg">Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que quieres eliminar a <strong>{paciente.nombreCompleto}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleDeletePaciente} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <EditarPaciente
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        paciente={paciente}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarOpen={setSnackbarOpen}
      />

      <HistorialMedicoModal open={openHistorial} onClose={() => setOpenHistorial(false)} pacienteId={paciente._id} />

      <HistorialPDFDialog
        open={openPDFDialog}
        onClose={() => setOpenPDFDialog(false)}
        pdfUrl={pdfUrl || ""}
      />
    </>
  );
}