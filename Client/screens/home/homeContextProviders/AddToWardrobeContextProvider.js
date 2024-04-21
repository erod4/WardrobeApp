import { Alert } from "react-native";
import { options } from "../AddToWardrobeModal/WadrobeMenuOptions";

const { useContext, createContext, useReducer } = require("react");
const { SET_MODAL, NEW_OUTFIT_PRESS } = require("./HomeContextTypes");

export const addToWardrobeContext = createContext();

const INITIAL_STATE = {
  isModalOpen: false,
  navToNewOutfit: false,
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

    default:
      return state;
  }
};
const AddToWardrobeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setModal = (action) => {
    console.log(`Modal set to: ${action}`);

    if (action) {
      dispatch({
        type: SET_MODAL,
        payload: action,
      });
      options(setModal, dispatch);
    }
  };

  return (
    <addToWardrobeContext.Provider
      value={{
        setModal,
        isModalOpen: state?.isModalOpen,
        navToNewOutfit: state?.navToNewOutfit,
      }}
    >
      {children}
    </addToWardrobeContext.Provider>
  );
};
export default AddToWardrobeContextProvider;
