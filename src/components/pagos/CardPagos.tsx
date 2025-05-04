'use client';

import { useState } from 'react';
import { PagoDetalle } from '@/interface/Pagos';
import {
  Avatar,
  Card,
  Typography,
} from '@mui/material';
import { MonetizationOn } from '@mui/icons-material';
import TablaPagos from './TablaPagos';

interface Props {
  pago: PagoDetalle;
}

const CardPagos = ({ pago }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm mx-auto">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Avatar sx={{ bgcolor: "#FF6B6B", width: 48, height: 48 }}>
              <MonetizationOn sx={{ color: "white", fontSize: 30 }} />
            </Avatar>
            <div>
              <Typography variant="h6" className="font-semibold text-gray-600">
                {pago.paciente.nombreCompleto}
              </Typography>
              <Typography
                variant="body2"
                className="text-coral-500 cursor-pointer hover:underline"
                onClick={() => setOpen(true)}
              >
                Ver pagos
              </Typography>
            </div>
          </div>
        </div>
      </Card>

      <TablaPagos open={open} onClose={() => setOpen(false)} pago={pago} />
    </>
  );
};

export default CardPagos;