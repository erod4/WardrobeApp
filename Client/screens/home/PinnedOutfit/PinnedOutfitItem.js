import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const PinnedOutfitItem = ({ uri, height, width }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={{ width, height, resizeMode: "cover" }} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PinnedOutfitItem;
