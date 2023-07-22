export type TDataLogin = {
  accessToken?: string;
  refreshToken?: string;
  success: boolean;
  user: {
    email: string;
    name: string;
  },
  message: string
}
export type TResetData = {
  successTrue: boolean | null;
  resultData: {
    success: boolean;
    message: string;
  } | null;
  error: boolean | null;
  resolve: boolean | null;
}
export type TFeedData = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}
export type TIngredientsData = {
  ingredientsData: {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
  }[]
}
export type TIngredientData = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  id?: string;
}
export type TDataString = {
  [keyof: string]: string;
}
export type TChangeUserState = {
  data: TDataLogin | null;
  error: boolean | null;
  resolve: boolean | null;
}
export type TLoginState = {
  data: TDataLogin | null
  dataUser: TDataLogin | null;
  accessToken: string | void;
  refreshToken: string | void;
  error: string | null;
  resolve: boolean | null;
}
export type TFeedState = {
  data: TFeedData[],
  url: string,
  total: number | null,
  totalToday: number | null,
  success: boolean,
}
export type TWsActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
}
export type TLogout = {
  success: boolean,
  resolve: string,
  data: {
    success?: boolean,
    message?: string
  } | null
}
export type TRegisterState = {
  error: string | null,
  resolve: boolean | null,
  data: TDataLogin | null
}
export type TOrderState = {
  idPostArr: string[];
  bunArr: TIngredientData[],
  totalArrOrder: string[],
  order: null | number,
  error: null | string,
  resolve: null | string,
  success: boolean
}

export type TIngredientDetails = {
  detailsArr: TIngredientData | [];
  modalState: boolean;
}

export type TGetIngredientsState = {
  data:  TIngredientData[] | [],
  success: boolean,
}

export type TburgerConstructorState = {
  bunArr: any,
  constructorArr: any,
  price: number,
}

export type TGetIngredientsData = {
  data: TIngredientsData | TIngredientData[] | [],
  success: boolean,
}
export type TAuthUser = Omit<TDataLogin, "accessToken" & "refreshToken">