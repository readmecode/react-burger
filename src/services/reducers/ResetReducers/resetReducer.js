import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl, reqRes } from "../../../utils/Api";

export const forgotPasswordThunk = createAsyncThunk(
  "password/forgotPasswordThunk",
  async ({ email }) => {
    return fetch(`${apiUrl}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => reqRes(res))
      .catch((err) => {
        throw new Error(err);
      });
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "data/forgotPasswordThunk",
  async ({ password, token }) => {
    return fetch(`${apiUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    })
      .then((res) => reqRes(res))
      .catch((err) => {
        throw new Error(err);
      });
  }
);

const resetSlice = createSlice({
  name: "resetSlice",
  initialState: {
    successTrue: {},
    resultData: {},
    error: null,
    resolve: null,
  },
  extraReducers: (build) => {
    build
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.resolve = false;
        state.error = false;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.resolve = true;
        state.error = false;
        state.successTrue = action.payload.success;
      })
      .addCase(forgotPasswordThunk.rejected, (state) => {
        state.resolve = false;
        state.error = false;
      })
      .addCase(resetPasswordThunk.pending, (state) => {
        state.resolve = false;
        state.error = false;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.resolve = true;
        state.error = false;
        state.resultData = action.payload;
      })
      .addCase(resetPasswordThunk.rejected, (state) => {
        state.resolve = false;
        state.error = false;
      });
  },
});

export default resetSlice.reducer;
