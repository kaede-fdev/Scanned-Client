import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../services/auth";
import webStorageClient from "@/utils/webStorageClient";
import { constants } from "@/settings";

type UserInfo = {
  id: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  avatar: string | null;
}

const isAuthFromClientStorage = webStorageClient.get(constants.IS_AUTH);
export interface IAuth {
  isAuth: boolean;
  userInfo: UserInfo
}
const initialState: IAuth = {
  isAuth: isAuthFromClientStorage || false,
  userInfo: {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    avatar: null,
  },
};
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    assignUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    applyChangeAvatar: (state, action: PayloadAction<string>) => {
      state.userInfo.avatar = action.payload;
    },
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
  applyChangeAvatar,
  assignUserInfo
} = slice.actions;
export default slice.reducer;
