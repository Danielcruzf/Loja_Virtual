import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../app/models/product';

// Especificando como deve ser feita a busca
export const catalogApi = createApi({
  reducerPath: 'catalogApi', // Nome do slice (ajustei para seguir boas práticas)
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api',
  }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
      query: () => ({url:'product'}), // Retorno direto, pois não há necessidade de objeto extra
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => `products/${productId}`, // Retorno direto
    }),
  }),
});

// Exportação correta dos hooks gerados pelo RTK Query
export const { useFetchProductsQuery, useFetchProductDetailsQuery } = catalogApi;