import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../../utils/Api";
import { reqRes } from "../../../utils/Api";

export const getDataIngredients = createAsyncThunk(
  "data/getDataIngredients",
  async () => {
    return fetch(`${apiUrl}/ingredients`)
      .then((res) => reqRes(res))
      .catch((err) => {
        throw new Error(err);
      });
  }
);

const getIngredients = createSlice({
  name: "getIngredients",
  initialState: {
    data: [],
    success: false,
    error: null,
    pending: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataIngredients.pending, (state) => {
        state.error = null;
        state.success = false;
        state.pending = "pending ...";
      })
      .addCase(getDataIngredients.fulfilled, (state, action) => {
        state.error = null;
        state.success = true;
        state.pending = "resolve";
        state.data = action.payload;
      })
      .addCase(getDataIngredients.rejected, (state) => {
        state.error = "null";
        state.pending = null;
        state.success = false;
      });
  },
});

export default getIngredients.reducer;
