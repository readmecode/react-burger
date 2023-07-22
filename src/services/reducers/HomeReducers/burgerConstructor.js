import { createSlice } from "@reduxjs/toolkit";
import {TburgerConstructorState, TIngredientData} from "../../../utils/types/type";

const initialState: TburgerConstructorState = {
  bunArr: [],
  constructorArr: [],
  price: 0,
}

const burgerConstructor = createSlice({
  name: "burgerConstructor",
  initialState: initialState,
  reducers: {
    getConstructorElements: (state, action) => {
      state.constructorArr = [...state.constructorArr, action.payload]
    },
    getConstructorBuns: (state, action) => {
      state.bunArr = action.payload
    },
    getTotalPrice: (state) => {
      state.price = state.constructorArr.reduce((prev: number, curr: TIngredientData) => curr.type === "bun" ? (prev + curr.price) : prev + curr.price, 0)
    },
    removeConstructorElement: (state, action) => {
      state.constructorArr = state.constructorArr.filter((el: TIngredientData) => el.id !== action.payload)
    },
    sortingConstructorElements: (state, action) => {
      state.constructorArr = action.payload
    }
  }
})
export const {
  getConstructorElements,
  getConstructorBuns,
  getTotalPrice,
  removeConstructorElement,
  sortingConstructorElements
  } = burgerConstructor.actions
export default burgerConstructor.reducer