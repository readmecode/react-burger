import React from "react";
import ReactDOM from "react-dom/client";
import appStyle from "./App.module.css";
import dataSet from "../../utils/data";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.main}>
      <BurgerIngridients data={dataSet} />
      <BurgerConstructor data={dataSet} />
      </main>
    </div>
  );
}

export default App;
