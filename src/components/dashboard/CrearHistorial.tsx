"use client";

import { useState, ChangeEvent } from "react";
import { useHistorialStore } from "@/store/historialStore";
import { CrearHistorialRequest } from "@/interface/HistorialMedico";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Stack,
  Grid,
  Typography,
  Box,
  Divider
} from "@mui/material";

type IndexedObject = {
  [key: string]: boolean | string;
};

function YesNoQuestion({
  label,
  value,
  onChange
}: {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <FormControl component="fieldset" sx={{ marginBottom: 1 }}>
      <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
      <RadioGroup
        row
        value={value ? "yes" : "no"}
        onChange={(e) => onChange(e.target.value === "yes")}
      >
        <FormControlLabel value="yes" control={<Radio size="small" />} label="Sí" />
        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
      </RadioGroup>
    </FormControl>
  );
}

function formatearEnfermedad(str: string): string {
  const withSpaces = str.replace(/([A-Z])/g, (match) => ` ${match.toLowerCase()}`);
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
}

export default function CrearHistorial({
  open,
  onClose,
  pacienteId
}: {
  open: boolean;
  onClose: () => void;
  pacienteId: string;
}) {
  const { agregarHistorial } = useHistorialStore();

  const [formData, setFormData] = useState<CrearHistorialRequest>({
    paciente: pacienteId,
    tratamientoMedicoActual: { enTratamiento: false, tiempo: "" },
    usoMedicamento: { usaMedicamento: false, cuales: "" },
    enfermedades: {
      tuberculosis: false,
      lepra: false,
      enfermedadesSexuales: false,
      hepatitis: false,
      sida: false,
      enfermedadChagas: false,
      fiebreReumatica: false,
      asma: false,
      sinusitis: false,
      alergia: false,
      ulceras: false,
      enfermedadesCardiacas: false,
      epilepsia: false,
      hipertensionArterial: false,
      anemia: false,
      hemofilia: false,
      disturbiosPsiquicos: false,
      convulsiones: false,
      desmayos: false,
      problemasCoagulacion: false,
      diabetes: false,
      otras: ""
    },
    transfusionSanguinea: { necesitaTransfusion: false, motivo: "" },
    cirugiasPrevias: { fueSometido: false, detalle: "" },
    sangradoProlongado: false,
    fuma: { fuma: false, tiempo: "" },
    alcohol: { bebeAlcohol: false, tiempo: "" },
    embarazo: false,
    toleranciaAnestesia: false,
    testElisa: { seRealizo: false, tiempo: "" },
    motivoVisita: ""
  });

  const handleYesNoChange =
    (objName: keyof CrearHistorialRequest, fieldName: string) =>
    (val: boolean) => {
      setFormData((prev) => ({
        ...prev,
        [objName]: {
          ...(prev[objName] as IndexedObject),
          [fieldName]: val
        }
      }));
    };

  const handleNestedTextChange =
    (objName: keyof CrearHistorialRequest, fieldName: string) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [objName]: {
          ...(prev[objName] as IndexedObject),
          [fieldName]: e.target.value
        }
      }));
    };

  const handleSimpleYesNoChange =
    (fieldName: keyof CrearHistorialRequest) => (val: boolean) => {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: val
      }));
    };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    await agregarHistorial(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="bg-coral-500 text-white font-bold text-center">
        Crear Historial Médico
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ marginTop: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Motivo de la visita
            </Typography>
            <TextField
              label="Motivo de la visita"
              name="motivoVisita"
              fullWidth
              size="small"
              margin="dense"
              value={formData.motivoVisita}
              onChange={handleChange}
            />
          </Box>

          <Divider />

          {/* Sección: Tratamiento y Medicamentos */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Tratamiento y Medicamentos
            </Typography>
            <YesNoQuestion
              label="¿Está en tratamiento médico actualmente?"
              value={formData.tratamientoMedicoActual.enTratamiento}
              onChange={handleYesNoChange("tratamientoMedicoActual", "enTratamiento")}
            />
            {formData.tratamientoMedicoActual.enTratamiento && (
              <TextField
                label="¿Hace cuánto tiempo?"
                fullWidth
                size="small"
                margin="dense"
                value={formData.tratamientoMedicoActual.tiempo || ""}
                onChange={handleNestedTextChange("tratamientoMedicoActual", "tiempo")}
              />
            )}

            <YesNoQuestion
              label="¿Usa medicamentos actualmente?"
              value={formData.usoMedicamento.usaMedicamento}
              onChange={handleYesNoChange("usoMedicamento", "usaMedicamento")}
            />
            {formData.usoMedicamento.usaMedicamento && (
              <TextField
                label="¿Cuáles?"
                fullWidth
                size="small"
                margin="dense"
                value={formData.usoMedicamento.cuales || ""}
                onChange={handleNestedTextChange("usoMedicamento", "cuales")}
              />
            )}
          </Box>

          <Divider />

          {/* Sección: Enfermedades */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Enfermedades
            </Typography>
            <Grid container spacing={1}>
              {Object.entries(formData.enfermedades)
                .filter(([key]) => key !== "otras")
                .map(([key, value]) => (
                  <Grid item xs={6} sm={4} key={key}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={!!value}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              enfermedades: {
                                ...prev.enfermedades,
                                [key]: e.target.checked
                              }
                            }))
                          }
                        />
                      }
                      label={formatearEnfermedad(key)}
                    />
                  </Grid>
                ))}
            </Grid>
            <TextField
              label="Otras enfermedades"
              fullWidth
              size="small"
              margin="dense"
              value={formData.enfermedades.otras || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  enfermedades: {
                    ...prev.enfermedades,
                    otras: e.target.value
                  }
                }))
              }
            />
          </Box>

          <Divider />

          {/* Sección: Transfusión y Cirugías */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Transfusión Sanguínea y Cirugías
            </Typography>
            <YesNoQuestion
              label="¿Requiere transfusión sanguínea?"
              value={formData.transfusionSanguinea.necesitaTransfusion}
              onChange={handleYesNoChange("transfusionSanguinea", "necesitaTransfusion")}
            />
            {formData.transfusionSanguinea.necesitaTransfusion && (
              <TextField
                label="Motivo"
                fullWidth
                size="small"
                margin="dense"
                value={formData.transfusionSanguinea.motivo || ""}
                onChange={handleNestedTextChange("transfusionSanguinea", "motivo")}
              />
            )}

            <YesNoQuestion
              label="¿Fue sometido a cirugías anteriormente?"
              value={formData.cirugiasPrevias.fueSometido}
              onChange={handleYesNoChange("cirugiasPrevias", "fueSometido")}
            />
            {formData.cirugiasPrevias.fueSometido && (
              <TextField
                label="Detalle de cirugías"
                fullWidth
                size="small"
                margin="dense"
                value={formData.cirugiasPrevias.detalle || ""}
                onChange={handleNestedTextChange("cirugiasPrevias", "detalle")}
              />
            )}
          </Box>

          <Divider />

          {/* Sección: Otros campos */}
          <Box>
            <YesNoQuestion
              label="¿Presenta sangrado prolongado?"
              value={formData.sangradoProlongado}
              onChange={handleSimpleYesNoChange("sangradoProlongado")}
            />

            <YesNoQuestion
              label="¿Fuma?"
              value={formData.fuma.fuma}
              onChange={handleYesNoChange("fuma", "fuma")}
            />
            {formData.fuma.fuma && (
              <TextField
                label="¿Hace cuánto tiempo?"
                fullWidth
                size="small"
                margin="dense"
                value={formData.fuma.tiempo || ""}
                onChange={handleNestedTextChange("fuma", "tiempo")}
              />
            )}

            <YesNoQuestion
              label="¿Consume alcohol?"
              value={formData.alcohol.bebeAlcohol}
              onChange={handleYesNoChange("alcohol", "bebeAlcohol")}
            />
            {formData.alcohol.bebeAlcohol && (
              <TextField
                label="¿Hace cuánto tiempo?"
                fullWidth
                size="small"
                margin="dense"
                value={formData.alcohol.tiempo || ""}
                onChange={handleNestedTextChange("alcohol", "tiempo")}
              />
            )}

            <YesNoQuestion
              label="¿Se encuentra embarazada?"
              value={formData.embarazo}
              onChange={handleSimpleYesNoChange("embarazo")}
            />

            <YesNoQuestion
              label="¿Presenta alguna intolerancia a la anestesia?"
              value={formData.toleranciaAnestesia}
              onChange={handleSimpleYesNoChange("toleranciaAnestesia")}
            />

            <YesNoQuestion
              label="¿Se ha realizado el test Elisa?"
              value={formData.testElisa.seRealizo}
              onChange={handleYesNoChange("testElisa", "seRealizo")}
            />
            {formData.testElisa.seRealizo && (
              <TextField
                label="¿Hace cuánto tiempo?"
                fullWidth
                size="small"
                margin="dense"
                value={formData.testElisa.tiempo || ""}
                onChange={handleNestedTextChange("testElisa", "tiempo")}
              />
            )}
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#FF6B6B" }}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{ bgcolor: "#FF6B6B", color: "white" }}
          variant="contained"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}