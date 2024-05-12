import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ActionButton = ({ text, size, color, width, onPress }) => {
  return (
    <TouchableOpacity style={{ width }} onPress={onPress}>
      <Text
        style={{ fontSize: size, color, fontWeight: "700", textAlign: "right" }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
