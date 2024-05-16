import { View, Text, StyleSheet, Modal, ActionSheetIOS } from "react-native";
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import * as Clipboard from "expo-clipboard";

import { addToWardrobeContext } from "../homeContextProviders/AddToWardrobeContextProvider";
import { useNavigation } from "@react-navigation/native";
import Photo from "../../Photo/Photo";

const BottomSheetModal = () => {
  const { closeBottomSheet } = useContext(addToWardrobeContext);
  const handlePasteImage = async () => {
    try {
      const img = await Clipboard.getImageAsync({ format: "png" });
      if (img) {
        navigator.navigate("Album_Single", { copiedImage: img, photo: null });
        closeBottomSheet();
      } else {
        console.log("No image on clipboard or error pasting image.");
      }
    } catch (error) {
      console.log("Pasting Image Error: ", error);
    }
  };
  const navigator = useNavigation();
  const options = ["Take Photo", "Add from Album", "Paste"];
  return ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ["Cancel", ...options],
      title: "Create Item",

      cancelButtonIndex: 0,
    },
    (index) => {
      switch (index) {
        case 1:
          navigator.navigate("Photo", { photo: null, copiedImage: null });
          closeBottomSheet();
          break;
        case 2:
          navigator.navigate("Album_Single", {
            photo: null,
            copiedImage: null,
          });
          closeBottomSheet();
          break;

        case 3:
          handlePasteImage();
          break;
        default:
          closeBottomSheet();
          break;
      }
    }
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    bottom: 0,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  sheetWrapper: {
    width: "95%", // Controls the horizontal width of the bottom sheet
    height: "100%", // Optional: Controls the height, you can adjust if needed
  },
});
export default BottomSheetModal;
