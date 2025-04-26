export const getTratamientoEstadoColor = (estado: string): string => {
    const estadoUpper = estado.trim().toUpperCase();
    switch (estadoUpper) {
      case "PENDIENTE":
        return "text-yellow-500";
      case "EN CURSO":
        return "text-blue-500";
      case "FINALIZADO":
        return "text-green-500";
      default:
        return "text-gray-600";
    }
};
  
export const getDienteEstadoCostoColor = (estado: string): string => {
    switch (estado) {
      case "PENDIENTE":
        return "text-blue-500";   
      case "PAGADO":
        return "text-green-500";  
      case "CANCELADO":
        return "text-red-500";    
      default:
        return "text-gray-600";
    }
};