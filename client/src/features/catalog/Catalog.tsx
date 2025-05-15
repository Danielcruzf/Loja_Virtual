import ProductList from "./ProductList";
import { useFetchProductQuery } from "./CatalogApi";

export default function Catalog() {
  const{data, isLoading}=useFetchProductQuery();
  if(isLoading||!data) return <div>calma! Nasceu de 7 meses?</div>

  return (
    <>
      <ProductList products={data} addProduct={function (): void {
        throw new Error("Function not implemented.");
      }}/>
    </>
  )
}
