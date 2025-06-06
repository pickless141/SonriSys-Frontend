import axios from "axios";
import { PagoDetalle, ActualizarEstadoCosto } from "@/interface/Pagos";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const obtenerPagosDetalles = async (): Promise<PagoDetalle[]> => {
  try {
    const response = await axios.get(`${apiUrl}/pagos/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los detalles de pago:",
      axios.isAxiosError(error) ? error.message : error
    );
    return [];
  }
};

export const actualizarEstadoCostoDiente = async (
  tratamientoId: string,
  dienteId: string,
  data: ActualizarEstadoCosto
): Promise<PagoDetalle | null> => {
  try {
    const response = await axios.patch(
      `${apiUrl}/pagos/${tratamientoId}/diente/${dienteId}`,
      data,
      { withCredentials: true }
    );
    return response.data?.tratamiento || null;
  } catch (error) {
    console.error(
      "Error al actualizar el estado del costo del diente:",
      axios.isAxiosError(error) ? error.message : error
    );
    return null;
  }
};