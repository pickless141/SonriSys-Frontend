"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import { Logout, AccountCircle } from "@mui/icons-material";

export default function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="flex justify-between items-center bg-white p-4 shadow-md mt-14 md:mt-0 relative z-40">
      <h1 className="text-xl font-bold text-gray-800">
        Bienvenido, {user?.nombre || "Usuario"}
      </h1>

      <div>
        <IconButton onClick={handleMenuOpen}>
          <Avatar className="bg-coral-500">
            {user?.nombre?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              width: "200px",
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <AccountCircle className="mr-2 text-gray-700" />
            Editar perfil
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Logout className="mr-2 text-red-500" />
            Cerrar sesión
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}