export const apiUrl = "https://norma.nomoreparties.space/api";
export const wsApiUrl = "wss://norma.nomoreparties.space/orders";
export const reqRes = (res) => {
  if (res) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
};
