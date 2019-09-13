import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import { verifyToken, showNotification } from "./redux/actionCreators";
import store from "./redux/store";

verifyToken()(store);

// store.dispatch(
//   showNotification("success", `Logged in as Dusan Jovanov`)
// );

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
