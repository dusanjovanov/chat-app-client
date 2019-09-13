import * as api from "../api";
import { getIsMessagesEnd } from "./selectors";

export const sendMessage = (text: string) => store => {
  store.dispatch({
    type: "SEND_MESSAGE",
    payload: {
      text,
      userId: store.getState().loggedUser.id
    }
  });
};

export const fetchMessages = () => store => {
  // no more messages
  if (getIsMessagesEnd(store.getState())) return;

  store.dispatch({
    type: "FETCH_MESSAGES",
    payload: store.getState().messages[0].sentAt
  });
};

export const verifyToken = () => async store => {
  const res = await api.verifyToken();
  if (res.error) {
    store.dispatch({ type: "TOKEN_VERIFIED_LOGGED_OUT" });
  } else {
    store.dispatch({ type: "TOKEN_VERIFIED_LOGGED_IN", payload: res.user });
  }
};

export const login = (email: string, password: string) => async store => {
  const res = await api.login(email, password);
  if (res.error) {
    if (res.reason === "client") {
      store.dispatch({
        type: "LOGIN_ERROR",
        payload: "Email and password don't match."
      });
    } else if (res.reason === "server") {
      store.dispatch(
        showNotification("error", "Login failed. Please try again later.")
      );
    }
  } else {
    store.dispatch({ type: "LOGIN_SUCCESS", payload: res.user });
    store.dispatch(
      showNotification("success", `Logged in as ${res.user.displayName}`)
    );
  }
};

export const logout = () => async store => {
  const res = await api.logout();
  if (res.error) {
    store.dispatch(
      showNotification("error", "Logout failed. Please try again later.")
    );
  } else {
    store.dispatch({ type: "LOGOUT_SUCCESS" });
  }
};

export const showNotification = (
  type: "error" | "success" | "",
  text: string,
  timeout: number = 4000
) => store => {
  store.dispatch({ type: "SHOW_NOTIFICATION", payload: { type, text } });
  setTimeout(() => {
    store.dispatch({ type: "HIDE_NOTIFICATION" });
  }, timeout);
};
