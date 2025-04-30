import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  
  useEffect(() => {
    fetch('https://localhost:5001/api/product')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []); 

  
  const addProduct = () => {
    setProducts(prevState => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: 'product ' + (prevState.length + 1),
        price: (prevState.length * 100) + 100,
        quantityInStock: 100,
        description: 'teste',
        pictureUrl: 'https://picsum.photos/200', 
        type: 'teste',
        brand: 'teste'
      }
    ]);
  };

  return (
    <div>
      <h1 style={{ color: 'red' }}>Re-store</h1>
      <Catalog products={products} addProduct={addProduct} />
    </div>
  );
}

export default App;