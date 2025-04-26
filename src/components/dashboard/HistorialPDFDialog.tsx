"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CloseIcon from "@mui/icons-material/Close";

interface HistorialPDFDialogProps {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
}

const HistorialPDFDialog: React.FC<HistorialPDFDialogProps> = ({ open, onClose, pdfUrl }) => {
  const theme = useTheme();
  const fullScreenMediaQuery = useMediaQuery(theme.breakpoints.down("md"));
  const [fullScreen, setFullScreen] = useState(false);

  const handleToggleFullScreen = () => {
    setFullScreen((prev) => !prev);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "historial_medico.pdf";
    link.click();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen || fullScreenMediaQuery}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle
        sx={{
          color: "#FF6B6B",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Historia Clinica</span>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title={fullScreen ? "Contraer" : "Expandir"}>
            <IconButton onClick={handleToggleFullScreen}>
              {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Descargar Historial">
            <IconButton onClick={handleDownload}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cerrar">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          height: fullScreen ? "calc(100vh - 150px)" : "80vh",
        }}
      >
        <object data={pdfUrl} type="application/pdf" width="100%" height="100%">
          <p>
            Tu navegador no soporta la visualización de PDFs. Por favor descarga el PDF para verlo.
          </p>
        </object>
      </DialogContent>
    </Dialog>
  );
};

export default HistorialPDFDialog;