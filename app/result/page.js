"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Box, Typography, Button, Card, CardContent, AppBar, Toolbar, IconButton, Drawer, List, ListItem } from "@mui/material";
import Image from "next/image";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MenuIcon from '@mui/icons-material/Menu';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Confetti from "react-confetti";


{/* Function for the checkout result*/}
export default function Result() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const { width, height } = useWindowSize();
    const [isSuccess, setIsSuccess] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (sessionId) {
            setIsSuccess(true);
        }
    }, [sessionId]);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    function useWindowSize() {
        const [size, setSize] = useState({ width: 0, height: 0 });
    
        useEffect(() => {
            const updateSize = () => {
                setSize({ width: window.innerWidth, height: window.innerHeight });
            };
    
            window.addEventListener("resize", updateSize);
            updateSize(); 
    
            return () => window.removeEventListener("resize", updateSize);
        }, []);
    
        return size;
    }

    return (
        <Box 
            sx={{ 
                display: "flex", 
                flexDirection: "column", 
                minHeight: "100vh", 
                backgroundImage: 'url(/flashcardbg.png)', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                color: "white"
            }}
        >

        {/* Confetti effect after successful purchase 🎉 */}
        {isSuccess && <Confetti width={width} height={height} />}

            {/* Navbar */}
            <AppBar position="static" sx={{ backgroundColor: "black" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    {/* Logo */}
                    <Button sx={{ display: "flex", alignItems: "center", textTransform: "none", p: 0 }} href="/">
                        <Image src="/cardwizard.png" alt="CardWiz Logo" width={40} height={40} style={{ marginRight: "16px" }} />
                        <Typography variant="h6" sx={{ color: "#fff", fontWeight: "normal" }}>
                            CardWiz
                        </Typography>
                    </Button>

                    {/* Menu items (on desktop) */}
                    <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
                    <SignedOut>
                        <Button color="inherit" href="/" 
                            sx={{ fontWeight: "normal", color: "#999", textTransform: "none", "&:hover": { color: "#f1f1f1" } }}>
                            Home
                        </Button>
                        <Button color="inherit" href="/#features" 
                            sx={{ fontWeight: "normal", color: "#999", textTransform: "none", "&:hover": { color: "#f1f1f1" } }}>
                            Features
                        </Button>
                        <Button color="inherit" href="/#pricing" 
                            sx={{ fontWeight: "normal", color: "#999", textTransform: "none", "&:hover": { color: "#f1f1f1" } }}>
                            Pricing
                        </Button>
                        <Button color="inherit" href="/sign-in" 
                            sx={{ fontWeight: "normal", color: "#999", textTransform: "none", "&:hover": { color: "#f1f1f1" } }}>
                            Login
                        </Button>
                        <Button color="inherit" href="/sign-up" 
                            sx={{ fontWeight: "normal", color: "#999", textTransform: "none", "&:hover": { color: "#f1f1f1" } }}>
                            Sign Up
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <Button color="inherit" href="/" 
                            sx={{ fontWeight: "normal", color: "#999", textTransform: "none", "&:hover": { color: "#f1f1f1" } }}>
                            Home
                        </Button>
                        <Button color="inherit" href="/generate" 
                            sx={{ fontWeight: "normal", color: "#999", textTransform: "none", "&:hover": { color: "#f1f1f1" } }}>
                            Generate
                        </Button>
                        <Button color="inherit" href="/flashcards" 
                            sx={{ fontWeight: "normal", color: "#999", textTransform: "none", "&:hover": { color: "#f1f1f1" } }}>
                            Saved
                        </Button>
                        <Button color="inherit" href="/#pricing" 
                            sx={{ fontWeight: "normal", color: "#999", textTransform: "none", "&:hover": { color: "#f1f1f1" }, mr: 2 }}>
                            Pricing
                        </Button>
                        <UserButton />
                    </SignedIn>
                </Box>

                    {/* Menu icon for Mobile devices */}
                    <Box sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}>
                        <UserButton />
                        <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile drawer */}
            <Drawer anchor="right" open={open} onClose={handleDrawerToggle}>
                <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
                    <List>
                        <SignedOut>
                            <ListItem button component="a" href="/">Home</ListItem>
                            <ListItem button component="a" href="/#features">Features</ListItem>
                            <ListItem button component="a" href="/#pricing">Pricing</ListItem>
                            <ListItem button component="a" href="/sign-in">Login</ListItem>
                            <ListItem button component="a" href="/sign-up">Sign Up</ListItem>
                        </SignedOut>
                        <SignedIn>
                            <ListItem button component="a" href="/">Home</ListItem>
                            <ListItem button component="a" href="/generate">Generate</ListItem>
                            <ListItem button component="a" href="/flashcards">Saved</ListItem>
                            <ListItem button component="a" href="/#pricing">Pricing</ListItem>
                        </SignedIn>
                    </List>
                </Box>
            </Drawer>

            {/* Main session result page */}
            <Box 
                sx={{ 
                    flex: 1, 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    justifyContent: "center",
                    textAlign: "center",
                    px: 3
                }}
            >
                <Card 
                    sx={{ 
                        maxWidth: 500, 
                        textAlign: "center", 
                        p: 4, 
                        borderRadius: 3, 
                        backgroundColor: "#1E1E1E",
                        boxShadow: 5,
                        animation: "fadeIn 1.5s ease-in-out",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    {isSuccess ? (
                        <>
                            <CheckCircleIcon sx={{ fontSize: 90, color: "#4CAF50", mb: 2 }} />
                            <Typography variant="h4" fontWeight="bold" sx={{ color: "#fff" }}>
                                Payment Successful! 🎉
                            </Typography>
                            <Typography sx={{ mt: 1, color: "#bbb", fontSize: "1rem" }}>
                                Thank you for upgrading to <span className="rainbow-text">CardWiz Pro. </span> 
                                Your learning experience just got better!
                            </Typography>
                        </>
                    ) : (
                        <>
                            <CancelIcon sx={{ fontSize: 90, color: "#FF5733", mb: 2 }} />
                            <Typography variant="h4" fontWeight="bold">
                                Payment Canceled
                            </Typography>
                            <Typography sx={{ mt: 1, color: "#bbb", fontSize: "1rem" }}>
                                Looks like you canceled the payment.  
                                No worries, you can try again anytime!
                            </Typography>
                        </>
                    )}

                    <Button 
                        variant="contained" 
                        sx={{ 
                            mt: 4, 
                            px: 5, 
                            py: 1.5, 
                            fontSize: "1.1rem", 
                            fontWeight: "bold", 
                            borderRadius: "50px",
                            background: "linear-gradient(135deg, #6A0DAD, #4B0082)",
                            color: "white",
                            textTransform: "none",
                            transition: "0.3s",
                            "&:hover": { 
                                background: "linear-gradient(135deg, #4B0082, #6A0DAD)", 
                                transform: "scale(1.05)" 
                            }
                        }} 
                        href="/"
                    >
                        Back to Home
                    </Button>
                </Card>
            </Box>
        </Box>
    );
}
