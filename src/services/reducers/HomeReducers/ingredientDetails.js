import { createSlice } from "@reduxjs/toolkit";

const ingredientDetails = createSlice({
  name: "ingredientDetails",
  initialState: {
    detailsArr: [],
    modalState: true,
  },
  reducers: {
    getIngDetails: (state, action) => {
      state.detailsArr = action.payload;
    },
    changeStateModal: (state, action) => {
      state.modalState = action.payload;
    },
  },
});

export const { getIngDetails, changeStateModal } = ingredientDetails.actions;
export default ingredientDetails.reducer;
