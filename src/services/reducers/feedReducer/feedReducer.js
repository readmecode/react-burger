import { createSlice } from "@reduxjs/toolkit";
import { TFeedState } from "../../../utils/types/type";

const initialState: TFeedState = {
  data: [],
  url: "",
  total: null,
  totalToday: null,
  success: false,
}

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: initialState,
  reducers: {
    connStart: (state, action) => {
      state.success = false
      state.url = action.payload
    },
    connSuccess: (state) => {
      state.success = true
    },
    connClosed: (state) => {
      state.success = false
    },
    connError: (state) => {
      state.success = false
    },
    getMsg: (state, action) => {
      const { orders, total, totalToday} = action.payload

      state.data = orders
      state.total = total
      state.totalToday = totalToday
    },
  } 
})

export const {
  connStart,
  connSuccess, 
  connError, 
  connClosed, 
  getMsg
} = feedSlice.actions

export const wsActions = {
  wsInit: connStart.type,
  onOpen: connSuccess.type,
  onClose: connClosed.type,
  onError: connError.type,
  onMessage: getMsg.type
}
export default feedSlice.reducer