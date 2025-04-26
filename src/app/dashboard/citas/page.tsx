"use client";

import { useEffect, useState } from "react";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useCitaStore } from "@/store/citaStore";
import CitaCard from "@/components/citas/CitasCard";
import AgendarCita from "@/components/citas/AgendarCita";

export default function CitasPage() {
  const { citas, cargarCitas, eliminarCita, actualizarCita, actualizarEstadoCita } = useCitaStore();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    cargarCitas();
  }, [cargarCitas]);

  const handleEliminarCita = (citaAEliminar: { _id: string }) => {
    eliminarCita(citaAEliminar._id);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Citas</h2>
        <Tooltip title="Agregar Cita">
          <IconButton
            onClick={() => setModalOpen(true)}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {citas.map((cita) => (
          <CitaCard
            key={cita._id}
            cita={cita}
            onEliminar={handleEliminarCita}
            onActualizar={actualizarCita}
            onActualizarEstado={actualizarEstadoCita}
          />
        ))}
      </div>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Crear Cita</DialogTitle>
        <DialogContent>
          <AgendarCita open={modalOpen} onClose={() => setModalOpen(false)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}