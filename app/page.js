'use client';
import Image from "next/image";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid, Card, CardContent, Link, MenuItem, IconButton, Drawer, List, ListItem } from "@mui/material";
import ReactDOM from 'react-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Head from 'next/head';
import getStripe from '@/utils/get-stripe';
import { grey } from "@mui/material/colors";
import { Inter } from "next/font/google";
import TrustedBy from "@/components/trusted";
import MenuIcon from '@mui/icons-material/Menu';
import { Analytics } from "@vercel/analytics/react"
import { useEffect } from 'react';

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    });
    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }
  
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });
  
    if (error) {
      console.warn(error.message);
    }
  }

  const router = useRouter();
  const handleNavClick = (path) => {
    router.push(path);
  };

  {/*PREVENT RIGHT CLICK/IMAGE SAVING*/}
    useEffect(() => {
      // Prevent right-click and drag on images
      const images = document.querySelectorAll('.image');

      images.forEach(image => {
          // Prevent right-click context menu on images
          image.addEventListener('contextmenu', function(e) {
              e.preventDefault();
          });

          // Prevent drag and drop
          image.addEventListener('dragstart', function(e) {
              e.preventDefault();
          });
      });

      // Prevent right-click context menu on the entire page
      document.addEventListener('contextmenu', function(e) {
          if (e.target.tagName === 'IMG') {
              e.preventDefault();
          }
      });
  }, []); 

    //TEXT ANIMATION
    const getCurrentColor = () => {
      const currentIndex = loopNum % colors.length;
      return colors[currentIndex];
    };
    const words = ["Exams", "Interviews", "School", "Anything"];
    const colors = ["#FF5733", "#3357FF", "#F1C40F", "rainbow-text"]; 
    
    
    const [currentWord, setCurrentWord] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
  
    useEffect(() => {
      const handleTyping = () => {
        const currentIndex = loopNum % words.length;
        const fullText = words[currentIndex];
  
        setCurrentWord((prev) =>
          isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
        );
  
        setTypingSpeed(isDeleting ? 100 : 150);
  
        if (!isDeleting && currentWord === fullText) {
          setTimeout(() => setIsDeleting(true), 500);
        } else if (isDeleting && currentWord === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      };
  
      const timer = setTimeout(handleTyping, typingSpeed);
  
      return () => clearTimeout(timer);
    }, [currentWord, isDeleting, loopNum, typingSpeed, words]);

  <Head>
    <title>CardWiz</title>
    <meta name="description" content="Your Best Studying Companion" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/cardwizard.png" />
  </Head>

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: 'url(/flashcardbg.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        fontFamily: 'Inter',
        padding: 0,
        margin: 0
      }}
    >
        {/* Navbar */}
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Button
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: 0 
              }}
              href="/" 
            >
              <Image src="/cardwizard.png" alt="CardWiz Logo" width={40} height={40} style={{ marginRight: '16px' }} />
              <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff', fontWeight: 'normal', textTransform: 'none' }}>
                CardWiz
              </Typography>
            </Button>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
          
          </Typography>
          <SignedOut>
            <Button 
              color="inherit" 
              href="/" 
              sx={{ 
                fontWeight: 'normal', 
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1'
                }
              }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              href="#features" 
              sx={{ 
                fontWeight: 'normal', 
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1'
                }
              }}
            >
              Features
            </Button>
            <Button 
              color="inherit" 
              href="#pricing" 
              sx={{ 
                fontWeight: 'normal', 
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1',
                }
              }}
            >
              Pricing
            </Button>
            <Button 
              color="inherit" 
              href="/sign-in" 
              sx={{ 
                fontWeight: 'normal', 
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1'
                }
              }}
            >
              Login
            </Button>
            <Button 
              color="inherit" 
              href="/sign-up" 
              sx={{ 
                fontWeight: 'normal', 
                textTransform: 'none',
                color: '#999999',
                '&:hover': {
                  color: '#f1f1f1'
                }
              }}
            >
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
              <Button 
                color="inherit" 
                href="/" 
                sx={{ 
                  fontWeight: 'normal', 
                  textTransform: 'none',
                  color: '#999999',
                  '&:hover': {
                    color: '#f1f1f1'
                  }
                }}
              >
                Home
              </Button>
              <Button 
                color="inherit" 
                href="/generate" 
                sx={{ 
                  fontWeight: 'normal', 
                  textTransform: 'none',
                  color: '#999999',
                  '&:hover': {
                    color: '#f1f1f1',
                  }
                }}
              >
                Generate
              </Button>
              <Button 
                color="inherit" 
                href="/flashcards" 
                sx={{ 
                  fontWeight: 'normal', 
                  textTransform: 'none',
                  color: '#999999',
                  '&:hover': {
                    color: '#f1f1f1',
                  }
                }}
              >
                Saved
              </Button>
              <Button 
                color="inherit" 
                href="/#pricing" 
                sx={{ 
                  fontWeight: 'normal', 
                  textTransform: 'none',
                  marginRight: '16px' ,
                  color: '#999999',
                  '&:hover': {
                    color: '#f1f1f1',
                  }
                }}
              >
                Pricing
              </Button>
              <UserButton />
            </SignedIn>
        </Toolbar>
        <Toolbar sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'space-between' }}>
          <Button
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              textTransform: 'none', 
              p: 0 
            }}
            onClick={() => handleNavClick('/')} 
          >
            <Image src="/cardwizard.png" alt="CardWiz Logo" width={40} height={40} style={{ marginRight: '16px' }} />
            <Typography variant="h6" sx={{ color: '#fff' }}>
              CardWiz
            </Typography>
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <UserButton />
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleDrawerToggle}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
      </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerToggle}
      >
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
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
                <ListItem button component="a" href="#pricing">Pricing</ListItem>
              </SignedIn>
          </List>
        </Box>
      </Drawer>


      {/* Navbar End*/}

      {/* Hero Section */}
      <Box id="home" sx={{ flex: 1, textAlign: 'center', my: 4, color: 'white', font: 'Inter' }}>
      <br></br>
      <buttons
        style={{
          background: 'linear-gradient(to left, #CE4C9E, #4B0082, #9400D3)',
          backgroundSize: '200% 200%',
          animation: 'rainbow-animation 10s ease infinite',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '50px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '12px',
        }}
      >
        🎉 | Introducing CardWiz
      </buttons>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          fontFamily: 'Inter',
          fontSize: { xs: '2.170rem', sm: '3rem', md: '4.5rem' },
          lineHeight: { xs: '3rem', sm: '3.5rem', md: '4.5rem' },
          animation: 'SlidesDown 2s ease-in-out',
          mx: { xs: 2, sm: 4 },
          px: 2,
          whiteSpace: 'nowrap',
          position: 'relative',
        }}
      >
        <br />
        Study For&nbsp;
        <span 
          id="dynamic-word"
          className={getCurrentColor()} 
          
        >
          {currentWord}
        </span>
        <span id="cursor">|</span>
      </Typography>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          fontFamily: 'Inter',
          fontSize: { xs: '2.5rem', sm: '3rem', md: '4.5rem' },
          lineHeight: { xs: '3rem', sm: '3.5rem', md: '4.5rem' },
          animation: 'slideDown 2s ease-in-out',
          mx: { xs: 2, sm: 4 },
          px: 2,
        }}
      >
        With <span style={{
          background: 'linear-gradient(90deg, #e100ff, #4B0082, #9400D3)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>AI</span>.
      </Typography>

        <br></br>
        <br></br>
        <br></br>
        <Typography 
          variant="h6" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 'light', 
            fontFamily: 'Inter',
            maxWidth: { xs: '90%', sm: '70%', md: '50%' }, 
            textAlign: 'center', 
            margin: '0 auto',
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
            animation: 'fadeIn 4s ease-in-out',
            px: 2 
          }}
        >
          Elevate your exam preparation with our dynamic ai-powered flashcards, expertly designed to optimize learning and improve retention. 
        </Typography>
        <br></br>
        <TrustedBy />
        <br></br>
        <br></br>
        <br></br>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ 
            mt: 2, 
            fontSize: { xs: '1rem', sm: '1.2rem' }, 
            fontWeight: '500', 
            fontFamily: 'Inter',
            backgroundColor: 'white', 
            color: 'black', 
            animation: 'slideUp 4s ease-in-out',
            textTransform: 'none', 
            borderRadius: 2,
            px: 4,
            '&:hover': { 
            transform: 'scale(1.05)', 
            backgroundImage: 'linear-gradient(to bottom, purple, black)', 
            color: 'white' 
          }
          }} 
          href="/generate"
        >
          Get Started ✨
        </Button>
      </Box>
      
    {/* Features Section */}
    <Box 
      id="features" 
      sx={{ 
        my: 4, 
        color: 'white', 
        px: { xs: 2, sm: 3, md: 4 },  
      }}
    >
      <Typography 
        variant="h2" 
        component="h2" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          color: 'white', 
          textAlign: 'center',
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          px: 2 
        }}
      >
        <br></br>
        <br></br>
        Features
      </Typography>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, textAlign: 'center', height: 'auto', maxWidth: 500, m: 'auto', transition: '0.3s', '&:hover': { transform: 'translateY(-20px)' } }}>
            <CardContent>
              <Image src="/flash.png" width={50} height={50} alt="Dynamic Flashcards" />
              <Typography variant='h5' sx={{ mt: 2, fontWeight: 'bold', fontFamily: 'Inter', }}>Dynamic Flashcards</Typography>
              <Typography sx={{ mt: 1 }}>
                CardWiz AI transforms your text into concise, effective study tools that are perfect for the upcoming semester
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, textAlign: 'center', height: 'auto', maxWidth: 500, m: 'auto', transition: '0.3s', '&:hover': { transform: 'translateY(-20px)' } }}>
            <CardContent>
              <Image src="/personal.png" width={50} height={50} alt="Personalized Study Plans" />
              <Typography variant='h5' sx={{ mt: 2, fontWeight: 'bold', fontFamily: 'Inter', }}>Personalized Study Plans</Typography>
              <Typography sx={{ mt: 1 }}>
                Customize your learning experience with plans tailored to your goals and skill level
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, textAlign: 'center', height: 'auto', maxWidth: 500, m: 'auto', transition: '0.3s', '&:hover': { transform: 'translateY(-20px)' } }}>
            <CardContent>
              <Image src="/review.png" width={50} height={50} alt="Effective Review System" />
              <Typography variant='h5' sx={{ mt: 2, fontWeight: 'bold', fontFamily: 'Inter', }}>Effective Review System</Typography>
              <Typography sx={{ mt: 1 }}>
                Save and Revisit important topics at optimal times to enhance your retention and mastery
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>


      {/* Pricing Section */}
      <Box id="pricing" sx={{ my: 6, textAlign: 'center' }}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Typography 
          variant="h2" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            color: '#fff', 
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Plans & Pricing
        </Typography>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 3, color: '#808080', border: '3px solid', borderColor: '#808080', borderRadius: 2, backgroundColor: '#fff', boxShadow: 3, height: 'auto', maxWidth: 345, m: 'auto', transition: '0.3s', '&:hover': { transform: 'translateY(-40px)'  } }}>
              <Typography 
                variant='h4' 
                gutterBottom 
                sx={{ 
                  fontWeight: 'light',
                  color: '#808080',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                }}
              >
                Free
              </Typography>
              <Typography 
                variant='h5' 
                gutterBottom
                fontWeight={'bold'}
                sx={{ 
                  fontSize: { xs: '3rem', sm: '4rem', md: '5rem' }
                }}
              >
                $0
              </Typography>
              <br></br>
              {/* Plan Option 1 */}
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Image src="/greycheck.png" alt="Check" width={30} height={20} />
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', fontFamily: 'Inter', }, ml: 1 }}>
                  Basic flashcard features
                  </Typography>
                </Box>

                <br />

                {/* Plan Option 2 */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Image src="/greycheck.png" alt="Check" width={30} height={20} />
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', fontFamily: 'Inter', }, ml: 1 }}>
                  Limited flashcard generation
                  </Typography>
                </Box>

                <br />
                {/* Plan Option 2 */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Image src="/greycheck.png" alt="Check" width={30} height={20} />
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', fontFamily: 'Inter', }, ml: 1 }}>
                  Limited storage
                  </Typography>
                </Box>
                <br></br>
              <Button 
                variant="contained" 
                color="primary"
                href="/sign-up"
                
                sx={{ mt: 2, fontSize: { xs: '0.875rem', sm: '1rem', fontWeight: 'normal', textTransform: 'none', backgroundColor: 'grey', '&:hover': {backgroundColor: '#606060'}} }}
              >
                Get Started for Free
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 3, border: '3px solid', borderColor: 'black', borderRadius: 2, backgroundColor: '#fff', boxShadow: 3, height: 'auto', maxWidth: 345, m: 'auto', transition: '0.3s', '&:hover': { transform: 'translateY(-40px)' } }}>
              <Typography 
                variant='h4' 
                gutterBottom 
                sx={{ 
                  fontWeight: 'Light',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                }}
              >
                Pro
              </Typography>
              <Typography 
                variant='h5' 
                gutterBottom 
                fontWeight={'bold'}
                sx={{ 
                  fontSize: { xs: '3rem', sm: '4rem', md: '5rem' }
                }}
              >
                $1.99
              </Typography>
              <Typography 
                variant='h4' 
                gutterBottom 
                sx={{ 
                  fontWeight: 'Light', fontFamily: 'Inter',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                }}
              >
                Monthly payment
              </Typography>
              <br></br>
              <br></br>
              {/* Plan Option 1 */}
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Image src="/blackcheck.png" alt="Check" width={30} height={20} />
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }, ml: 1 }}>
                    Unlimited storage
                  </Typography>
                </Box>

                <br />

                {/* Plan Option 2 */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Image src="/blackcheck.png" alt="Check" width={30} height={20} />
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }, ml: 1 }}>
                    Unlimited flashcard generation
                  </Typography>
                </Box>

                <br />

                {/* Plan Option 3 */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Image src="/blackcheck.png" alt="Check" width={30} height={20} />
                  <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }, ml: 1 }}>
                    Custom study plans
                  </Typography>
                </Box>
              <Button
                variant="contained" 
                color="primary" 
                sx={{ mt: 2, fontSize: { xs: '0.875rem', sm: '1rem', fontWeight: 'normal', fontFamily: 'Inter', textTransform: 'none', backgroundColor: 'Black', '&:hover': {backgroundImage: 'linear-gradient(to bottom, purple, black)', }} }} 
                onClick={handleSubmit}
              >
                Get Pro
              </Button>
            </Card>
          </Grid>
        </Grid>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            fontFamily: 'Inter',
            color: 'white',
            fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' }, 
            lineHeight: { xs: '3rem', sm: '3.5rem', md: '4.5rem' },
            mx: { xs: 2, sm: 4 }, 
            px: 2 
          }}
        >
          What are <span className="purple-text">you</span> waiting for?
        </Typography>
        <br></br>
        <br></br>
        <br></br>
        <Typography 
          variant="h6" 
          component="h2" 
          color={'white'}
          gutterBottom 
          sx={{ 
            fontWeight: 'light', 
            maxWidth: { xs: '90%', sm: '70%', md: '50%' }, 
            textAlign: 'center', 
            margin: '0 auto',
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
            fontFamily: 'Inter',
            px: 2 
          }}
        >
          Take the next step towards success and join hundreds of students who are excelling with our powerful study tools. 
          Empower yourself with customized flashcards and innovative strategies designed to make learning more effective and engaging.
        </Typography>
        <TrustedBy />
        <br></br>
        <br></br>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ 
            mt: 2, 
            fontSize: { xs: '1rem', sm: '1.2rem' }, 
            fontWeight: 'normal', 
            backgroundColor: 'white', 
            color: 'black', 
            textTransform: 'none', 
            borderRadius: 2,
            px: 2, 
            textAlign: 'center',
            color: 'white',
            backgroundImage: 'linear-gradient(to bottom, purple, black)',
              '&:hover': {
                transform: 'scale(1.05)',
              }
          }} 
          href="/sign-up"
        >
          Join Beta! ✨
        </Button>
        <br></br>
        <br></br>
        <Typography color={'#E0E0E0'} fontSize={'1rem'} fontFamily={'Inter'}>
          Join and enjoy exclusive early access to <span className="rainbow-text">premium</span> features for a month.
        </Typography>
      </Box>
      
      <br></br>
      <br></br>
      <br></br>
      
      {/* Footer */}
      <Box sx={{ py: 1, textAlign: 'center'}}>
        <Typography 
          variant="h1" 
          color={grey[500]}
          sx={{ 
            color: '#E0E0E0', 
            fontFamily: 'Inter',
            fontWeight: 'light',
            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
          }}
        >
          © {new Date().getFullYear()} CardWiz. Built by{' '}
          <Link 
            href="https://linkedin.com/in/kelechi-opurum" 
            color="inherit" 
            underline="hover" 
            sx={{ 
              fontWeight: 'bold', 
              color: 'white'
            }}
          >
            Kelechi
          </Link> 
          . All rights reserved.
      </Typography>
      </Box>
    </Box>

    
  );
}
