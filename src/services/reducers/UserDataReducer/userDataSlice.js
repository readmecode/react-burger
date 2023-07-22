import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl, reqRes } from "../../../utils/Api";
import { getCookie } from "../../../utils/Cookies";
import { TDataString, TChangeUserState } from "../../../utils/types/type";

export const changeUserDataThunk = createAsyncThunk(
  "user/changeUserDataThunk",
  async({email, name, password}: TDataString) => { 
    return fetch(`${apiUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Authorization": `Bearer ${getCookie("accessToken")?.split(" ")[1]}`,
      },
      body: JSON.stringify({
        "email": email,
        "name": name,
        "password": password
      })
    })
    .then(res => reqRes(res))
  }
)

const initialState: TChangeUserState = {
  data: null,
  error: null,
  resolve: null
}

const userDataSlice = createSlice({
  name: "userDataSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeUserDataThunk.pending, (state) => {
        state.error = null
        state.resolve = null
      })
      .addCase(changeUserDataThunk.fulfilled, (state, action) => {
        state.error = false
        state.resolve = true
        state.data = action.payload
      })
      .addCase(changeUserDataThunk.rejected, (state) => {
        state.error = true
        state.resolve = false
      })
  }
})

export default userDataSlice.reducer