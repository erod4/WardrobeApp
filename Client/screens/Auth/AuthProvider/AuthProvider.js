import { createContext, useEffect, useReducer } from "react";
import {
  FETCH_PROFILE_FAILED,
  FETCH_PROFILE_SUCCESS,
  LOADING,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  RESET_ERROR,
} from "./AuthProviderTypes";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

import axios from "react-native-axios";
import {
  readData,
  storeData,
} from "../../GlobalHelperFunctions/GlobalHelperFunctions";

const url = API_URL;
export const authContext = createContext();
const INITIAL_STATE = {
  userAuth: readData("userAuth") || null,
  error: null,
  loading: false,
  profile: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: payload,
      };
    case LOGIN_SUCCESS:
      storeData("userAuth", payload);
      return {
        ...state,
        userAuth: payload,
        error: null,
      };

    case LOGIN_FAILED:
      return { ...state, error: payload, loading: false };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        profile: payload,
      };
    case FETCH_PROFILE_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
const AuthContextProvider = ({ children }) => {
  const navigator = useNavigation();

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const loginUserAction = async (formData) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      dispatch({ type: LOADING, payload: true });

      const res = await axios.post(`${url}/login`, formData, config);
      if (res?.data?.status == "Success") {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        navigator.navigate("Nav");
      }
      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      console.log(error?.response?.data?.message);
      dispatch({ type: LOGIN_FAILED, payload: error?.response?.data?.message });
    }
  };
  const getUserAction = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      dispatch({ type: LOADING, payload: true });

      const res = await axios.get(`${url}/getUser`, config);
      if (res?.data) {
        dispatch({
          type: FETCH_PROFILE_SUCCESS,
          payload: res.data,
        });
      }
      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      dispatch({
        type: FETCH_PROFILE_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
  //clear error message after 3 seconds
  useEffect(() => {
    if (state?.error) {
      const timer = setTimeout(() => {
        dispatch({ type: RESET_ERROR, payload: null });
      }, 3000); // Clear error after 3 seconds

      return () => clearTimeout(timer); // Cleanup timer if component unmounts
    }
  }, [state?.error]);
  return (
    <authContext.Provider
      value={{
        loginUserAction,
        getUserAction,
        userAuth: state?.userAuth,
        error: state?.error,
        loading: state?.loading,
        profile: state?.profile,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export default AuthContextProvider;
