import { View, Text, StyleSheet } from "react-native";
import React from "react";

const PinnedOutfit = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pinned Outfit</Text>
      <View style={styles.pinnedOutfit}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "33%",
  },
  title: {
    textAlign: "left",
    width: "90%",
    fontWeight: "700",
    fontSize: 15,
  },
  pinnedOutfit: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#ddd",
    height: "100%",
  },
});
export default PinnedOutfit;
