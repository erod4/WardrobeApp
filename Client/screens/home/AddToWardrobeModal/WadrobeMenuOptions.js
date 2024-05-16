import { Alert } from "react-native";
import {
  NEW_CLOTHING_ITEM_PRESS,
  NEW_OUTFIT_PRESS,
} from "../homeContextProviders/HomeContextTypes";

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
      onPress: () => {
        handleNewClothingItemPress(dispatch);
      },
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
const handleNewClothingItemPress = (dispatch) => {
  //when alert button is pressed, dispatch function sets bottom sheets open to true
  dispatch({
    type: NEW_CLOTHING_ITEM_PRESS,
    payload: { isModalOpen: false, openBottomSheet: true },
  });
};
