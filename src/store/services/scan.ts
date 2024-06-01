"use client";
import { authEndpoint, scanEndpoint } from "@/services/endpoint";
import { api } from "./base";

export const authAPI = api.injectEndpoints({
  endpoints: (build) => ({
    allCheckin: build.query<
      any,
      {
        search: string;
        limit: number | undefined;
      }
    >({
      query: (params) => ({
        url: scanEndpoint.ALL_CHECKIN,
        params: params,
        method: "GET",
        flashError: true,
      }),
    }),
    allCheckout: build.query<
      any,
      {
        search: string;
        limit: number | undefined;
      }
    >({
      query: (params) => ({
        url: scanEndpoint.ALL_CHECKOUT,
        params: params,
        method: "GET",
        flashError: true,
      }),
    }),

    scanCheckin: build.mutation({
      query: (body: { data: string }) => ({
        url: scanEndpoint.SCAN_CHECKIN,
        method: "POST",
        body: body,
        flashError: true,
      }),
    }),
    scanCheckout: build.mutation({
      query: (body: { data: string }) => ({
        url: scanEndpoint.SCAN_CHECKOUT,
        method: "POST",
        body: body,
        flashError: true,
      }),
    }),
    getLongeastTimeOfCheckin: build.query<any, any>({
      query: () => ({
        url: scanEndpoint.SCAN_CHECKIN_LONG,
        method: "GET",
        flashError: true,
      }),
    }),
    getLongeastTimeOfCheckout: build.query<any, any>({
      query: () => ({
        url: scanEndpoint.SCAN_CHECKIN_LONG,
        method: "GET",
        flashError: true,
      }),
    }),

    downloadCheckin: build.mutation<any, {
      fromDate: string,
      toDate: string
    }>({
      query: (params) => ({
        url: scanEndpoint.SCAN_DOWNLOAD_CHECKIN,
        method: "GET",
        params: params,
        flashError: true,
      }),
    }),

    downloadCheckout: build.mutation<any, {
      fromDate: string,
      toDate: string
    }>({
      query: (params) => ({
        url: scanEndpoint.SCAN_DOWNLOAD_CHECKOUT,
        method: "GET",
        params: params,
        flashError: true,
      }),
    }),

  }),
});

export const {
  useAllCheckinQuery,
  useAllCheckoutQuery,
  useScanCheckinMutation,
  useScanCheckoutMutation,
  useGetLongeastTimeOfCheckinQuery,
  useGetLongeastTimeOfCheckoutQuery,
  useDownloadCheckinMutation,
  useDownloadCheckoutMutation
} = authAPI;
