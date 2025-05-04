"use client";

import { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthStore } from "@/store/authStore";

export default function ResetPassword({ email, onBack }: { email: string; onBack: () => void }) {
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const resetPassword = useAuthStore((state) => state.resetPassword);

  const handleReset = async () => {
    try {
      await resetPassword(email, resetCode, newPassword);
      setMessage("✅ Contraseña actualizada correctamente. Redirigiendo al inicio de sesión...");

      setTimeout(() => {
        onBack();
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado al restablecer la contraseña.");
      }
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Nueva Contraseña</h2>

      {message && <p className="text-green-500 text-center mb-6">{message}</p>}
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      <div className="mb-6"> 
        <TextField
          label="Código de Verificación"
          variant="outlined"
          fullWidth
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
        />
      </div>

      <div className="mb-6"> 
        <TextField
          label="Nueva Contraseña"
          type={showPassword ? "text" : "password"} 
          variant="outlined"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
      </div>

      <div className="mb-6">
        <Button
          variant="contained"
          fullWidth
          className="bg-coral-500 hover:bg-coral-600 text-white py-2 rounded-md"
          onClick={handleReset}
        >
          Restablecer Contraseña
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