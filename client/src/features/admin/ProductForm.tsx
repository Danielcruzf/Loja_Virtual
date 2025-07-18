import { useForm} from 'react-hook-form';
import {CreateProductSchema, createProductSchema} from "../../lib/schemas/createProductSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import AppTextInput from '../../app/shared/componets/AppTextInput';
import { useFetchFiltersQuery } from '../catalog/CatalogApi';
import AppSelectInput from '../../app/shared/componets/AppSelectInput';

export default function ProductForm() {
  const { control, handleSubmit } = useForm<CreateProductSchema>({
    mode: "onTouched",
    resolver: zodResolver(createProductSchema),
});
const {data}= useFetchFiltersQuery();
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
        <Grid size={12}>
          <AppTextInput control={control} name="file" label="Image" />
        </Grid>

        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button variant="contained" color="inherit">
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
