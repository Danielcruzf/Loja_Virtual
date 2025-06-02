import { Grid, Typography } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi"
import BasketItem from "./BasketItem";
import { Item } from "../../app/models/basket";
import OrderSummary from "../../app/shared/componets/OrderSummary";



export default function BasketPage() {
  const { data, isLoading } = useFetchBasketQuery();
  if (isLoading) return <Typography>Loading basket...</Typography>
  if (!data || data.items.length === 0) return <Typography variant="h3">You basket is empty</Typography>

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        {data.items.map((item: Item) => (
          <BasketItem item={item} key={item.productId} />
        ))}
      </Grid>
      <Grid size={4}><OrderSummary /></Grid>
    </Grid>
  )


} 
