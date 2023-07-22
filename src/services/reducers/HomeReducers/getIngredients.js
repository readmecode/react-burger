import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../../utils/Api";
import { reqRes } from "../../../utils/Api";
import { TGetIngredientsState } from "../../../utils/types/type";

export const getDataIngredients = createAsyncThunk(
  "data/getDataIngredients",
  async() => {
    return fetch(`${apiUrl}/ingredients`)
    .then(res => reqRes(res))
  }
)

const initialState: TGetIngredientsState =  {
  data: [],
  success: false,
}

const getIngredients = createSlice({
  name: "getIngredients",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataIngredients.pending, (state) => {
        state.success = false
      })
      .addCase(getDataIngredients.fulfilled, (state, action) => {
        console.log(action.payload)
        state.success = true
        state.data = action.payload.data
      })
      .addCase(getDataIngredients.rejected, (state) => {
        state.success = false
      })
  }
})

export default getIngredients.reducer