import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { User } from "../../app/models/user";
import { loginSchema } from "../../lib/schemas/loginSchema";
import { useNavigate } from "react-router-dom";

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['UserInfo'], 
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
      query: (creds) => {
        return{
        url: 'account/register',
        method: 'POST',
        body: creds
      }}
    }),
    userInfo: builder.query<User, void>({
      query: () => 'account/user-info',
      
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'account/logout',
        method: 'POST'
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(accountApi.util.invalidateTags(['UserInfo']));
        useNavigate('/');
      }
      
    })
  })
});
export const { useLoginMutation, useRegisterMutation, 
  useLogoutMutation, useUserInfoQuery } = accountApi;