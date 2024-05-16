import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faImage,
  faImagePortrait,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import AddClothingItemForm from "./AddClothingItemForm";

const AlbumSingle = ({ route }) => {
  const { photo, copiedImage } = route.params;
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    //check to see if image has been passed already
    if (!image && !photo && !copiedImage) {
      pickImage();
    }
    if (photo) {
      setImage(photo.uri);
    }
    if (copiedImage) {
      setImage(copiedImage.data);
    }
  }, []);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <FontAwesomeIcon icon={faImage} size={25} />
          </View>
        )}
        <TouchableOpacity style={styles.replaceImageButton} onPress={pickImage}>
          <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#3d348b" }} />
        </TouchableOpacity>
      </View>
      <AddClothingItemForm />
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
    gap: 40,
    // justifyContent: "center",
  },
  imageContainer: {
    width: "90%",
    height: "60%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures the image fills the entire container
    borderRadius: 10,
  },
  imagePlaceholder: {
    backgroundColor: "#ddd",
    borderRadius: 5,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  replaceImageButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AlbumSingle;
