"use client";

import Image from "next/image";
import { useState } from "react";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import ForgotPassword from "@/components/forgotPassword/ForgotPassword";
import ResetPassword from "@/components/resetPassword/ResetPassword";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleLogin = async (): Promise<void> => {
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocurrió un error inesperado al iniciar sesión.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Imagen lateral */}
      <div className="hidden md:flex w-3/5 bg-white items-center justify-center">
        <Image
          src="/dental-login.jpg"
          alt="Imagen odontología"
          width={600}
          height={600}
          className="object-cover max-w-full h-auto rounded-2xl shadow-lg shadow-gray-400/50"
        />
      </div>

      {/* Contenedor del formulario */}
      <div className="w-full md:w-2/5 flex flex-col justify-center px-8 md:px-16 bg-coral-500 shadow-lg">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:px-12 backdrop-blur-md">
          <h1 className="text-4xl roboto-mono-bold text-gray-800 text-center mb-6">
            Sonri<span className="text-coral-500">Sys</span>
          </h1>

          {isResetPassword ? (
            <ResetPassword email={resetEmail} onBack={() => setIsResetPassword(false)} />
          ) : isForgotPassword ? (
            <ForgotPassword
              onBack={() => setIsForgotPassword(false)}
              onReset={(email) => {
                setResetEmail(email);
                setIsForgotPassword(false);
                setIsResetPassword(true);
              }}
            />
          ) : (
            <>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}

              <TextField
                label="Correo Electrónico"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Contraseña"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                fullWidth
                className="bg-coral-500 hover:bg-coral-600 text-white py-2 rounded-md mt-4"
                onClick={handleLogin}
              >
                Iniciar Sesión
              </Button>

              <div className="text-center mt-4">
                <button
                  className="text-gray-500 hover:underline"
                  onClick={() => setIsForgotPassword(true)}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}