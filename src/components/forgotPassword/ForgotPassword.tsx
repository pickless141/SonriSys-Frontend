"use client";

import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useAuthStore } from "@/store/authStore";

export default function ForgotPassword({ onBack, onReset }: { onBack: () => void; onReset: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const forgotPassword = useAuthStore((state) => state.forgotPassword);

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(email);
      setMessage("Código de verificación enviado a tu correo. Revísalo y sigue las instrucciones.");
      setTimeout(() => {
        onReset(email); // ✅ Cambia a ResetPassword en LoginPage.tsx
      }, 3000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <p className="text-gray-600 text-center mb-6">
        Ingresa tu correo y te enviaremos un código para restablecer tu contraseña.
      </p>

      {message && <p className="text-green-500 text-center mb-4">{message}</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="mb-6">
        <TextField
          label="Correo Electrónico"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <Button
          variant="contained"
          fullWidth
          className="bg-coral-500 hover:bg-coral-600 text-white py-2 rounded-md"
          onClick={handleForgotPassword}
        >
          Enviar Código
        </Button>
      </div>

      <div className="text-center">
        <button className="text-coral-500 hover:underline mt-2" onClick={onBack}>
          Volver al inicio de sesión
        </button>
      </div>
    </>
  );
}