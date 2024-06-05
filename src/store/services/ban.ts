"use client";
import { authEndpoint, banEndpoint } from "@/services/endpoint";
import { api } from "./base";

export const authAPI = api.injectEndpoints({
  endpoints: (build) => ({
    allBan: build.query<any, any>({
      query: (params) => ({
        url: banEndpoint.ALL,
        params: params,
        method: "GET",
        flashError: true,
      }),
    }),
    edit: build.mutation({
      query: (data) => ({
        url: banEndpoint.EDIT,
        body: data,
        method: "PATCH",
        flashError: true,
      }),
    }),
    create: build.mutation({
      query: (data) => ({
        url: banEndpoint.CREATE,
        body: data,
        method: "POST",
        flashError: true,
      }),
    }),
    deleteBanById: build.mutation({
      query: (params) => ({
        url: banEndpoint.DELETE.replace("{:id}", params),
        method: "DELETE",
        flashError: true,
      }),
    }),
  }),
});

export const {
    useAllBanQuery, 
    useCreateMutation,
    useDeleteBanByIdMutation, 
    useEditMutation,
} = authAPI;
