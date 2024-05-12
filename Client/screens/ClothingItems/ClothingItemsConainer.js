import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SingleItem from "./SingleItem";

const ClothingItemsConainer = ({ clothingItems }) => {
  return (
    <View style={styles.container}>
      {clothingItems.map((item) => {
        return (
          <SingleItem key={item.id} name={item.name} image={item.imageURL} />
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start", // ensures items are aligned to the left
    gap: 5, // padding around the entire container
  },
});
export default ClothingItemsConainer;
