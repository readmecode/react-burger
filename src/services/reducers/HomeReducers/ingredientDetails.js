import { createSlice } from "@reduxjs/toolkit";
import { TIngredientDetails } from "../../../utils/types/type";

const initialState: TIngredientDetails = {
  detailsArr: [],
  modalState: false,
}

const ingredientDetails = createSlice({
  name: "ingredientDetails",
  initialState: initialState,
  reducers: {
    getIngDetails: (state, action) => {
      state.detailsArr = action.payload
    },
    changeStateModal: (state, action) => {
      state.modalState = action.payload
    },
  
  }
})

export const { getIngDetails, changeStateModal,} = ingredientDetails.actions
export default ingredientDetails.reducer
