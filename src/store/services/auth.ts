"use client";
import { authEndpoint } from "@/services/endpoint";
import { api } from "./base";

export const authAPI = api.injectEndpoints({
  endpoints: (build) => ({

    signIn: build.mutation({
      query: (data: {
        email: string;
        password: string;
      }) => ({
        url: authEndpoint.SIGN_IN,
        method: "POST",
        body: data,
        flashError: true,
      }),
    }),

    verify: build.mutation({
      query: (data) => ({
        url: authEndpoint.VERIFY,
        body: data,
        method: "GET",
        flashError: true,
      }),
    })

  }),
});

export const {
  useSignInMutation,
  useVerifyMutation
} = authAPI;
