import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const burgerConstructor = createSlice({
  name: "burgerConstructor",
  initialState: {
    bunArr: [],
    constructorArr: [],
    price: 0,
  },
  reducers: {
    getConstructorElements: (state, action) => {
      state.constructorArr = [
        ...state.constructorArr,
        { ...action.payload, id: uuidv4() },
      ];
    },
    getConstructorBuns: (state, action) => {
      state.bunArr = action.payload;
    },
    getTotalPrice: (state) => {
      state.price = state.constructorArr.reduce(
        (prev, curr) =>
          curr.type === "bun" ? prev + curr.price : prev + curr.price,
        0
      );
    },
    removeConstructorElement: (state, action) => {
      state.constructorArr = state.constructorArr.filter(
        (el) => el.id !== action.payload
      );
    },
    sortingConstructorElements: (state, action) => {
      state.constructorArr = action.payload;
    },
  },
});
export const {
  getConstructorElements,
  getConstructorBuns,
  getTotalPrice,
  removeConstructorElement,
  sortingConstructorElements,
} = burgerConstructor.actions;
export default burgerConstructor.reducer;
