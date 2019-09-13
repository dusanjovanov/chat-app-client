import {
  useSelector as us,
  useDispatch as ud,
  TypedUseSelectorHook
} from "react-redux";
import { State } from "./reducer";

export const useSelector: TypedUseSelectorHook<State> = us;
