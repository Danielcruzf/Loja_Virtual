import { createApi } from '@reduxjs/toolkit/query/react';
import { Product } from '../../app/models/product';
import { baseQueryWithErrorHandling } from '../../app/api/baseApi';

// Especificando como deve ser feita a busca
export const catalogApi = createApi({
  reducerPath: 'catalogApi', 
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchProduct: builder.query<Product[], void>({
      query: () => ({url:'product'}),
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => `product/${productId}`, 
    }),
  }),
});
export const { useFetchProductQuery, useFetchProductDetailsQuery } = catalogApi;