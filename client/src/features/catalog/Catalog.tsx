import { Product } from "../../app/models/product"
import { Button } from "@mui/material"


type Props = {
  products: Product[];
  addProduct: () => void;
}

export default function Catalog({products, addProduct} : Props) {

  return (
    <>
    <ul>
      {products.map(item => (
          <li key={item.id}>{item.name} - {item.price}</li>
          ))}
      </ ul>
      <Button variant="contained" onClick={addProduct}>Adicionar produto</Button>

    </>
  )
}
