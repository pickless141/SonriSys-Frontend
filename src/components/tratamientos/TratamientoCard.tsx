"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { Tratamiento } from "@/interface/tratamientos";
import EditarTratamiento from "@/components/tratamientos/EditarTratamiento"; 
import { getDienteEstadoCostoColor, getTratamientoEstadoColor } from "@/utils/getStatusColors";

interface TratamientoCardProps {
  tratamiento: Tratamiento;
  onEliminar?: (tratamiento: Tratamiento) => void; 
}

export default function TratamientoCard({
  tratamiento,
  onEliminar
}: TratamientoCardProps) {
  const [openDetalles, setOpenDetalles] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [editarOpen, setEditarOpen] = useState(false); 

  const dientesAgrupados = tratamiento.dientesTratados.reduce((acc, diente) => {
    const tipo = diente.tipo ?? "Desconocido"; 
    if (!acc[tipo]) acc[tipo] = [];
    acc[tipo].push(diente);
    return acc;
  }, {} as Record<string, typeof tratamiento.dientesTratados>);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => setMenuAnchor(null);

  const handleAbrirDetalles = () => {
    handleMenuClose();
    setOpenDetalles(true);
  };

  const handleEditar = () => {
    handleMenuClose();
    setEditarOpen(true);
  };

  const handleEliminar = () => {
    handleMenuClose();
    setConfirmDeleteOpen(true);
  };

  const confirmEliminar = () => {
    setConfirmDeleteOpen(false);
    onEliminar?.(tratamiento);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 relative flex flex-col">
      <div className="mb-2 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-coral-600">
            {typeof tratamiento.paciente === "string"
              ? tratamiento.paciente
              : tratamiento.paciente.nombreCompleto}
          </h3>
          <p className="text-gray-900">
            Fecha de inicio:{" "}
            <span className="text-gray-500">
              {new Date(tratamiento.fechaInicio).toLocaleDateString()}
            </span>
          </p>
          <p className="text-gray-900">
            Estado:{" "}
            <span className={getTratamientoEstadoColor(tratamiento.estado)}>
              {tratamiento.estado}
            </span>
          </p>
        </div>

        <IconButton onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleAbrirDetalles}>ℹ️ Más información</MenuItem>
          <MenuItem onClick={handleEditar}>✏️ Editar tratamiento</MenuItem>
          <MenuItem onClick={handleEliminar}>🗑️ Eliminar</MenuItem>
        </Menu>
      </div>

      <Dialog
        open={openDetalles}
        onClose={() => setOpenDetalles(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="bg-coral-500 text-white text-center">
          Detalles del Tratamiento
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <p className="font-semibold text-coral-500">Paciente:</p>
                <p>
                  {typeof tratamiento.paciente !== "string" &&
                    tratamiento.paciente.nombreCompleto}
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <p className="font-semibold text-coral-500">Fecha de Inicio:</p>
                <p>{new Date(tratamiento.fechaInicio).toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-coral-500">
                Estado del tratamiento:
              </p>
              <p className={getTratamientoEstadoColor(tratamiento.estado)}>
                {tratamiento.estado}
              </p>
            </div>

            <div className="border border-gray-200 rounded-md p-3 shadow-sm">
              <p className="font-semibold mb-2 text-coral-500">
                Dientes Tratados:
              </p>
              {Object.entries(dientesAgrupados).map(([tipo, dientes]) => (
                <div key={tipo} className="mb-2">
                  <p className="font-semibold text-coral-500 capitalize">
                    {tipo}:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {dientes.map((diente) => (
                      <li key={diente._id}>
                        <strong className="text-gray-600">
                          Diente -{" "}
                          <span className="text-coral-500">
                            {diente.numero}
                          </span>
                          :
                        </strong>{" "}
                        {diente.descripcion} -{" "}
                        {diente.costo.toLocaleString("es-PY")} Gs -{" "}
                        <Tooltip title="Estado de pago" arrow>
                          <span
                            className={getDienteEstadoCostoColor(
                              diente.estadoCosto
                            )}
                          >
                            {diente.estadoCosto}
                          </span>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-2">
              <p className="font-semibold text-coral-500">Costo total:</p>
              <p className="text-lg">
                {tratamiento.costoTotal.toLocaleString("es-PY")} Gs
              </p>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDetalles(false)}
            sx={{ color: "#FF6B6B" }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <EditarTratamiento
        open={editarOpen}
        onClose={() => setEditarOpen(false)}
        tratamiento={tratamiento}
      />

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="font-bold text-center">
          ¿Eliminar Tratamiento?
        </DialogTitle>
        <DialogContent>
          <p>
            ¿Estás seguro de que deseas eliminar el tratamiento de{" "}
            <strong>
              {typeof tratamiento.paciente === "string"
                ? tratamiento.paciente
                : tratamiento.paciente.nombreCompleto}
            </strong>
            ?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={confirmEliminar}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}