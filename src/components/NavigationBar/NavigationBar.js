import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'


export default function NavigationBar() {
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
                        <Button style={{ marginRight: '20px', color: 'white', display: 'block' }} variant="text" component={RouterLink} to="/">
                            Convert Single Value
                        </Button>
                        <Button style={{ color: 'white', display: 'block' }} variant="text" component={RouterLink} to="/text-converter">
                            Convert Text
                        </Button>
                    </Box>
                   
                </Toolbar>
            </Container>
        </AppBar>
    )
}
