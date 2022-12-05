const BURGER_API = "https://norma.nomoreparties.space/api";

const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(res.status));
};

function getIngredients(setData) {
  return fetch(`${BURGER_API}/ingredients`)
    .then(checkRes)
    .then(setData)
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

export default getIngredients;
