import { Alert } from "react-native";
import { authContext } from "../../Auth/AuthProvider/AuthProvider";

const { useContext, createContext, useReducer, useEffect } = require("react");
const {
  SET_MODAL,
  NEW_OUTFIT_PRESS,
  NEW_CLOTHING_ITEM_PRESS,
  CLOSE_BOTTOM_SHEET,
} = require("./HomeContextTypes");

export const addToWardrobeContext = createContext();

const INITIAL_STATE = {
  navToNewOutfit: false,
  isBottomSheetOpen: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case NEW_OUTFIT_PRESS:
      return {
        ...state,
        navToNewOutfit: payload,
      };
    case NEW_CLOTHING_ITEM_PRESS:
      return {
        ...state,
        isBottomSheetOpen: payload,
      };
    case CLOSE_BOTTOM_SHEET:
      return { ...state, isBottomSheetOpen: payload };
    default:
      return state;
  }
};
const AddToWardrobeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const openBottomSheet = () => {
    dispatch({
      type: NEW_CLOTHING_ITEM_PRESS,
      payload: true,
    });
  };
  const closeBottomSheet = () => {
    dispatch({
      type: CLOSE_BOTTOM_SHEET,
      payload: false,
    });
  };
  const newOutfitPress = () => {
    dispatch({
      type: NEW_OUTFIT_PRESS,
      payload: true,
    });
  };
  const endNewOutfitNav = () => {
    dispatch({
      type: NEW_OUTFIT_PRESS,
      payload: false,
    });
  };
  return (
    <addToWardrobeContext.Provider
      value={{
        navToNewOutfit: state?.navToNewOutfit,
        isBottomSheetOpen: state?.isBottomSheetOpen,
        closeBottomSheet,
        openBottomSheet,
        newOutfitPress,
        endNewOutfitNav,
      }}
    >
      {children}
    </addToWardrobeContext.Provider>
  );
};
export default AddToWardrobeContextProvider;
