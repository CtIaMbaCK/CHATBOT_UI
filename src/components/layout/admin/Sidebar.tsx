"use client";

import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Box,
    Typography,
} from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { useState } from 'react';
import useStore from '../../store';

const drawerWidth = 240;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, href: '/admin/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, href: '/admin/users' },
    // { text: 'About', icon: <ShoppingCartIcon />, href: '/admin/about' },
    // { text: 'Database', icon: <SettingsIcon />, href: '/admin/database' },
    // { text: 'Settings', icon: <SettingsIcon />, href: '/admin/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const isLogin = useStore((state: any) => state.isLogin);
    const setIsLogin = useStore((state: any) => state.setIsLogin);



    const handleLogout = async () => {
        try {
            localStorage.removeItem("access_token");
            setUser(null);
            setIsLogin(false)
            router.push("/user/home");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                position: 'relative'
            }}
        >
            <Toolbar className='flex items-center justify-center bg-[#B02E35]'>
                <Image src={"/chatbot.png"} width={1000} height={1000} alt='logoVanLang' className='w-12 h-12'></Image>
            </Toolbar>
            <Box sx={{ overflow: 'auto', flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <List>
                    {menuItems.map((item) => (
                        <Link key={item.href} href={item.href} passHref>
                            <ListItem button selected={pathname === item.href}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>

                <Box sx={{
                    background: "#1f2937",
                    height: "5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    paddingX: 2,
                    alignItems: "center"


                }}>
                    <Box sx={{ color: "white", display: "flex" }}>
                        <AccountCircleIcon sx={{ fontSize: "2rem", marginRight: "5px" }} />
                        <Box sx={{ gap: 4 }}>
                            {/* thay */}
                            <Typography sx={{ fontSize: "76.25%" }}>admin@vanlanguni.vn</Typography>
                            <Typography sx={{ fontSize: "76.25%", color: "#D46B36" }}>VLU@2025</Typography>
                        </Box>
                    </Box>
                    <div className='hover:cursor-pointer' onClick={handleLogout}><LogoutIcon sx={{ color: "white", fontSize: "1.5rem" }} /></div>
                </Box>
            </Box>

        </Drawer>
    );
}
