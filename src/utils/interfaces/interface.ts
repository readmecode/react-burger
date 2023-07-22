import { ReactNode } from "react";
import {TAuthUser, TFeedData, TIngredientsData, TGetIngredientsData, TIngredientData} from "../types/type";

export interface IAppHeader {
  authUser: TAuthUser | Object
}
export interface IFeedCard {
  id?: string;
  image: string;
  name: string;
  price: number;
  count: number;
}
export interface IModal {
  children?: ReactNode
  handleClose?: () => void
}
export interface IProtectedRoute {
  children: ReactNode
}
export interface IProfile extends IProtectedRoute {}
export interface IFeedInfo {
  feedData: TFeedData[];
  total: number;
  totalToday: number;
}
export interface IFeedOrder {
  order: TFeedData;
  ingredientData: TIngredientsData

  _id: string;
  url: string;
}
export interface IIngredient {
  image: string;
  text: string;
  price: number;
  item: TIngredientData
  id: string;
}
export interface IOrder {
  _id?: string
  position?: string | undefined;
  locked: boolean;
  name: string;
  price: number;
  image: string;
  index?: number;
  idEl?: string;
  moveIngredient?: any;
}

export interface IProfileForm {
  userData: {
    name: string
    email: string
  }
}

export interface IModalOrder {
  modal: boolean;
  setModal: any;
  children: ReactNode;
  setBtn: any;
}


