export interface NuevoTratamiento {
    paciente: string; 
    fechaInicio?: string;
    dientesTratados: DienteTratamiento[];
}
  
  export interface DienteTratamiento {
    numero: number;
    descripcion: string;
    costo: number;
}


export interface Tratamiento {
    paciente: Paciente | string;
    fechaInicio: string;
    dientesTratados: DienteTratado[];
    costoTotal: number;
    estado: 'PENDIENTE' | 'EN CURSO' | 'FINALIZADO';
    _id: string;
    __v?: number;
}
  
export interface DienteTratado {
    numero: number;
    descripcion: string;
    costo: number;
    estadoCosto: string;
    tipo: string;
    _id: string;
}
  
export interface Paciente {
    _id: string;
    nombreCompleto: string;
    fechaNacimiento: string;
    responsableTutor?: {
      nombre?: string | null;
    };
    edad?: number;
    sexo?: "Masculino" | "Femenino";
    direccion?: string;
    telefono?: string | null;
    email?: string | null;
    ocupacion?: string;
    estadoCivil?: "Soltero" | "Casado" | "Divorciado" | "Viudo" | "Unión libre" | "Otro";
    recomendadoPor?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface ActualizarEstadoTratamiento {
    estado: 'PENDIENTE' | 'EN CURSO' | 'FINALIZADO';
}

export interface ActualizarTratamientoData {
    paciente?: string;  
    fechaInicio?: string;
    dientesTratados?: {
      numero: number;
      descripcion: string;
      costo: number;
    }[];
}