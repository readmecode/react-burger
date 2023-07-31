import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    data: [],
    dataImages: [],
    total: null,
    totalToday: null,
    success: false,
    time: "",
  },
  reducers: {
    connStart: () => {
      return undefined;
    },
    connSuccess: (state) => {
      state.success = true;
    },
    connClosed: (state) => {
      state.success = false;
    },
    connError: (state) => {
      state.success = false;
    },
    getMsg: (state, action) => {
      const { orders, total, totalToday } = action.payload;
      state.data = orders;
      state.dataImages = orders;
      state.total = total;
      state.totalToday = totalToday;
    },
  },
});

export const { connStart, connSuccess, connError, connClosed, getMsg } =
  feedSlice.actions;

export const wsActions = {
  wsInit: connStart.type,
  onOpen: connSuccess.type,
  onClose: connClosed.type,
  onError: connError.type,
  onMessage: getMsg.type,
};
export default feedSlice.reducer;
