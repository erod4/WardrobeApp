import { createContext, useReducer } from "react";
import { CREATE_INIT } from "./ContextTypes";

export const addClothingItemContext = createContext();

const INITIAL_STATE = { createPressed: false };
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_INIT:
      return { ...state, createPressed: payload };
      break;

    default:
      return state;
  }
};

const AddClothingItemContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const createButtonPressed = (status) => {
    dispatch({ type: CREATE_INIT, payload: status });
  };

  return (
    <addClothingItemContext.Provider
      value={{ createButtonPressed, createPressed: state?.createPressed }}
    >
      {children}
    </addClothingItemContext.Provider>
  );
};

export default AddClothingItemContextProvider;
