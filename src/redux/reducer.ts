import { Message, User } from "../types.js";

export type State = {
  users: User[];
  messages: Message[];
  loggedUser: User;
  notification: NotificationState;
  isTokenVerified: boolean;
  areMessagesInitFetched: boolean;
  loginError: string;
  isMessagesEnd: boolean;
};

export type NotificationState = {
  isVisible: boolean;
  text: string;
  type: "error" | "success" | "";
};

const initState: State = {
  users: [],
  messages: [],
  loggedUser: null,
  notification: {
    isVisible: false,
    text: "",
    type: ""
  },
  isTokenVerified: false,
  areMessagesInitFetched: false,
  loginError: "",
  isMessagesEnd: false
};

const reducer = (state: State = initState, action) => {
  switch (action.type) {
    case "INIT_LOAD": {
      return {
        ...state,
        messages: action.payload.isEnd
          ? state.messages
          : action.payload.messages,
        areMessagesInitFetched: true,
        isMessagesEnd: action.payload.isEnd
      };
    }
    case "TOKEN_VERIFIED_LOGGED_IN": {
      return {
        ...state,
        loggedUser: action.payload,
        isTokenVerified: true
      };
    }
    case "TOKEN_VERIFIED_LOGGED_OUT": {
      return {
        ...state,
        isTokenVerified: true
      };
    }
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        loggedUser: action.payload
      };
    }
    case "LOGIN_ERROR": {
      return {
        ...state,
        loginError: action.payload
      };
    }
    case "LOGOUT_SUCCESS": {
      return {
        ...state,
        loggedUser: null
      };
    }
    case "MESSAGE_RECEIVED": {
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    }
    case "FETCH_MESSAGES_SUCCESS": {
      return {
        ...state,
        messages: action.payload.isEnd
          ? state.messages
          : [...action.payload.messages, ...state.messages],
        isMessagesEnd: action.payload.isEnd
      };
    }
    case "SHOW_NOTIFICATION": {
      return {
        ...state,
        notification: {
          ...state.notification,
          isVisible: true,
          text: action.payload.text,
          type: action.payload.type
        }
      };
    }
    case "HIDE_NOTIFICATION": {
      return {
        ...state,
        notification: initState.notification
      };
    }
    default:
      return state;
  }
};

export default reducer;
