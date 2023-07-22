import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl, reqRes } from "../../../utils/Api";
import { getCookie, setCookie } from "../../../utils/Cookies";
import { TDataString, TLoginState } from "../../../utils/types/type";

export const loginThunk = createAsyncThunk(
  "logUser/loginThunk",
  async({email, password}: TDataString) => {
    return fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
    .then(res => reqRes(res))
  }
)

export const userAuth = createAsyncThunk(
  "user/userAuth",
  async() => {
    return fetch(`${apiUrl}/auth/user`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getCookie("accessToken")?.split(" ")[1]}`
      }
    })
    .then(res => reqRes(res))
  }
)

export const refreshTokenThunk = createAsyncThunk(
  "token/refreshTokenThunk",
  async() => {
    return fetch(`${apiUrl}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "token": `${getCookie("refreshToken")}`
      })
    })
    .then(res => {
      return res.json()
    })
  }
)

const initialState: TLoginState = {
  data: null,
  dataUser: null,
  accessToken: "",
  refreshToken: "",
  error: null,
  resolve: null,
}

const loginSlice = createSlice({
  name: "registerSlice",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.data = null
      state.dataUser = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.error = null
        state.resolve = false
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.error = null
        state.resolve = true
        state.data = action.payload
      })
      .addCase(loginThunk.rejected, (state) => {
        state.error = "error"
        state.resolve = false
      })

      .addCase(userAuth.pending, (state) => {
        state.error = null
        state.resolve = false
      })
      .addCase(userAuth.fulfilled, (state, action) => {
        state.error = null
        state.resolve = true
        state.dataUser = action.payload
      }) 
      .addCase(userAuth.rejected, (state) => {
        state.error = "error"
        state.resolve = false
      })

      .addCase(refreshTokenThunk.pending, (state) => {
        state.error = null
        state.resolve = false
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.error = null
        state.resolve = true
        state.refreshToken = setCookie("refreshToken", action.payload.refreshToken)
        state.accessToken = setCookie("accessToken", action.payload.accessToken)
      }) 
      .addCase(refreshTokenThunk.rejected, (state) => {
        state.error = "error"
        state.resolve = false
      })
  }
})

export const {logout}  = loginSlice.actions
export default loginSlice.reducer