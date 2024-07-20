import { createContext, useEffect, useReducer } from "react";

import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

import axios from "react-native-axios";
import {
  readData,
  storeData,
} from "../../GlobalHelperFunctions/GlobalHelperFunctions";

const url = API_URL;
export const outfitContext = createContext();
const INITIAL_STATE = {
  pinnedOutfit: null,
  error: null,
  loading: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};
const OutfitContextProvider = ({ children }) => {
  const navigator = useNavigation();

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

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
    <outfitContext.Provider
      value={{
        error: state?.error,
        loading: state?.loading,
        pinnedOutfit: state?.pinnedOutfit,
      }}
    >
      {children}
    </outfitContext.Provider>
  );
};
export default OutfitContextProvider;
