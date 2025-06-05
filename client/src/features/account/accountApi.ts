import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { User } from "../../app/models/user";
import { loginSchema } from "../../lib/schemas/loginSchema";
import { Router } from "react-router-dom";


export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['UserInfo'], // Corrigido: era tagType e o nome da tag estava errado
  endpoints: (builder) => ({
    login: builder.mutation<void, loginSchema>({
      query: (creds) => ({
        url: 'login?useCookies=true',
        method: 'POST',
        body: creds
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(accountApi.util.invalidateTags(['UserInfo']))
        } catch (error) {
          console.log(error);
        }
      }
    }),
    register: builder.mutation<void, object>({
      query: (creds) => ({
        url: 'account/register',
        method: 'POST',
        body: creds
      })
    }),
    userInfo: builder.query<User, void>({
      query: () => 'account/user-info',
      providesTags: ['UserInfo'] // Corrigido: vírgula e nome da tag
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'account/logout',
        method: 'POST'
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(accountApi.util.invalidateTags(['UserInfo']));
        Router.navigate('/');
      }
    })
  })
});
export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useUserInfoQuery } = accountApi;