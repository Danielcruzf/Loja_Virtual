import {useForm} from 'react-hook-form';
import {CreateProductSchema, createProductSchema} from "../../lib/schemas/createProductSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import AppTextInput from '../../app/shared/componets/AppTextInput';
import { useFetchFiltersQuery } from '../catalog/CatalogApi';
import AppSelectInput from '../../app/shared/componets/AppSelectInput';
import AppDropzone from '../../app/shared/componets/AppDropzone';
import { Product } from '../../app/models/product';
import { useEffect } from 'react';

type Props = {
  setEditMode: (value: boolean) => void;
  product: Product | null;
};


export default function ProductForm({setEditMode, product}: Props) {
  const { control, handleSubmit, watch, reset} = useForm<CreateProductSchema>({
    mode: "onTouched",
    resolver: zodResolver(createProductSchema),
});
  const watchFile = watch('file');
  
const {data}= useFetchFiltersQuery();

useEffect(() => {
  if (product) reset(product);
}, [product, reset]);

  const onSubmit = (data: CreateProductSchema) => {
    console.log(data);
  };

  return (
    <Box component={Paper} sx={{ p: 4, maxWidth: "lg", mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Product details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <AppTextInput control={control} name="name" label="Product name" />
          </Grid>
          <Grid size={6}>
            {data?.brands && (
              <AppSelectInput
                items={data.brands}
                control={control}
                name="brand"
                label="Brand"
              />
            )}
          </Grid>
          <Grid size={6}>
            {data?.brands && (
              <AppSelectInput
                items={data.types}
                control={control}
                name="type"
                label="Type"
              />
            )}
          </Grid>
          <Grid size={6}>
            <AppTextInput control={control} name="type" label="Type" />
          </Grid>
          <Grid size={6}>
            <AppTextInput
              type="number"
              control={control}
              name="price"
              label="Price in cents"
            />
          </Grid>
          <Grid size={6}>
            <AppTextInput
              type="number"
              control={control}
              name="quantityInStock"
              label="Quantity in Stock"
            />
          </Grid>
          <Grid size={12}>
            <AppTextInput
              control={control}
              multiline
              rows={4}
              name="description"
              label="Description"
            />
          </Grid>
        </Grid>
        <Grid size={12} display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <AppDropzone name='file' control={control}/>
          {watchFile ? (
            <img
              src={watchFile.preview}
              alt="Preview of image"
              style={{ width: 200, height: 200, objectFit: 'cover' }}
            />
          ):(
            <img src={product?.pictureUrl} alt="Preview of image" style={{ maxWidth: 200}}/> 
          )}
        </Grid>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button onClick={() => setEditMode(false)} variant="contained" color="inherit">
            Cancel
          </Button>
          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );

}
