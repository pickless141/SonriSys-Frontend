"use client";

import { useState, useEffect } from "react";
import { useHistorialStore } from "@/store/historialStore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
  Tooltip,
  IconButton
} from "@mui/material";
import CrearHistorial from "@/components/dashboard/CrearHistorial";
import { HistorialMedico } from "@/interface/HistorialMedico";

function capitalizarEnfermedad(str: string) {
  const withSpaces = str.replace(/([A-Z])/g, (match) => ` ${match.toLowerCase()}`);
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

export default function HistorialMedicoModal({
  open,
  onClose,
  pacienteId
}: {
  open: boolean;
  onClose: () => void;
  pacienteId: string;
}) {
  const { historial, cargarHistorial } = useHistorialStore();
  const [mostrarCrear, setMostrarCrear] = useState(false);


  useEffect(() => {
    if (open) {
      cargarHistorial(pacienteId);
    }
  }, [open, pacienteId, cargarHistorial]);

  const filtrarEnfermedades = (enfermedades: HistorialMedico["enfermedades"]) => {
    return Object.entries(enfermedades)
      .filter(([key, val]) => key !== "otras" && val === true)
      .map(([key]) => key);
  };

  const enfermedadesTrue = historial ? filtrarEnfermedades(historial.enfermedades) : [];


  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        className="bg-coral-500 text-white font-bold text-center"
      >
        Historial Médico
      </DialogTitle>
      <br />
      <DialogContent sx={{ paddingY: 2, background: "none" }}>
        {historial ? (
          <Stack spacing={3}>
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                backgroundColor: "#fff",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#FF6B6B", fontWeight: "bold" }}
              >
                Motivo de la visita:
              </Typography>
              <Typography>{historial.motivoVisita}</Typography>
            </Box>

            <Divider />

            {historial.tratamientoMedicoActual.enTratamiento && (
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#FF6B6B", fontWeight: "bold" }}
                >
                  Tratamiento médico actual:
                </Typography>
                <Typography>
                  <strong>Tiempo:</strong>{" "}
                  {historial.tratamientoMedicoActual.tiempo ||
                    "No especificado"}
                </Typography>
              </Box>
            )}

            {historial.usoMedicamento.usaMedicamento && (
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#FF6B6B", fontWeight: "bold" }}
                >
                  Uso de medicamentos:
                </Typography>
                <Typography>
                  <strong>Medicamentos:</strong>{" "}
                  {historial.usoMedicamento.cuales || "No especificado"}
                </Typography>
              </Box>
            )}

            {(enfermedadesTrue.length > 0 || historial.enfermedades.otras) && (
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#FF6B6B", fontWeight: "bold" }}
                >
                  Enfermedades:
                </Typography>
                {enfermedadesTrue.length > 0 && (
                  <List dense>
                    {enfermedadesTrue.map((enf) => (
                      <ListItem key={enf}>
                        <ListItemText primary={capitalizarEnfermedad(enf)} />
                      </ListItem>
                    ))}
                  </List>
                )}
                {historial.enfermedades.otras && (
                  <Typography>
                    <strong>Otras:</strong> {historial.enfermedades.otras}
                  </Typography>
                )}
              </Box>
            )}

            {historial.transfusionSanguinea.necesitaTransfusion && (
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#FF6B6B", fontWeight: "bold" }}
                >
                  Transfusión sanguínea:
                </Typography>
                <Typography>
                  <strong>Motivo:</strong>{" "}
                  {historial.transfusionSanguinea.motivo || "No especificado"}
                </Typography>
              </Box>
            )}

            {historial.cirugiasPrevias.fueSometido && (
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#FF6B6B", fontWeight: "bold" }}
                >
                  Cirugías previas:
                </Typography>
                <Typography>
                  <strong>Detalle:</strong>{" "}
                  {historial.cirugiasPrevias.detalle || "No especificado"}
                </Typography>
              </Box>
            )}

            {historial.sangradoProlongado && (
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography>
                  Presenta: <strong>sangrado prolongado</strong>.
                </Typography>
              </Box>
            )}

            {(historial.fuma.fuma || historial.alcohol.bebeAlcohol) && (
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#FF6B6B", fontWeight: "bold" }}
                >
                  Hábitos:
                </Typography>
                {historial.fuma.fuma && (
                  <Typography>
                    <strong>Fuma desde hace:</strong>{" "}
                    {historial.fuma.tiempo || "No especificado"}
                  </Typography>
                )}
                {historial.alcohol.bebeAlcohol && (
                  <Typography>
                    <strong>Consume alcohol desde hace:</strong>{" "}
                    {historial.alcohol.tiempo || "No especificado"}
                  </Typography>
                )}
              </Box>
            )}

            {historial.embarazo && (
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography>
                  La paciente se encuentra: <strong>embarazada</strong>.
                </Typography>
              </Box>
            )}

            {historial.toleranciaAnestesia && (
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography>
                  El paciente: <strong>presenta intolerancia</strong> a la
                  anestesia.
                </Typography>
              </Box>
            )}

            {historial.testElisa.seRealizo && (
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#FF6B6B", fontWeight: "bold" }}
                >
                  Test Elisa:
                </Typography>
                <Typography>
                  <strong>Realizado hace:</strong>{" "}
                  {historial.testElisa.tiempo || "No especificado"}
                </Typography>
              </Box>
            )}
          </Stack>
        ) : (
          <Stack spacing={2} alignItems="center">
            <br />
            <Typography className="text-gray-600">
              Este paciente no posee historial clínico. ¿Deseas crear uno?
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => setMostrarCrear(true)}
                variant="contained"
                sx={{ bgcolor: "#FF6B6B", color: "white" }}
              >
                Crear Historial
              </Button>
            </Stack>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        {!mostrarCrear && (
          <Button onClick={onClose} sx={{ color: "#FF6B6B" }}>
            Cerrar
          </Button>
        )}
      </DialogActions>

      {mostrarCrear && (
        <CrearHistorial
          open={mostrarCrear}
          onClose={() => setMostrarCrear(false)}
          pacienteId={pacienteId}
        />
      )}
    </Dialog>
  );
}