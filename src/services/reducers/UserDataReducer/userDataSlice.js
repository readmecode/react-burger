import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../../utils/Api";
import { getCookie } from "../../../utils/Cookies";
import fetchWithRefresh from "../../../utils/Api";

export const changeUserDataThunk = createAsyncThunk(
  "user/changeUserDataThunk",
  async ({ email, name, password }, { dispatch }) => {
    return fetchWithRefresh(
      `${apiUrl}/auth/user`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${getCookie("accessToken").split(" ")[1]}`,
        },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
        }),
      },
      dispatch
    ).catch((err) => console.log(err));
  }
);

const userDataSlice = createSlice({
  name: "userDataSlice",
  initialState: {
    data: {},
    error: null,
    resolve: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeUserDataThunk.pending, (state) => {
        state.error = null;
        state.resolve = null;
      })
      .addCase(changeUserDataThunk.fulfilled, (state, action) => {
        state.error = false;
        state.resolve = true;
        state.data = action.payload;
      })
      .addCase(changeUserDataThunk.rejected, (state) => {
        state.error = true;
        state.resolve = false;
      });
  },
});

export default userDataSlice.reducer;
