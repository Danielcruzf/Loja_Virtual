import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Box, Container, createTheme } from "@mui/material";


function App() {
  const darkMode = false;
  const palleteType = darkMode ? "dark" : "light"
  const theme = createTheme(
    {
      palette:
      {
        mode: palleteType,
        background:
        {
          default: (palleteType === "light") ? "#eaeaea" : "#121212",
        }
      }
    }
}

useEffect(() => {
  fetch("https://localhost:5001/api/product")
    .then((response) => response.json())
    .then((data) => setProducts(data));
}, []);

return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <NavBar />
    <Box sx={{
      minHeight: "100vh",
      background: darkMode ?
        'radial-gradient(circle,rgb(188, 193, 213)),rgb(195, 201, 208))' :
        'radial-gradient(circle,rgb(200, 194, 216),rgb(33, 10, 148))', py:6
    }} >
      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Catalog products={products} />
      </Container>
    </Box>
  </ThemeProvider>
)


export default App;