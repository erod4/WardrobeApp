import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import Dropdown from "./Dropdown";

const ClothingItemFormOption = ({
  name,
  placeholder,
  type,
  options,
  onSelect,
  setName,
}) => {
  const [descr, setDescr] = useState(null);

  const handleInputChange = (text) => {
    setName(text);
    setDescr(text);
  };

  return (
    <View style={[styles.ClothingItemFormOptionContainer, {}]}>
      <Text style={styles.text}>{name}</Text>

      {type === 1 ? (
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          onChangeText={handleInputChange}
          value={descr}
        />
      ) : (
        <Dropdown
          onSelect={onSelect}
          options={options}
          placeholder={placeholder}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ClothingItemFormOptionContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: "#ddd",
    borderRadius: 5,

    height: 40, // Ensure the container has enough height
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "left", // Align text to the left within the text container
    textAlignVertical: "center", // Center text vertically
  },
  textInput: {
    width: "60%",
    height: "100%",
    textAlign: "justify",
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
});

export default ClothingItemFormOption;
