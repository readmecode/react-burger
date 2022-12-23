import { combineReducers } from "redux";

import {
  GET_INGRS,
  GET_INGR_ID,
  REMOVE_ITEM,
  GET_ITEM,
  GET_INGR_DATA,
  GET_ORDER_ID,
  GET_ORDER_TOTAL,
  SORT_INGRS,
  GET_BUN,
} from "../actions/action";

const ingrs = {
  data: [],
};

const getIngrs = (state = ingrs, action) => {
  switch (action.type) {
    case GET_INGRS: {
      return {
        ...state,
        data: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

const constrInitial = {
  construct: [],
  constrBun: [],
  price: 0,
  bunOrder: 0,
  totalOrder: 0,
};

const getConstrItem = (state = constrInitial, action) => {
  switch (action.type) {
    case GET_ITEM: {
      return {
        ...state,
        construct: [...state.construct, action.payload],
      };
    }

    case GET_BUN: {
      return {
        ...state,
        constrBun: action.payload,
      };
    }

    case REMOVE_ITEM: {
      return {
        ...state,
        construct: state.construct.filter((itm) => itm.id !== action.payload),
      };
    }

    case GET_ORDER_TOTAL: {
      return {
        ...state,
        price: state.construct.reduce(
          (prev, curr) =>
            curr.type === "bun" ? prev + curr.price : prev + curr.price,
          0
        ),
      };
    }

    case SORT_INGRS: {
      return {
        ...state,
        construct: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

const ingredientsData = {
  ingrData: {},
};

const checkedIngr = (state = ingredientsData, action) => {
  switch (action.type) {
    case GET_INGR_DATA: {
      return {
        ...state,
        ingrData: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const orderInitial = {
  idPost: [],
  orderId: 0,
};

const finishOrder = (state = orderInitial, action) => {
  switch (action.type) {
    case GET_INGR_ID: {
      return {
        ...state,
        idPost: [...state.idPost, action.payload],
      };
    }
    case GET_ORDER_ID: {
      return {
        ...state,
        orderId: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  getIngredData: getIngrs,
  getConstr: getConstrItem,
  ingrSpecs: checkedIngr,
  order: finishOrder,
});