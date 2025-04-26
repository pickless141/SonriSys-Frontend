"use client";

import { useEffect, useState } from "react";
import { IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useTratamientoStore } from "@/store/tratamientoStore";
import TratamientoCard from "@/components/tratamientos/TratamientoCard";
import CrearTratamientos from "@/components/tratamientos/CrearTratamientos";

export default function TratamientosPage() {
  const { tratamientos, cargarTratamientos, eliminarTratamiento } = useTratamientoStore();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    cargarTratamientos();
  }, [cargarTratamientos]);

  const handleEliminarTratamiento = (tratamientoAEliminar: { _id: string }) => {
    eliminarTratamiento(tratamientoAEliminar._id);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Tratamientos</h2>
        <Tooltip title="Agregar Tratamiento">
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
        {tratamientos.map((tratamiento) => (
          <TratamientoCard 
            key={tratamiento._id} 
            tratamiento={tratamiento}
            onEliminar={handleEliminarTratamiento}
          />
        ))}
      </div>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Crear Tratamiento</DialogTitle>
        <DialogContent>
          <CrearTratamientos open={modalOpen} onClose={() => setModalOpen(false)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}