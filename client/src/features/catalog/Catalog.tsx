import ProductList from "./ProductList"; 
export default function Catalog() {
 return (
    <>
      <ProductList products={productS} addProduct={function (): void {
       throw new Error("Function not implemented.");
     } } />
    </>
  )
}
