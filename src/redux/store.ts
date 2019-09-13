import { applyMiddleware, createStore } from "redux";
import reducer from "./reducer";
import { thunk, createSocketMiddleware, logActions } from "./middleware";

const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  middleware.push(logActions);
}

middleware.push(createSocketMiddleware("http://localhost:5000"));

const store = createStore(reducer, applyMiddleware(...middleware));

if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  window.store = store;
}

export default store;
