import { FC } from "react";
import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import homeStyle from "./home.module.css"

const Home: FC = () => {
  return ( 
    <>
      <DndProvider backend={HTML5Backend}>
        <div className={homeStyle.home__container}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </div>
      </DndProvider>
    </>
  );
}
 
export default Home;