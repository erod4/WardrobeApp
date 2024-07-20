import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import ClothingItemFormOption from "./ClothingItemFormOption";

const AddClothingItemForm = ({
  setCategoryFormData,
  onTypeSelect,
  setName,
}) => {
  const categories = ["Hats", "Tops", "Bottoms", "Shoes"];
  const onCategorySelect = (val) => {
    console.log(val);
    setCategoryFormData(val);
  };

  return (
    <View style={styles.ClothingItemFormContainer}>
      <ClothingItemFormOption
        name={"Name"}
        placeholder={"e.g., LA Dodgers Hat"}
        type={1}
        setName={setName}
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
        type={1}
        placeholder={"e.g., T-shirt, Jeans, Jacket"}
        setName={onTypeSelect}
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
