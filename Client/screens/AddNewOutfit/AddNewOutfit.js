import { View, SafeAreaView, StyleSheet, ActionSheetIOS } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddToWardrobeButton, { ModalButton } from "../nav/AddToWardrobeButton";
import ClothingItems from "./ClothingItems";
import * as Haptics from "expo-haptics";

import React, { useState } from "react";
import * as Clipboard from "expo-clipboard";

import { useNavigation } from "@react-navigation/native";

const AddNewOutfit = () => {
  const [actionSheet, setActionSheet] = useState(null);
  const navigator = useNavigation();

  const handleModalPress = () => {
    setActionSheet(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };
  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ClothingItems />
      </SafeAreaView>
      <ModalButton onPress={handleModalPress} />
      {actionSheet && <ModalOptions setActionSheet={setActionSheet} />}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    display: "flex",
    alignItems: "flex-end",
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
  },
});

const ModalOptions = ({ setActionSheet }) => {
  const navigator = useNavigation();

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
  const options = ["Take Photo", "Add from Album", "Paste"];
  return ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ["Cancel", ...options],
      title: "Create Item",

      cancelButtonIndex: 0,
    },
    (index) => {
      switch (index) {
        case 0:
          setActionSheet(false);
          break;
        case 1:
          navigator.navigate("Photo", { photo: null, copiedImage: null });

          break;
        case 2:
          navigator.navigate("Album_Single", {
            photo: null,
            copiedImage: null,
          });

          break;

        case 3:
          handlePasteImage();
          break;
        default:
          break;
      }
    }
  );
};

export default AddNewOutfit;
