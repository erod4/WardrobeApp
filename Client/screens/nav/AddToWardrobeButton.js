import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";

const AddToWardrobeButton = () => {
  onPress = () => {
    console.log("Enable Modal");
  };
  return (
    <TouchableOpacity
      style={{
        top: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 65,
          height: 65,
          borderRadius: 100,
          backgroundColor: "#3d348b",
          justifyContent: "center",
          alignItems: "center",
          // Shadow for iOS
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          // Elevation for Android
          elevation: 8,
        }}
      >
        <FontAwesomeIcon icon={faPlus} size={25} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    height: 100,
    width: 100,
    backgroundColor: "red",
  },
});
export default AddToWardrobeButton;
