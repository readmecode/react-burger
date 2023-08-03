export const socketMiddleware = (wsActions) => (store) => {
  let socket = null;

  return (next) => (action) => {
    const { dispatch } = store;
    const { type, payload } = action;
    const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

    if (type === wsInit) {
      socket = new WebSocket(payload);
    }

    if (type === onClose && socket.readyState === 1) {
      socket.close();
      console.log("close");
    }

    if (socket) {
      socket.onopen = (e) => {
        dispatch({ type: onOpen });
      };

      socket.onerror = (e) => {
        dispatch({ type: onError });
      };

      socket.onclose = (e) => {
        dispatch({ type: onClose });
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { ...restParsedData } = parsedData;

        if (restParsedData.orders) {
          restParsedData.orders.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          dispatch({ type: onMessage, payload: restParsedData });
        }
      };
    }
    next(action);
  };
};
