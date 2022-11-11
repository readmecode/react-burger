import React, {useState, useEffect} from "react";
import appStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  const apiServer="https://norma.nomoreparties.space/api/ingredients"
  const [data, setData] = useState ([])
  useEffect (() => {
    const getDataFromServer = () => {
      return fetch(`${apiServer}`)
      .then(res => res.json())
      .then(data => setData(data.data))
    }
    getDataFromServer()
  }, [setData]
  )

  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  )
}

export default App;
