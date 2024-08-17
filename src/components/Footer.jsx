
import React from 'react';
import { Typography, Link, Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
    return (
        <>
        <Box
            component="footer"
            sx={{
                width: '100%', // Ensures the footer covers the full width of the container
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                textAlign: 'center',
                padding: '20px', // Increased padding for better coverage
                marginTop: '20px', // Space between content and footer
                boxSizing: 'border-box', // Includes padding and border in the element's total width and height
            }}
        >
            <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                Explore & Go
            </Typography>
            <Typography variant="caption" color="text.secondary">
                © {new Date().getFullYear()} Explore&Go. All rights reserved.
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                <Link href="#" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
                    Privacy Policy
                </Link>
                <Link href="#" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
                    Terms of Service
                </Link>
                <Link href="#" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
                    Contact Us
                </Link>
            </Box>
            
        </Box>
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
        <Link href="https://www.facebook.com/login.php/" target="_blank" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
        <FacebookIcon /> Facebook
        </Link>
        <Link href="https://x.com/login=" target="_blank" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
        <XIcon/> Twitter
        </Link>
        <Link href="https://www.instagram.com/accounts/login/" target="_blank" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
        <InstagramIcon/>Instagram
        </Link>
        <Link href="https://www.linkedin.com/login" target="_blank" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
        <LinkedInIcon />LinkedIn
        </Link>
        <Link href="https://github.com/login" target="_blank" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
        <GitHubIcon/>GitHub
        </Link>
        </Box></>
    );
};

export default Footer;







