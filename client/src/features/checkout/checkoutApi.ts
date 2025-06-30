import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Basket } from "../../app/models/basket";
import { basketApi } from "../basket/basketApi";

export const checkoutApi = createApi({
  reducerPath: 'checkoutApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<Basket, void>({
      query: () => {
        return {
          url: "/payments",
          method: "POST"
        }
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled; // Supondo que a resposta seja do tipo Cesta
          dispatch(
            basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
                draft.clientSecret = data.clientSecret; // Atualize o clientSecret conforme necessário
                //draft.items = data.items; // Atualize os itens da cesta conforme necessário
            })
          );
        } catch (error) {
          console.log('Payment intent creatio failed:', error);// Trate o erro conforme necessário
        }
      }
    })
  }) 
});

export const { useCreatePaymentIntentMutation } = checkoutApi;
