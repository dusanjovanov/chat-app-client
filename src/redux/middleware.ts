import io from "socket.io-client";

export const createSocketMiddleware = url => {
  let socket: SocketIOClient.Socket;

  return store => next => action => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
      case "TOKEN_VERIFIED_LOGGED_IN": {
        socket = io(url, {
          transports: ["websocket", "polling", "flashsocket"]
        });

        socket.once("init", payload => {
          store.dispatch({ type: "INIT_LOAD", payload });
        });

        socket.on("message", message => {
          switch (message.type) {
            case "NEW_MESSAGE": {
              store.dispatch({
                type: "MESSAGE_RECEIVED",
                payload: message.payload
              });
              break;
            }
            case "FETCH_MESSAGES": {
              store.dispatch({
                type: "FETCH_MESSAGES_SUCCESS",
                payload: message.payload
              });
              break;
            }
          }
        });
        break;
      }
      case "SEND_MESSAGE": {
        socket.send({ type: action.type, payload: action.payload });
        return;
      }
      case "FETCH_MESSAGES": {
        socket.send({ type: action.type, payload: action.payload });
        return;
      }
      case "LOGOUT_SUCCESS": {
        socket.close();
        break;
      }
    }

    return next(action);
  };
};

export const thunk = store => next => action =>
  typeof action === "function" ? action(store) : next(action);

export const logActions = store => next => action => {
  console.log(action);
  return next(action);
};
