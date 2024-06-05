"use client";
import { authEndpoint, banEndpoint, banManagerEndpoint } from "@/services/endpoint";
import { api } from "./base";

export const authAPI = api.injectEndpoints({
  endpoints: (build) => ({
    allBanManager: build.query<any, any>({
      query: (params) => ({
        url: banManagerEndpoint.ALL,
        params: params,
        method: "GET",
        flashError: true,
      }),
    }),
    allBanManagerByBanId: build.query<any, any>({
        query: (params) => ({
          url: banManagerEndpoint.ALL_BY_BANID.replace("{:id}", params),
          method: "GET",
          flashError: true,
        }),
      }),
    editManager: build.mutation({
      query: (data) => ({
        url: banManagerEndpoint.EDIT,
        body: data,
        method: "PATCH",
        flashError: true,
      }),
    }),
    createManager: build.mutation({
      query: (data) => ({
        url: banManagerEndpoint.CREATE,
        body: data,
        method: "POST",
        flashError: true,
      }),
    }),
    deleteBanManagerById: build.mutation({
      query: (params) => ({
        url: banManagerEndpoint.DELETE.replace("{:id}", params),
        method: "DELETE",
        flashError: true,
      }),
    }),
  }),
});

export const {
    useAllBanManagerQuery,
    useCreateManagerMutation,
    useDeleteBanManagerByIdMutation,
    useEditManagerMutation,
    useAllBanManagerByBanIdQuery
} = authAPI;
