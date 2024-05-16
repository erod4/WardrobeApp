import { View, Text, Image, StyleSheet, Button } from "react-native";
import React from "react";

const ImageCapture = ({ route, navigation }) => {
  const { photo } = route.params;
  const handleRetakePress = () => {
    navigation.goBack();
  };
  const handleUsePhotoPress = () => {
    navigation.navigate("Album_Single", { photo });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: photo.uri }} style={styles.fullImage} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Retake" color={"white"} onPress={handleRetakePress} />
        <Button
          title="Use Photo"
          color={"white"}
          onPress={handleUsePhotoPress}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  imageContainer: {
    width: "100%",
    height: "65%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures the image fills the entire container
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    height: "12%",
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#111",
  },
});
export default ImageCapture;
