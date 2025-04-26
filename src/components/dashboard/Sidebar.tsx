"use client";

import { useState } from "react";
import Link from "next/link";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight, Menu } from "@mui/icons-material";
import clsx from "clsx";
import { useAuthStore } from "@/store/authStore"; 

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useAuthStore(); // obtenemos el usuario autenticado

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Botón hamburguesa mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <IconButton onClick={toggleMobileSidebar} className="text-white bg-coral-500 hover:bg-coral-600">
          <Menu />
        </IconButton>
      </div>

      {/* Sidebar Desktop */}
      <aside
        className={clsx(
          "h-screen bg-coral-500 text-white flex flex-col transition-all duration-300 ease-in-out z-40",
          isMinimized ? "w-20" : "w-64",
          "hidden md:flex"
        )}
      >
        <div className="flex justify-between items-center p-4">
          {!isMinimized && <h2 className="text-2xl font-bold">SonriSys</h2>}
          <IconButton onClick={toggleSidebar} className="text-white">
            {isMinimized ? <ChevronRight sx={{ color: "white" }} /> : <ChevronLeft sx={{ color: "white" }} />}
          </IconButton>
        </div>

        <nav className="flex flex-col space-y-4 px-4">
          <Link href="/dashboard" className={clsx("flex items-center gap-2 py-2 px-4 rounded-md hover:bg-coral-600", isMinimized && "justify-center")}>
            {!isMinimized && "Inicio"}
          </Link>
          <Link href="/dashboard/tratamientos" className={clsx("flex items-center gap-2 py-2 px-4 rounded-md hover:bg-coral-600", isMinimized && "justify-center")}>
            {!isMinimized && "Tratamientos"}
          </Link>
          <Link href="/dashboard/citas" className={clsx("flex items-center gap-2 py-2 px-4 rounded-md hover:bg-coral-600", isMinimized && "justify-center")}>
            {!isMinimized && "Citas"}
          </Link>
          <Link href="/dashboard/pagos" className={clsx("flex items-center gap-2 py-2 px-4 rounded-md hover:bg-coral-600", isMinimized && "justify-center")}>
            {!isMinimized && "Pagos"}
          </Link>

          {/* Sólo para admin */}
          {user?.rol === "admin" && (
            <Link href="/dashboard/usuarios" className={clsx("flex items-center gap-2 py-2 px-4 rounded-md hover:bg-coral-600", isMinimized && "justify-center")}>
              {!isMinimized && "Usuarios"}
            </Link>
          )}
        </nav>
      </aside>

      {/* Overlay al abrir sidebar en mobile */}
      <div
        className={clsx("fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity", isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible")}
        onClick={toggleMobileSidebar}
      ></div>

      {/* Sidebar Mobile */}
      <aside
        className={clsx("fixed top-0 left-0 h-full bg-coral-500 text-white flex flex-col transition-transform duration-300 ease-in-out z-50 md:hidden", isMobileOpen ? "translate-x-0" : "-translate-x-full", "w-64")}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-3xl font-bold">SonriSys</h2>
          <IconButton onClick={toggleMobileSidebar} className="text-white">
            <ChevronLeft sx={{ color: "white" }} />
          </IconButton>
        </div>

        <nav className="flex flex-col space-y-4 px-4">
          <Link href="/dashboard" className="block py-2 px-4 rounded-md hover:bg-coral-600" onClick={toggleMobileSidebar}>
            Inicio
          </Link>
          <Link href="/dashboard/tratamientos" className="block py-2 px-4 rounded-md hover:bg-coral-600" onClick={toggleMobileSidebar}>
            Tratamientos
          </Link>
          <Link href="/dashboard/citas" className="block py-2 px-4 rounded-md hover:bg-coral-600" onClick={toggleMobileSidebar}>
            Citas
          </Link>
          <Link href="/dashboard/pagos" className="block py-2 px-4 rounded-md hover:bg-coral-600" onClick={toggleMobileSidebar}>
            Pagos
          </Link>

          {/* Solo admin */}
          {user?.rol === "admin" && (
            <Link href="/dashboard/usuarios" className="block py-2 px-4 rounded-md hover:bg-coral-600" onClick={toggleMobileSidebar}>
              Usuarios
            </Link>
          )}
        </nav>
      </aside>
    </>
  );
}