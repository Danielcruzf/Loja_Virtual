import { Grid } from '@mui/material';
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
  addProduct: () => void;
}
export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={3}>
      {products.map(products => (
        <Grid size={3} display='flex' key={products.id}>
        <ProductCard  product={products}/>
        </Grid>
        ))}
    </Grid>
  )
}