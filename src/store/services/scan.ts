"use client";
import { authEndpoint, scanEndpoint } from "@/services/endpoint";
import { api } from "./base";
import { method } from "lodash";

export const authAPI = api.injectEndpoints({
  endpoints: (build) => ({

    allOnUser: build.query<any, {
      search: string, limit: number | undefined
    }>({
        query: (params) => ({
          url: scanEndpoint.ALL,
          params: params,
          method: "GET",
          flashError: true,
        }),
      }),

    scan: build.mutation({
        query: (body: {
            data: string;
        }) => ({
            url: scanEndpoint.SCAN,
            method: "POST",
            body: body,
            flashError: true
        })
    })

  }),
});

export const {
 useAllOnUserQuery,
 useScanMutation
} = authAPI;
