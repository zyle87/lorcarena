import GitHubIcon from '@mui/icons-material/GitHub'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import MUILink from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import packageJson from '../../package.json'

const Root: FC = () => {
  return (
    <main>
      <AppBar>
        <Container maxWidth="md">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Link to="/#" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Typography component="h1" variant="h5">
                Lorca<strong>RE</strong>na
              </Typography>
            </Link>
            <Box>
              <IconButton
                component={MUILink}
                href="https://github.com/zyle87/lorcarena"
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 12 }}>
        <Outlet />
        <Typography align="center" color="textSecondary" variant="body2" my={2}>
          Version {packageJson.version}
        </Typography>
      </Container>
    </main>
  )
}

export default Root
