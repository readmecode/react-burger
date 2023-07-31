import { refreshTokenThunk } from "../services/reducers/LoginReducer/loginReducer.js";
export const apiUrl = "https://norma.nomoreparties.space/api";
export const wsApiUrl = "wss://norma.nomoreparties.space/orders";
export const reqRes = (res) => {
  if (res) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
};

function fetchWithRefresh(url, options, dispatch) {
  // делаем запрос
  return fetch(url, options).then((response) => {
    // если сервер вернул ошибку
    if (!response.ok) {
      // преобразуем ответ в json
      return response.json().then((json) => {
        // если ошибка связана с истечением срока действия токена
        if (json.message === "jwt expired") {
          // обновляем токен
          return dispatch(refreshTokenThunk()).then((newToken) => {
            // заменяем старый токен на новый в параметрах запроса
            const newOptions = {
              ...options,
              headers: {
                ...options.headers,
                Authorization: `Bearer ${newToken}`,
              },
            };
            // повторяем запрос с новым токеном
            return fetch(url, newOptions);
          });
        }
        // если ошибка не связана с истечением срока действия токена, просто пробрасываем ошибку дальше
        throw new Error(json.message);
      });
    }
    // если ответ успешный, просто возвращаем его как есть
    return response;
  });
}

export default fetchWithRefresh