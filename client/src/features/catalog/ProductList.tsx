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
      {products.map(product => (
        <Grid size={3} display='flex'>
        <ProductCard key={product.id} product={product}/>
        </Grid>
        ))}
    </Grid>
  )
}