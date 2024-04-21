import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { addToWardrobeContext } from "../home/homeContextProviders/AddToWardrobeContextProvider";

const AddToWardrobeButton = ({ onPress, width, height }) => {
  return (
    <>
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
            width,
            height,
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
    </>
  );
};

export const ModalButton = ({ onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <AddToWardrobeButton onPress={onPress} width={50} height={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 100,
    width: 100,
    backgroundColor: "red",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
    paddingBottom: 20,
  },
});

export default AddToWardrobeButton;
