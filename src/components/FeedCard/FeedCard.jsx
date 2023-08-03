import fcardStyle from "./fcard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const FeedCard = ({ id, image, name, price, count }) => {
  return (
    <li className={fcardStyle.fcard__block}>
      <div className={fcardStyle.fcard__info__block}>
        <span className={fcardStyle.fcard__icon__block}>
          <img
            src={image}
            alt={`${name}`}
            className={fcardStyle.fcard__order__icon}
          />
        </span>
        <h5 className={fcardStyle.fcard__order__name}>{name}</h5>
      </div>
      <div className={fcardStyle.fcard__price}>
        <p className={fcardStyle.fcard__order__price}>
          {count} x {price}
        </p>
        <CurrencyIcon />
      </div>
    </li>
  );
};

export default FeedCard;
