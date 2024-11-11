import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./_index.base";
import { User } from "@prisma/client";
import { loginProp, userBody } from "@/general-types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<User, userBody>({
      query: (body) => ({
        method: "POST",
        url: `/register`,
        body,
      }),
    }),
    verifyOtp: builder.mutation<User, string>({
      query: (body) => ({
        method: "POST",
        url: `/verify-otp`,
        body,
      }),
    }),
    login: builder.mutation<User, loginProp>({
      query: (body) => ({
        method: "POST",
        url: "/login",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useVerifyOtpMutation, useLoginMutation } =
  apiSlice;
