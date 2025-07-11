"use client";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { isLogin } from '../lib/helper';
import { removeAuthCookies } from '../lib/helper/token';
import { useProtectedProtected } from '../services/hooks/hookAuth';

const Header = () => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any | undefined>(undefined);
  const { postProtectedProtected } = useProtectedProtected();

  const [scrolled, setScrolled] = useState(false);

  const handleLogout = async () => {
    try {
      removeAuthCookies()
      setUser(null);
      router.push("/login");

    } catch (err) {
      console.error("Logout error:", err);
    }
  };


  const fetchUser = React.useCallback(async () => {
    try {
      const res = await postProtectedProtected({});
      setUser(res.data);
    } catch {
      setUser(null);
    }
  }, [postProtectedProtected]);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      fetchUser();
    } else {
      setUser(null);
    }
    setLoggedIn(isLogin());

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, fetchUser]);

  const menuItems = [
    { label: "Trang Chủ", href: user?.role === "admin" ? "/admin/dashboard" : "/user/home" },
    { label: "Liên Hệ", href: "#footer" },

    loggedIn //thay doi duong dan
      ? { label: "Chat Sinh Viên", href: "/tu-van" }
      : { label: "Chat Tuyển Sinh", href: "/tu-van" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1,
          bgcolor: (theme) =>
            scrolled ? alpha(theme.palette.grey[700], 0.75) : "transparent",
          color: scrolled ? "white" : "black",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          boxShadow: scrolled ? 3 : "none",
          transition: "background-color .3s ease",
          px: 2,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: "100%",
            maxWidth: 1440,
            mx: "auto",
            px: { xs: 2, md: 3 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Image
              width={1000}
              height={1000}
              src="/logoVl.png"
              className="w-36"
              alt="logo"
              style={{ display: "block" }}
            />
          </Link>

          {/* —— DESKTOP MENU —— */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            {menuItems.map((item, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  color="inherit"
                  sx={{
                    p: "10px 20px",
                    fontWeight: "light",
                    ":hover": { bgcolor: "#d62134", color: "white" },
                  }}
                >
                  <Link href={item.href} style={{ textDecoration: "none", color: "white" }}>
                    {item.label}
                  </Link>
                </Button>
              </motion.div>
            ))}

            {/* Đăng Nhập / Đăng Xuất */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              {!user && (
                <Button
                  sx={{
                    bgcolor: loggedIn ? "#d32f2f" : "#1565c0",
                    color: "white",
                    fontWeight: "light",
                    ":hover": { bgcolor: loggedIn ? "#b71c1c" : "#0d47a1" },
                  }}
                  onClick={() => {
                    if (loggedIn) {
                      handleLogout();
                    } else {
                      router.push("/login");
                    }
                  }}
                >
                  {loggedIn ? "Đăng Xuất" : "Đăng Nhập Cho Sinh Viên"}
                </Button>
              )}
            </motion.div>

          </Box>

          {/* —— MOBILE: nút menu —— */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>


      {/* —— DRAWER cho mobile —— */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <List sx={{ width: 250 }}>
          {menuItems.map((item, idx) => (
            <ListItem key={idx} disablePadding onClick={() => setDrawerOpen(false)}>
              <ListItemButton component={Link} href={item.href}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            {loggedIn ? (
              <ListItemButton
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary="Đăng Xuất" sx={{ background: "#B52934", padding: 2, color: "white" }} />
              </ListItemButton>
            ) : (
              <ListItemButton component={Link} href="/login" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Đăng Nhập Cho Sinh Viên" sx={{ background: "#4F87FF", padding: 2, color: "white" }} />
              </ListItemButton>
            )}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
