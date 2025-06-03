import ProductList from "./ProductList";
import { useFetchProductQuery } from "./CatalogApi";
import { Grid } from "@mui/material";
import Filters from "./Filters";

export default function Catalog() {
  const { data, isLoading } = useFetchProductQuery();

  if (isLoading || !data) return <div>calma! Nasceu de 7 meses?</div>

  return (
    <Grid container spacing={6}>
      <Grid size={3}>
        <Filters />
      </Grid>
      <Grid size={9}>
        <ProductList products={data} addProduct={function (): void {
          throw new Error("Function not implemented.");
        }} />
      </Grid>
    </Grid>
  )
}
