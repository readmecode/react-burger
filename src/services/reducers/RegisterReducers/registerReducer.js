import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl, reqRes } from "../../../utils/Api";

export const registerThunk = createAsyncThunk(
  "regData/registerThunk",
  async ({ password, email, name }) => {
    return fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then((res) => reqRes(res))
      .catch((err) => {
        throw new Error(err);
      });
  }
);

const registerSlice = createSlice({
  name: "registerSlice",
  initialState: {
    storage: null,
    error: null,
    resolve: null,
    data: {},
  },
  extraReducers(builder) {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.error = null;
        state.resolve = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.error = null;
        state.resolve = true;
        state.data = action.payload;
      })
      .addCase(registerThunk.rejected, (state) => {
        state.error = "error ...";
        state.resolve = false;
      });
  },
});

export default registerSlice.reducer;
