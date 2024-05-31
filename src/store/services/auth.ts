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

  }),
});

export const {
  useSignInMutation,
} = authAPI;
