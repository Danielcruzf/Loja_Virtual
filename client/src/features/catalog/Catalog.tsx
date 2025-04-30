import { Product } from "../../app/models/product"
import ProductList from "./productList";


type Props = {
  products: Product[];
  
  
}

export default function Catalog({products} : Props) {

  return (
    <>
    <ProductList products={products} addProduct={function (): void {
        throw new Error("Function not implemented.")
        // function implemntada para retirar erro de compilação
      } }/>
       

    </>
  )
}
