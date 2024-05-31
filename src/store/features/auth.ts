import { createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../services/auth";
import webStorageClient from "@/utils/webStorageClient";
import { constants } from "@/settings";

const isAuthFromClientStorage = webStorageClient.get(constants.IS_AUTH);
export interface IAuth {
  isAuth: boolean;
  //todo
}
const initialState: IAuth = {
  isAuth: isAuthFromClientStorage || false,
};
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    builder
      .addMatcher(authAPI.endpoints.signIn.matchPending, () => {
       
      })
      .addMatcher(authAPI.endpoints.signIn.matchFulfilled, (state, action) => {
       
        webStorageClient.setToken(action?.payload?.data?.token);

      })
      .addMatcher(authAPI.endpoints.signIn.matchRejected, (state) => {
        webStorageClient.removeAll();
        state.isAuth = false;
      });
  },
});
export const {
  //todo add reducer in need
} = slice.actions;
export default slice.reducer;
