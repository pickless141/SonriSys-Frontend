export interface Paciente {
    _id: string;
    nombreCompleto: string;
    fechaNacimiento: string; 
    edad: number;
    sexo: "Masculino" | "Femenino";
    direccion: string;
    telefono: string;
    email: string;
    ocupacion: string;
    estadoCivil: "Soltero" | "Casado" | "Divorciado" | "Viudo" | "Unión libre" | "Otro";
    recomendadoPor?: string;
    responsableTutor?: {nombre?: string}
    createdAt: string;
    updatedAt: string;
}

export interface CrearPacienteRequest {
    nombreCompleto: string;
    fechaNacimiento: string;
    edad: number;
    sexo: "Masculino" | "Femenino";
    direccion: string;
    telefono: string;
    email?: string | null;
    ocupacion: string;
    estadoCivil: "Soltero" | "Casado" | "Divorciado" | "Viudo" | "Unión libre" | "Otro";
    responsableTutor?: { nombre?: string; telefono?: string };
    recomendadoPor?: string
}

export interface EditarPacienteRequest {
    nombreCompleto?: string;
    fechaNacimiento?: string; 
    edad?: number;
    sexo?: "Masculino" | "Femenino";
    direccion?: string;
    telefono?: string;
    email?: string;
    ocupacion?: string;
    estadoCivil?: "Soltero" | "Casado" | "Divorciado" | "Viudo" | "Unión libre" | "Otro";
    responsableTutor?: { nombre?: string; telefono?: string };
    recomendadoPor?: string
}

export interface PacientesSelect {
    id: string;
    nombreCompleto: string
}