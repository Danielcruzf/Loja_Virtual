import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Box, Container, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState(false); 

// Estado para alternar entre claro e escuro
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212":"#eaeaea", // Cor de fundo personalizada
      },
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode); // Alterna o estado entre claro e escuro
  };

  useEffect(() => {
    fetch("https://localhost:5001/api/product")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Garante que o tema seja aplicado globalmente */}
      <NavBar onThemeChange={handleThemeChange} darkMode={darkMode} /> {/* Passa a função de alternância */}
      <Box sx={{ minHeight: "100vh", background: darkMode ? 'radial-gradient(circle,rgb(188, 193, 213)),rgb(195, 201, 208))':
        'radial-gradient(circle,rgb(200, 194, 216),rgb(33, 10, 148))', marginTop: 0, padding: 1, 
      }} >
        <Container maxWidth="xl" sx={{ marginTop: 2 }}>
          <Catalog products={products} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;