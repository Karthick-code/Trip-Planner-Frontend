import React from 'react';
import Container from '@mui/material/Container';
import PersistentDrawerLeft from './Dashboard';
import Footer from './Footer';




function Layout({ children }) {
    return (
        <>
            <PersistentDrawerLeft />
            
            <Container style={{ marginTop: '20px' }}>
                {children}
            </Container>
            <Footer />
        </>
    )
}

export default Layout