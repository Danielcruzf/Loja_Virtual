import ProductList from "./ProductList";
import { useFetchProductQuery } from "./CatalogApi";
import { Grid } from "@mui/material";
import Filters from "./Filters";
import { useAppSelector } from "../../app/store/Stores";

export default function Catalog() {
  const productParams=useAppSelector(state=>state.catalog);
  const { data, isLoading } = useFetchProductQuery(productParams);

  if (isLoading || !data) return <div>calma! Nasceu de 7 meses?</div>

  return (
    <Grid container spacing={6}>
      <Grid size={3}>
        <Filters />
      </Grid>
      <Grid size={9}>
        <ProductList products={data.items} addProduct={function (): void {
          throw new Error("Function not implemented.");
        } } />
        
      </Grid>
    </Grid>
  )
}
