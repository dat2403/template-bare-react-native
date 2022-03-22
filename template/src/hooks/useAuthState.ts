import React from "react";
import { AuthAction, AuthState } from "../context/AuthModuleProvider";

const initDefaultAuthState: AuthState = {
  isLoading: true,
  isSignOut: false,
  user: undefined,
  token: undefined,
};

export default function useAuthState() {
  const [authState, dispatch] = React.useReducer((prevState: AuthState, action: AuthAction) => {
    const { type, payload } = action;
    switch (type) {
      case "RESTORE" : {
        return {
          ...prevState,
          user: payload.user,
          token: payload.token,
          isLoading: false,
        };
      }

      case "SIGN_IN" : {
        return {
          ...prevState,
          user: payload.user,
          token: payload.token,
        };
      }

      case "SIGN_OUT" : {
        return {
          ...prevState,
          user: undefined,
          token: undefined,
        };
      }

      default:
        return initDefaultAuthState;
    }
  }, initDefaultAuthState);

  return {
    authState: authState,
    dispatch
  }
}
