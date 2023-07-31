import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl, reqRes } from "../../../utils/Api";
import { getCookie } from "../../../utils/Cookies";
import fetchWithRefresh from "../../../utils/Api";

export const orderThunk = createAsyncThunk(
  "data/orderThunk",
  async (ingredArrayId, { dispatch }) => {
    return fetchWithRefresh(
      `${apiUrl}/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken").split(" ")[1]}`,
        },
        body: JSON.stringify({
          ingredients: ingredArrayId,
        }),
      },
      dispatch
    )
      .then((res) => reqRes(res))
      .catch((err) => {
        throw new Error(err);
      });
  }
);

const orderRequestSlice = createSlice({
  name: "orderRequestSlice",
  initialState: {
    idPostArr: [],
    bunArr: [],
    totalArrOrder: [],
    order: null,
    error: null,
    resolve: null,
    success: false,
  },
  reducers: {
    getIdPosts: (state, action) => {
      state.idPostArr = action.payload.map((el) => el._id);
    },
    getIdPostsBun: (state, action) => {
      state.bunArr = [action.payload];
    },
    removeIdPost: (state, action) => {
      state.idPostArr = state.idPostArr.filter((el) => el !== action.payload);
    },
    totalIdOrder: (state, action) => {
      state.totalArrOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderThunk.pending, (state) => {
        state.error = null;
        state.resolve = "pending ...";
        state.success = false;
      })
      .addCase(orderThunk.fulfilled, (state, action) => {
        state.order = action.payload.order.number;
        state.resolve = "success";
        state.error = null;
        state.success = true;
      })
      .addCase(orderThunk.rejected, (state) => {
        state.error = "rejected ...";
        state.resolve = null;
        state.success = false;
      });
  },
});

export const {
  finalIdenNum,
  getIdPosts,
  removeIdPost,
  getIdPostsBun,
  totalIdOrder,
} = orderRequestSlice.actions;

export default orderRequestSlice.reducer;
