import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/800.css'
import GitHubIcon from '@mui/icons-material/GitHub'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index.tsx'
import { store } from './store'
import { theme } from './theme/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar
            disableGutters
            sx={{ justifyContent: 'space-between', position: 'relative' }}
          >
            <Typography component="h1" variant="h5">
              LorcaREna
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
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  </Provider>
)
