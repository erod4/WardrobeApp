import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { addToWardrobeContext } from "../homeContextProviders/AddToWardrobeContextProvider";

const RandomOutfitButton = () => {
  const { setModal, isModalOpen } = useContext(addToWardrobeContext);
  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.button}
        onPress={() => {
          console.log(isModalOpen);
        }}
      >
        <Text style={style.buttonText}>Generate Random Outfit</Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "90%",
    backgroundColor: "#3d348b",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 18,
    color: "#fff",
  },
});
export default RandomOutfitButton;
