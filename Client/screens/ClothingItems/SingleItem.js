import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
const screenWidth = Dimensions.get("window").width;

const SingleItem = ({ name, image, id, category }) => {
  return (
    <View style={styles.clothingItem}>
      {/* <Text style={styles.title}>{name}</Text> */}
      <Image
        source={{ uri: image }}
        style={{
          width: (screenWidth - 20) / 3,
          height: (screenWidth - 20) / 3,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  clothingItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  title: {
    textAlign: "center",
  },
});
export default SingleItem;
