import feedInfoStyle from "./feedinfo.module.css";

const FeedInfo = ({ feedData, total, totalToday }) => {
  return (
    <div className={feedInfoStyle.feedInfo}>
      <ul className={feedInfoStyle.feedInfo__action}>
        <li className={feedInfoStyle.feedInfo__block}>
          <h4 className={feedInfoStyle.feedInfo__block__title}>Готовы:</h4>
          {feedData
            ?.slice(0, 5)
            .filter((el) => el.status === "done")
            .map((el) => (
              <p className={feedInfoStyle.feedInfo__num__order} key={el._id}>
                {el.number}
              </p>
            ))}
        </li>
        <li className={feedInfoStyle.feedInfo__block}>
          <h4 className={feedInfoStyle.feedInfo__block__title}>В работе:</h4>
          {feedData
            ?.slice(0, 3)
            .filter((el) => el.status === "pending")
            .map((el) => (
              <p className={feedInfoStyle.feedInfo__num__order} key={el._id}>
                {el.number}
              </p>
            ))}
        </li>
      </ul>

      <span className={feedInfoStyle.feedInfo__total__container}>
        <p className={feedInfoStyle.feedInfo__uppertitle}>
          Выполнено за все время:
        </p>
        <h2 className={feedInfoStyle.feedInfo__total__title}>{total}</h2>
      </span>

      <span className={feedInfoStyle.feedInfo__total__container}>
        <p className={feedInfoStyle.feedInfo__uppertitle}>
          Выполнено за сегодня:
        </p>
        <h2 className={feedInfoStyle.feedInfo__total__title}>{totalToday}</h2>
      </span>
    </div>
  );
};

export default FeedInfo;
