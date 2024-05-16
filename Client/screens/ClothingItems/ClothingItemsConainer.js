import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import SingleItem from "./SingleItem";

const ClothingItemsConainer = ({ clothingItems, name, outfitPage }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        alignItems: "flex-start",
        paddingHorizontal: 5,
      }}
    >
      {clothingItems.map((item) => {
        return (
          <SingleItem
            key={item.id}
            name={name}
            image={item.imageURL}
            outfitPage={outfitPage}
          />
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { width: "100%" },
});
export default ClothingItemsConainer;
