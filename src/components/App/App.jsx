import React, { useState, useEffect } from "react";
import appStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  const apiServer = "https://norma.nomoreparties.space/api/ingredients";
  const [data, setData] = useState([]);
  const [ingrData, setIngrData] = useState({});
  const [brgingr, setBrgingr] = useState(true);
  const [brgrconstr, setBrgrconstr] = useState(true);
  useEffect(() => {
    const getDataFromServer = () => {
      return fetch(`${apiServer}`)
        .then((res) => res.json())
        .then((data) => setData(data.data))
        .catch(() => Promise.reject("Кажется здесь произошла ошибка, кэп"));
    };
    getDataFromServer();
  }, [setData]);
  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.main}>
        <BurgerIngredients
          data={data}
          ingrData={ingrData}
          setIngrData={setIngrData}
          state={brgingr}
          setState={setBrgingr}
        />
        <BurgerConstructor
          data={data}
          state={brgrconstr}
          setState={setBrgrconstr}
        />
      </main>
    </div>
  );
}

export default App;
