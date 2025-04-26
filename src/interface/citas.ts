export interface Cita {
    paciente: string;
    fechaProgramada: Date;
}

export interface CitasResponse {
    _id: string;
    paciente: {
        _id: string;
        nombreCompleto: string;
    };
    fechaProgramada: string;
    estadoCita: "PENDIENTE" | "RE-AGENDADO" | "COMPLETADO" | "CANCELADO";
}

export interface ActualizarFechaCita {
    fechaProgramada?: Date;
}

export interface patchEstadoCita {
    estadoCita?: string;
}