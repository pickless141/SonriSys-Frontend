export interface User {
    id: string;
    nombre: string;
    email: string;
    rol: "admin" | "usuario";
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loadUser: () => Promise<void>;
    login: (email: string, password: string) => Promise<User>;
    logout: () => Promise<void>
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (email: string, resetCode: string, newPassword: string) => Promise<void>;
}