"use client";

import { useEffect, useState } from "react";
import { usePacienteStore } from "@/store/pacienteStore";
import CrearPaciente from "@/components/dashboard/CrearPaciente";
import PacienteCard from "@/components/dashboard/PacienteCard";
import { IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function DashboardPage() {
  const { pacientes, cargarPacientes } = usePacienteStore();
  const [modalOpen, setModalOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    cargarPacientes();
  }, [cargarPacientes]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Fichas de Pacientes</h2>
        
        <Tooltip title="Agregar Paciente">
          <IconButton 
            onClick={() => setModalOpen(true)} 
            sx={{ 
              bgcolor: "#FF6B6B", 
              "&:hover": { bgcolor: "#E65C5C" },
              width: 50, 
              height: 50 
            }}
          >
            <Add sx={{ color: "white", fontSize: 28 }} /> 
          </IconButton>
        </Tooltip>
      </div>

      <CrearPaciente open={modalOpen} onClose={() => setModalOpen(false)} />

      {pacientes.length === 0 ? (
        <p className="text-gray-600">No hay pacientes registrados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pacientes.map((paciente) => (
            <PacienteCard 
              key={paciente._id} 
              paciente={paciente} 
              setSnackbarMessage={setSnackbarMessage} 
              setSnackbarOpen={setSnackbarOpen} 
            />
          ))}
        </div>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}