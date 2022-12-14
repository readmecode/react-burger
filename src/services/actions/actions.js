import { BURGER_API, checkRes } from "../../utils/burger-api";

export const GET_INGRS = "GET_INGRS";
export const GET_INGR_ID = "GET_INGR_ID";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const GET_ITEM = "GET_ITEM";
export const GET_INGR_DATA = "GET_INGR_DATA";
export const GET_ORDER_ID = "GET_ORDER_ID";
export const GET_ORDER_TOTAL = "GET_ORDER_TOTAL";
export const SORT_INGRS = "SORT_INGRS";
export const GET_BUN = "GET_BUN";

export const getIngredients = (payload) => {
  return {
    type: GET_INGRS,
    payload,
  };
};

export const getData = () => {
  return function (dispatch) {
    fetch(`${BURGER_API}/ingredients`)
      .then(checkRes)
      .then((res) => dispatch(getIngredients(res.data)))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addItemConstr = (payload) => {
  return {
    type: GET_ITEM,
    payload,
  };
};

export const removeItemConstr = (payload) => {
  return {
    type: REMOVE_ITEM,
    payload,
  };
};

export const getIngrData = (payload) => {
  return {
    type: GET_INGR_DATA,
    payload,
  };
};

export const getIngrId = (payload) => {
  return {
    type: GET_INGR_ID,
    payload,
  };
};

export const getOrderId = (payload) => {
  return {
    type: GET_ORDER_ID,
    payload,
  };
};

export const getOrderTotal = (payload) => {
  return {
    type: GET_ORDER_TOTAL,
    payload,
  };
};

export const getBun = (payload) => {
  return {
    type: GET_BUN,
    payload,
  };
};

export const sortIngrs = (payload) => {
  return {
    type: SORT_INGRS,
    payload,
  };
};