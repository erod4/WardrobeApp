import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const ReturnButton = ({ navTo }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate(navTo);
  };
  return (
    <TouchableOpacity style={styles.DoneButton} onPress={handlePress}>
      <Text style={styles.DoneButtonText}>Cancel</Text>
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
export default ReturnButton;
