import { createApi } from '@reduxjs/toolkit/query/react';
import { Product } from '../../app/models/product';
import { baseQueryWithErrorHandling } from '../../app/api/baseApi';
import { ProductParams } from '../../app/models/productParams';
import { filterEmptyValues } from '../../lib/util';
import { Pagination } from '../../app/models/pagination';

// Defina a interface para o retorno dos filtros
interface FiltersResponse {
    brands: string[];
    types: string[];
    [key: string]: unknown; // permite propriedades extras, se necessário
}

// Especificando como deve ser feita a busca
export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchProduct: builder.query<{ items: Product[]; pagination: Pagination }, ProductParams>({
      query: (productParams) => ({
        url: 'product',
        params: filterEmptyValues(productParams),
      }),
      transformResponse: (items: Product[], meta) => {
        const paginationHeader = meta?.response?.headers.get('pagination');
        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
        return { items, pagination };
      },
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => `product/${productId}`,
    }),
    fetchFilters: builder.query<FiltersResponse, void>({
      query: () => 'product/filters',
    }),
  }),
});

export const { useFetchProductQuery, useFetchProductDetailsQuery, useFetchFiltersQuery } = catalogApi;