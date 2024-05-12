import { createContext, useEffect, useReducer } from "react";
import {
  FETCH_PROFILE_FAILED,
  FETCH_PROFILE_SUCCESS,
  LOADING,
  LOGIN_SUCCESS,
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
      };
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
    default:
      return state;
  }
};
const AuthContextProvider = ({ children }) => {
  const navigator = useNavigation();

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const loginUserAction = async (formData) => {
    console.log(formData);
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      dispatch({ type: LOADING, payload: true });

      const res = await axios.post(`${url}/login`, formData, config);
      console.log(res);
      if (res?.data?.status == "Success") {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        navigator.navigate("Nav");
      }
      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      console.error(error);
    }
  };
  const getUserAction = async () => {
    // console.log(state?.userAuth?.token);
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
  useEffect(() => {
    getUserAction();
  }, []);

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
