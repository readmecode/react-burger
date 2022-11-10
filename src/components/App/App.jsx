import React from "react";
import appStyle from "./App.module.css";
import data from "../../utils/data";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function App() {
  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.main}>
        <BurgerIngredients data={[data]} />
      </main>
    </div>
  );
}

export default App;
