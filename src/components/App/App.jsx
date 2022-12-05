import React, { useState, useEffect } from "react";
import appStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import getIngredients from "../../utils/burger-api";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getIngredients(setData);
  }, []);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.main}>
        <BurgerIngredients data={data.data} />
        <BurgerConstructor data={data.data} />
      </main>
    </div>
  );
}

export default App;
