import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";

const DoneButton = () => {
  const handlePress = () => {
    Alert.alert("Done?", "", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Save & Pin Outfit",
        onPress: () => {},
      },
      {
        text: "Save Outfit",
        onPress: null,
      },
    ]);
  };
  return (
    <TouchableOpacity style={styles.DoneButton} onPress={handlePress}>
      <Text style={styles.DoneButtonText}>Done</Text>
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
export default DoneButton;
