import { createContext, useContext, useEffect, useReducer } from "react";
import {
  CLEAR_ERROR_MESSAGE,
  CLEAR_SUCCESS_MESSAGE,
  CLOTHING_ITEM_CREATION_SUCCESS,
  CREATE_INIT,
  LOADING,
  SET_NAV_FROM,
} from "./ContextTypes";
import { authContext } from "../../Auth/AuthProvider/AuthProvider";
import axios from "react-native-axios";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

export const addClothingItemContext = createContext();
const url = API_URL;

const INITIAL_STATE = {
  createPressed: false,
  navFrom: null,
  error: null,
  success: false,
  loading: false,
};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_INIT:
      return { ...state, createPressed: payload };
    case SET_NAV_FROM:
      return { ...state, navFrom: payload };
    case CLEAR_ERROR_MESSAGE:
      return { ...state, error: null };
    case CLOTHING_ITEM_CREATION_SUCCESS:
      return { ...state, success: true };
    case CLEAR_SUCCESS_MESSAGE:
      return { ...state, success: false };
    case LOADING:
      return { ...state, loading: payload };
    default:
      return state;
  }
};

const AddClothingItemContextProvider = ({ children }) => {
  const { userAuth } = useContext(authContext);
  const navigator = useNavigation();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const createButtonPressed = (status) => {
    dispatch({
      type: CREATE_INIT,
      payload: status,
    });
  };
  const setNavFrom = (from) => {
    dispatch({
      type: SET_NAV_FROM,
      payload: from,
    });
  };

  const submitFormData = async (formData) => {
    dispatch({ type: LOADING, payload: true });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    const data = new FormData();
    for (const key in formData) {
      if (key === "image") {
        const uri = formData[key];

        if (uri.startsWith("data:image/")) {
          // Handle base64 image data
          const base64Data = uri.split(",")[1];
          const type = uri.match(/^data:(image\/[a-zA-Z0-9-.+]+);base64,/)[1];
          const name = `image.${type.split("/")[1]}`; // e.g., image.jpeg

          data.append(key, {
            uri: `data:${type};base64,${base64Data}`,
            name,
            type,
          });
        } else {
          // Handle file path
          const name = uri.split("/")?.pop() ? uri.split("/").pop() : "name";
          const type = "image/jpeg"; // or determine type from the file extension
          console.log("File Path: ", uri, "Name: ", name, "Type: ", type);

          data.append(key, {
            uri: uri.replace("file://", ""),
            name,
            type,
          });
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const res = await axios.post(`${url}/clothing-items`, data, config);
      if (res?.data?.status == "Success") {
        dispatch({ type: CLOTHING_ITEM_CREATION_SUCCESS });
        dispatch({ type: LOADING, payload: false });
        setTimeout(() => {
          dispatch({ type: CLEAR_SUCCESS_MESSAGE });
          navigator.navigate(state?.navFrom);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: CLEAR_ERROR_MESSAGE });
      setTimeout(() => {
        dispatch({ type: CLEAR_ERROR_MESSAGE });
      }, 3000);
    }
  };
  const deleteClothingItems = async (items) => {
    console.log(items);
    dispatch({ type: LOADING, payload: true });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      for (const item of items) {
        const res = await axios.delete(`${url}/clothing-items/${item}`, config);
        console.log(res?.data?.status);
      }
      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: LOADING, payload: false });
    }
  };
  return (
    <addClothingItemContext.Provider
      value={{
        createButtonPressed,
        createPressed: state?.createPressed,
        setNavFrom,
        navFrom: state?.navFrom,
        submitFormData,
        success: state?.success,
        loading: state?.loading,
        deleteClothingItems,
      }}
    >
      {children}
    </addClothingItemContext.Provider>
  );
};

export default AddClothingItemContextProvider;
