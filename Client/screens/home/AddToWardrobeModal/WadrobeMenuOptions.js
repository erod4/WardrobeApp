import { Alert } from "react-native";
import { NEW_OUTFIT_PRESS } from "../homeContextProviders/HomeContextTypes";

export const options = (setModal, dispatch) => {
  Alert.alert("Wadrobe Menu", "", [
    {
      text: "Cancel",
      onPress: () => {
        setModal(false);
      },
      style: "cancel",
    },
    {
      text: "New Outfit ",
      onPress: () => {
        handleNewOutfitPress(dispatch);
      },
    },
    {
      text: "New Clothing Item",
      onPress: null,
    },
  ]);
};
const handleNewOutfitPress = (dispatch) => {
  dispatch({
    type: NEW_OUTFIT_PRESS,
    payload: { isModalOpen: false, navToNewOutfit: true },
  });
  dispatch({
    type: NEW_OUTFIT_PRESS,
    isModalOpen: false,
    navToNewOutfit: false,
  });
};
