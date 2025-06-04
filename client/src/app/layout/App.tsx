import { Box, Container, CssBaseline,ThemeProvider, createTheme } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useAppSelector } from "../store/Stores";

function App() {
  const {darkMode}=useAppSelector(state => state.ui)
const palleteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  })
    return (
    <ThemeProvider theme={theme}>
      <ScrollRestoration/>
      <CssBaseline />
      <NavBar/>
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode ? 'radial-gradient(circle, #1e3aBa, #111B27)' : 'radial-gradient(circle, #baecf9, #f0f9ff)',
        py: 2
        
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 12 }}>
          <Outlet />
        </Container>
      </Box>
  </ThemeProvider> 
  )
}

export default App;