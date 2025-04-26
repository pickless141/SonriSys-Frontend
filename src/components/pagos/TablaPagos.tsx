'use client';

import { usePagosStore } from '@/store/pagoStore';
import { PagoDetalle } from '@/interface/Pagos';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  onClose: () => void;
  pago: PagoDetalle;
}

const TablaPagos = ({ open, onClose, pago }: Props) => {
  const { actualizarEstadoDiente } = usePagosStore();

  const handleChangeEstado = (dienteId: string, nuevoEstado: string) => {
    actualizarEstadoDiente(pago._id, dienteId, { estadoCosto: nuevoEstado });
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <Box position="relative">
        <DialogTitle>
          Pagos de{" "}
          <span className="text-coral-500">{pago.paciente.nombreCompleto}</span>
        </DialogTitle>
        <Tooltip title="Cerrar">
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#FF6B6B",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <DialogContent
        sx={{
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#FF6B6B" }}>Diente</TableCell>
              <TableCell sx={{ color: "#FF6B6B" }}>Descripción</TableCell>
              <TableCell sx={{ color: "#FF6B6B" }}>Costo</TableCell>
              <TableCell sx={{ color: "#FF6B6B" }}>Estado</TableCell>
              <TableCell sx={{ color: "#FF6B6B" }}>Fecha de Pago</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pago.dientesTratados.map((d) => (
              <TableRow key={d._id}>
                <TableCell>{d.numero}</TableCell>
                <TableCell>{d.descripcion}</TableCell>
                <TableCell>{d.costo.toLocaleString()} Gs</TableCell>
                <TableCell>
                  <Select
                    size="small"
                    value={d.estadoCosto}
                    onChange={(e) => handleChangeEstado(d._id, e.target.value)}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="PENDIENTE">Pendiente</MenuItem>
                    <MenuItem value="PAGADO">Pagado</MenuItem>
                    <MenuItem value="CANCELADO">Cancelado</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  {d.fechaPago
                    ? new Date(d.fechaPago).toLocaleDateString()
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default TablaPagos;