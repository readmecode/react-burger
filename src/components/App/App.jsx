import React, { useState, useEffect } from "react";
import appStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import getIngredients from "../../utils/burger-api";

import {
  IngredientsContext,
  ConstructionContext,
} from "../../services/appContext";

function App() {
  const [data, setData] = useState([]);
  const [construct, setConstruct] = useState(true);
  const [ingr, setIngr] = useState(true);
  const [price, setPrice] = useState(0);
  const [item, setItem] = useState([]);
  const [idPost, setIdPost] = useState([]);
  const [orderId, setOrderId] = useState();

  useEffect(() => {
    getIngredients(setData);
  }, []);

  if (data.length === 0) {
    return null;
  }

  const addItem = (element) => {
    setItem([...item, element]);
  };

  const includeIdPost = (id) => {
    setIdPost(idPost.concat(id));
  };

  const removeItemConstruction = (id) => {
    setItem(item.filter((state) => state._id !== id));
  };

  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.main}>
        <IngredientsContext.Provider
          value={{ ingr, setIngr, data, addItem, includeIdPost }}
        >
          <BurgerIngredients />
        </IngredientsContext.Provider>
        <ConstructionContext.Provider
          value={{
            construct,
            setConstruct,
            item,
            price,
            setPrice,
            idPost,
            orderId,
            setOrderId,
            removeItemConstruction,
          }}
        >
          <BurgerConstructor />
        </ConstructionContext.Provider>
      </main>
    </div>
  );
}

export default App;
