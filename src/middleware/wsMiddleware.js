export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(payload);
      }

      if (type === wsInit && socket?.readyState === 1) {
        socket.close();
      }

      if (socket) {
        socket.onopen = (e) => {
          console.log(e);
          dispatch({ type: onOpen });
        };

        socket.onerror = (e) => {
          console.log(e);
          dispatch({ type: onError });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { ...restParsedData } = parsedData;

          if (restParsedData.orders) {
            restParsedData.orders.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );

            dispatch({ type: onMessage, payload: restParsedData });
          }
        };
        socket.onclose = (event) => {
          dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
        };

        socket.onclose = (e) => {
          console.log(e);
          dispatch({ type: onClose });
        };
      }

      next(action);
    };
  };
};
