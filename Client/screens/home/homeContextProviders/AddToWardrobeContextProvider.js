import { Alert } from "react-native";
import { options } from "../AddToWardrobeModal/WadrobeMenuOptions";
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
  isModalOpen: false,
  navToNewOutfit: false,
  openBottomSheet: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MODAL:
      return {
        ...state,
        isModalOpen: payload,
      };
    case NEW_OUTFIT_PRESS:
      return {
        ...state,
        isModalOpen: payload?.isModalOpen,
        navToNewOutfit: payload?.navToNewOutfit,
      };
    case NEW_CLOTHING_ITEM_PRESS:
      return {
        ...state,
        isModalOpen: payload?.isModalOpen,
        openBottomSheet: payload?.openBottomSheet,
      };
    case CLOSE_BOTTOM_SHEET:
      return { ...state, openBottomSheet: payload };
    default:
      return state;
  }
};
const AddToWardrobeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setModal = (action) => {
    if (action) {
      dispatch({
        type: SET_MODAL,
        payload: action,
      });
      options(setModal, dispatch);
    }
  };
  const closeBottomSheet = () => {
    dispatch({
      type: CLOSE_BOTTOM_SHEET,
      payload: false,
    });
  };
  return (
    <addToWardrobeContext.Provider
      value={{
        setModal,
        isModalOpen: state?.isModalOpen,
        navToNewOutfit: state?.navToNewOutfit,
        openBottomSheet: state?.openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}
    </addToWardrobeContext.Provider>
  );
};
export default AddToWardrobeContextProvider;
