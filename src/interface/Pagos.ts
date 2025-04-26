export interface DienteTratado {
    _id: string;
    numero: number;
    descripcion: string;
    costo: number;
    estadoCosto: 'PAGADO' | 'PENDIENTE' | 'CANCELADO';
    fechaPago?: string;
}

export interface Paciente {
    _id: string;
    nombreCompleto: string;
}

export interface PagoDetalle {
    _id: string;
    paciente: Paciente;
    dientesTratados: DienteTratado[];
}

export interface ActualizarEstadoCosto {
    estadoCosto: string;
}
