import React, { createContext, useReducer } from "react";
import useReducer from "./userReducer";
const initialState = {
  userName: "",
  isLoggedIn: false,
  error: null,
};

const URL = "https://localhost:8080";

export const UserState = createContext(initialState);

export const UserStateProvider = async ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)
  function fetchUserState() {
    dispatch({type: "FETCH_STATUS_START"})
    const response = await fetch(`${URL}/api/status`)
    if (!response.ok) {
      console.log("response", response)
      dispatch({type: "FETCH_STATUS_FAIL", payload: response.data})
    }
    else {
      dispatch({type:"FETCH_STATUS_SUCCESS", payload: response.data})
    }
  }
};
