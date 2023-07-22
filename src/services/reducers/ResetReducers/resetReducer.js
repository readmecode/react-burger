import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl, reqRes } from "../../../utils/Api";
import { TDataString } from "../../../utils/types/type";
import { TResetData } from "../../../utils/types/type";

export const forgotPasswordThunk = createAsyncThunk(
  "password/forgotPasswordThunk",
  async({email}: TDataString) => {
    return fetch(`${apiUrl}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email
      })
    })
    .then(res => reqRes(res))
  }
)

export const resetPasswordThunk = createAsyncThunk(
  "data/forgotPasswordThunk",
  async({password, token}: TDataString) => {
    return fetch(`${apiUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: token
      })
    })
    .then(res => reqRes(res))
  }
)

const initialState: TResetData = {
  successTrue: null,
  resultData: null,
  error: null,
  resolve: null
}

const resetSlice = createSlice({
  name: "resetSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.resolve = false
        state.error = false
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.resolve = true
        state.error = false
        state.successTrue = action.payload.success
      })
      .addCase(forgotPasswordThunk.rejected, (state) => {
        state.resolve = false
        state.error = false
      })
      .addCase(resetPasswordThunk.pending, (state) => {
        state.resolve = false
        state.error = false
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.resolve = true
        state.error = false
        state.resultData = action.payload
      })
      .addCase(resetPasswordThunk.rejected, (state) => {
        state.resolve = false
        state.error = false
      })
  }
})

export default resetSlice.reducer