import { configureStore, combineReducers } from "@reduxjs/toolkit";

import getIngredients from "./reducers/HomeReducers/getIngredients.js";
import ingredientDetails from "./reducers/HomeReducers/ingredientDetails.js";
import burgerConstructor from "./reducers/HomeReducers/burgerConstructor.js";
import orderRequestSlice from "./reducers/HomeReducers/orderThunk.js";

import registerSlice from "./reducers/RegisterReducers/registerReducer";
import loginSlice from "./reducers/LoginReducer/loginReducer";
import resetSlice from "./reducers/ResetReducers/resetReducer";
import userDataSlice from "./reducers/UserDataReducer/userDataSlice.js";
import logoutSlice from "./reducers/logoutReducer/logoutReducer.js";
import feedSlice from "./reducers/feedReducer/feedReducer";

import { wsActions } from "./reducers/feedReducer/feedReducer";
import { socketMiddleware } from "../middleware/wsMiddleware.js";

const rootReducer = combineReducers({
  getIngredients: getIngredients,
  ingredientDetails: ingredientDetails,
  burgerConstructor: burgerConstructor,
  orderRequestSlice: orderRequestSlice,
  registerSlice: registerSlice,
  loginSlice: loginSlice,
  resetSlice: resetSlice,
  userDataSlice: userDataSlice,
  logoutSlice: logoutSlice,
  feedSlice: feedSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});
