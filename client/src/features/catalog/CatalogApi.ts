import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../app/models/product';

// Especificando como deve ser feita a busca
export const catalogApi = createApi({
  reducerPath: 'catalogApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api',
  }),
  endpoints: (builder) => ({
    fetchProduct: builder.query<Product[], void>({
      query: () => ({url:'product  '}),
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => `product/${productId}`, 
    }),
  }),
});
export const { useFetchProductQuery, useFetchProductDetailsQuery } = catalogApi;