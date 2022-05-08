import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import './NavigationBar.css'


export default function NavigationBar() {

    const location = useLocation()

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        style={{display: 'flex'}}
                        pr={2}
                    >
                        PX to VW
                    </Typography>

                    <Box style={{display: 'flex'}}>
                        <Button 
                            style={{ marginRight: '20px', color: 'white', display: 'block' }} 
                            className={location.pathname === '/' ? 'NavigationBar__current-path' : ''} 
                            variant="text" 
                            component={RouterLink} 
                            to="/"
                            disabled = {location.pathname === '/'}
                            >
                            Convert Single Value
                        </Button>
                        <Button 
                            style={{ color: 'white', display: 'block' }} 
                            className={location.pathname === '/text-converter' ? 'NavigationBar__current-path' : ''} 
                            variant="text"
                            component={RouterLink} 
                            to="/text-converter"
                            disabled = {location.pathname === '/text-converter'}
                            >
                            Convert Text
                        </Button>
                    </Box>
                   
                </Toolbar>
            </Container>
        </AppBar>
    )
}
