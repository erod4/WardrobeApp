import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const RandomOutfitButton = () => {
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.button}>
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
