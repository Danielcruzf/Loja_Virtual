import { useEffect, useState } from "react";
import { Product } from "../models/product";  
import Catalog from "../../features/catalog/Catalog"; 
import { Typography } from "@mui/material"; 
import { Container } from "@mui/material";  
function App() 
{
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('https://localhost:5001/api/product')
      .then((response) => response.json())
      .then((data) => setProducts(data));

  });
  const addProduct = () => {
    setProducts(prevState => [...prevState,
    {
      id: prevState.length + 1,
      name: 'product ' + (prevState.length + 1),
      price: (prevState.length * 100) + 100, quantityInStock: 100,
      description: 'teste',
      pictureUrl: 'https://picsum.photo/200',
      type: 'teste',
      brand: 'teste'

    }])
  }

  return (

    <Container maxWidth="lg">
      <Typography variant="h2">
        Catalog
      </Typography>
      <Catalog products={products} addProduct={addProduct} />
    </Container>
  )
}
export default App;



