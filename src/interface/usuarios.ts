export interface Usuario {
    _id: string;
    nombre: string;
    email: string;
    rol: 'admin' | 'usuario';
    estado: boolean;
    intentosFallidos: number;
    bloqueadoHasta?: string;
    createdAt: string;
    updatedAt: string;
}
  
export interface CrearUsuarioRequest {
    nombre: string;
    email: string;
    password: string;
    rol: 'admin' | 'usuario';
}
  
export interface EditarUsuarioRequest {
    nombre?: string;
    rol?: 'admin' | 'usuario';
    estado?: boolean;
}
  
export interface ResetearIntentosRequest {
    // si se desea extender en el futuro
}

