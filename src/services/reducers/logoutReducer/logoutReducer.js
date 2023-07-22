import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl, reqRes } from "../../../utils/Api";
import { getCookie } from "../../../utils/Cookies";
import { TLogout } from "../../../utils/types/type";

export const logoutThunk = createAsyncThunk(
  "logout/logoutThunk",
  async() => {
    return fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("refreshToken")
      })
    })
    .then(res => reqRes(res))
  }
)

const initialState: TLogout= {
  success: false,
  resolve: "",
  data: null
}

const logoutSlice = createSlice({
  name: "logoutSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.success = false
        state.resolve =  "pending ..."
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.success = true
        state.resolve =  "fulfilled"
        state.data = action.payload
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.success = false
        state.resolve =  "rejected"
      })
  }
})

export default logoutSlice.reducer