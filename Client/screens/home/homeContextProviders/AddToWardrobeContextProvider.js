import { Alert } from "react-native";

const { useContext, createContext, useReducer } = require("react");
const { SET_MODAL } = require("./HomeContextTypes");

export const addToWardrobeContext = createContext();

const INITIAL_STATE = {
  isModalOpen: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MODAL:
      return {
        ...state,
        isModalOpen: payload,
      };
    default:
      return state;
  }
};
const AddToWardrobeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setModal = (action) => {
    console.log(`Modal set to: ${action}`);
    dispatch({
      type: SET_MODAL,
      payload: action,
    });
    if (action) {
      Options();
    }
  };
  const Options = () => {
    Alert.alert("Wadrobe Menu", "", [
      {
        text: "Cancel",
        onPress: () => {
          setModal(false);
        },
        style: "cancel",
      },
      {
        text: "Add Outfit ",
        onPress: null,
      },
      {
        text: "Add Clothing Item",
        onPress: null,
      },
    ]);
  };
  return (
    <addToWardrobeContext.Provider
      value={{ setModal, isModalOpen: state?.isModalOpen }}
    >
      {children}
    </addToWardrobeContext.Provider>
  );
};
export default AddToWardrobeContextProvider;
