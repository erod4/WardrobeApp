import React, { useContext, useEffect } from "react";
import { ActionSheetIOS } from "react-native";
import * as Clipboard from "expo-clipboard";
import { addToWardrobeContext } from "../homeContextProviders/AddToWardrobeContextProvider";
import { useNavigation } from "@react-navigation/native";
import { addClothingItemContext } from "../../Album/AddClothingItemContextProvider/AddClothingItemContext";

const BottomSheetModal = () => {
  const { closeBottomSheet, isBottomSheetOpen } =
    useContext(addToWardrobeContext);
  const { setNavFrom } = useContext(addClothingItemContext);
  const navigator = useNavigation();

  const handlePasteImage = async () => {
    try {
      const img = await Clipboard.getImageAsync({ format: "jpeg" });
      if (img) {
        setNavFrom("Nav");
        closeBottomSheet();
        navigator.navigate("Album_Single", {
          copiedImage: img,
          photo: null,
        });
      } else {
        console.log("No image on clipboard or error pasting image.");
      }
    } catch (error) {
      console.log("Pasting Image Error: ", error);
    }
  };

  useEffect(() => {
    if (isBottomSheetOpen) {
      const options = ["Take Photo", "Add from Album", "Paste"];
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", ...options],
          title: "Create Item",
          cancelButtonIndex: 0,
        },
        (index) => {
          switch (index) {
            case 1:
              setNavFrom("Nav");
              closeBottomSheet();
              navigator.navigate("Photo", { photo: null, copiedImage: null });
              break;
            case 2:
              setNavFrom("Nav");
              closeBottomSheet();
              navigator.navigate("Album_Single", {
                photo: null,
                copiedImage: null,
              });
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
    }
  }, [isBottomSheetOpen]);

  return null; // No need to render anything
};

export default BottomSheetModal;
