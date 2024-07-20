import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { addClothingItemContext } from "../Album/AddClothingItemContextProvider/AddClothingItemContext";

const CreateButton = () => {
  const { createButtonPressed, navFrom, setNavFrom } = useContext(
    addClothingItemContext
  );
  const onPress = () => {
    createButtonPressed(true);
    console.log("Came from ", navFrom, " Screen");
    setTimeout(() => {
      createButtonPressed(false);
    }, 3);
  };
  return (
    <TouchableOpacity style={styles.DoneButton} onPress={onPress}>
      <Text style={styles.DoneButtonText}>Create</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  DoneButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  DoneButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
export default CreateButton;
