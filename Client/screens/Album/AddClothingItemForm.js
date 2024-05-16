import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import ClothingItemFormOption from "./ClothingItemFormOption";

const AddClothingItemForm = () => {
  const typesHats = ["Baseball-Cap", "Bucket Hat", "Fitted"];
  const typesTops = ["Jacket", "Shirt", "T-Shirt"];
  const typesBottoms = ["Pants", "Jeans", "Shorts"];
  const [type, setType] = useState(typesHats);
  const onHatSelect = () => {
    setType(typesHats);
  };
  const onTopSelect = () => {
    setType(typesTops);
  };
  const onBottomsSelect = () => {
    setType(typesBottoms);
  };
  const categories = ["Hats", "Tops", "Bottoms"];
  const onCategorySelect = (val) => {
    if (val == "Hats") {
      onHatSelect();
    } else if (val == "Tops") {
      onTopSelect();
    } else if (val == "Bottoms") {
      onBottomsSelect();
    }
  };
  const onTypeSelect = () => {};
  return (
    <View style={styles.ClothingItemFormContainer}>
      <ClothingItemFormOption
        name={"Name"}
        placeholder={"i.e. LA Dodgers Hat"}
        type={1}
      />
      <ClothingItemFormOption
        name={"Category"}
        type={2}
        placeholder={"Hats"}
        options={categories}
        onSelect={onCategorySelect}
      />
      <ClothingItemFormOption
        isLast={true}
        name={"Type"}
        options={type}
        placeholder={type[0]}
        onSelect={onTypeSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ClothingItemFormContainer: {
    gap: 5,
    width: "90%",
    borderRadius: 5,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
export default AddClothingItemForm;
