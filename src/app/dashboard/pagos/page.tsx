'use client';

import { useEffect } from 'react';
import { usePagosStore } from '@/store/pagoStore';
import { Box, Typography } from '@mui/material';
import CardPagos from '@/components/pagos/CardPagos';

export default function PagosPage() {
  const { pagos, cargarPagos } = usePagosStore();

  useEffect(() => {
    cargarPagos();
  }, [cargarPagos]);

  return (
    <Box p={3}>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5" className="text-gray-800 font-semibold">
          Detalles de Pagos 
        </Typography>
      </div>

      {pagos.length === 0 ? (
        <p className="text-gray-600">No hay pagos registrados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pagos.map((pago) => (
            <CardPagos key={pago._id} pago={pago} />
          ))}
        </div>
      )}
    </Box>
  );
}