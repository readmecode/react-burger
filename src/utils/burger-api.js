export const BURGER_API = "https://norma.nomoreparties.space/api";

export const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(res.status));
};