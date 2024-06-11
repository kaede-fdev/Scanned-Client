"use client";
import { authEndpoint, userEnpoint } from "@/services/endpoint";
import { api } from "./base";

export const authAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query<
      any,
      {
        search: string | undefined;
        limit: number | undefined;
      }
    >({
      query: (params) => ({
        url: userEnpoint.ALL,
        params: params,
        method: "GET",
        flashError: true,
      }),
    }),
    createUser: build.mutation({
      query: (body: any) => ({
        url: userEnpoint.CREATE_NEW,
        body: body,
        method: "POST",
        flashError: true,
      }),
    }),
    editUser: build.mutation({
      query: (body: any) => ({
        url: userEnpoint.EDIT_USER,
        body: body,
        method: "PATCH",
        flashError: true,
      }),
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: userEnpoint.CHANGE_PASSWORD,
        body: data,
        method: "PATCH",
        flashError: true,
      }),
    }),
    deleteById: build.mutation({
      query: (params: string) => ({
        url: userEnpoint.DELETE_BY_ID.replace("{:id}", params),
        method: "DELETE",
        flashError: true,
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteByIdMutation,
  useChangePasswordMutation
} = authAPI;
