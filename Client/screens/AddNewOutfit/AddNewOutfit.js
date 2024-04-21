import { View, Text, SafeAreaView, StyleSheet, Alert } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddToWardrobeButton, { ModalButton } from "../nav/AddToWardrobeButton";
import ClothingItems from "./ClothingItems";

const AddNewOutfit = () => {
  const handleModalPress = () => {
    modalOptions();
  };
  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ClothingItems />
      </SafeAreaView>
      <ModalButton onPress={handleModalPress} />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: { display: "flex", alignItems: "flex-end", flex: 1 },
  safeArea: {
    width: "100%",
    flex: 1,
  },
});

const modalOptions = () => {
  Alert.alert("Create Outfit", "", [
    {
      text: "Cancel",
      onPress: () => {},
      style: "cancel",
    },
    {
      text: "Take Photo",
      onPress: () => {},
    },
    {
      text: "Add from Album",
      onPress: null,
    },
    {
      text: "Bulk Add from Album",
      onPress: () => {},
    },
    {
      text: "Paste",
      onPress: () => {},
    },
  ]);
};

export default AddNewOutfit;
