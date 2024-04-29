import GitHubIcon from '@mui/icons-material/GitHub'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const Root: FC = () => {
  return (
    <main>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar
            disableGutters
            sx={{ justifyContent: 'space-between', position: 'relative' }}
          >
            <Typography component="h1" variant="h5">
              Lorca<strong>RE</strong>na
            </Typography>
            <Box>
              <IconButton
                component={Link}
                href="https://github.com/zyle87/lorcarena"
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md">
        <Outlet />
      </Container>
    </main>
  )
}

export default Root
