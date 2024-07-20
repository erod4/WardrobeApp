import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheck,
  faImage,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AddClothingItemForm from "./AddClothingItemForm";
import { addClothingItemContext } from "./AddClothingItemContextProvider/AddClothingItemContext";
import { useNavigation } from "@react-navigation/native";
import Notification from "../Notification/Notification";

const AlbumSingle = ({ route, loading, navigation }) => {
  const { createPressed, navFrom, submitFormData, success, error } = useContext(
    addClothingItemContext
  );

  const [category, setCategory] = useState("Hats");
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [notifConfig, setNotifConfig] = useState({
    icon: null,
    message: "Uploading Item",
    type: 3,
  });
  const [formData, setFormData] = useState({
    image: null,
    name: null,
    category: category,
    type: type,
  });

  const { photo, copiedImage } = route.params;
  const [image, setImage] = useState(null);
  const navigator = useNavigation();

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
    // Check to see if image has been passed already
    if (!image && !photo && !copiedImage) {
      pickImage();
    }
    if (photo) {
      console.log(photo.uri);
      setImage(photo.uri);
    }
    if (copiedImage) {
      console.table(copiedImage);
      setImage(copiedImage.data);
    }
  }, []);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: category,
    }));
  }, [category]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: name,
    }));
  }, [name]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      type: type,
    }));
  }, [type]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: image,
    }));
  }, [image]);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setNotifConfig({ icon: null, message: "Removing Background", type: 3 });
      }, 4000);
      setTimeout(() => {
        setNotifConfig({ icon: null, message: "Saving Item", type: 3 });
      }, 9000);
    }
    navigation.setOptions({
      headerShown: !loading,
      headerShadowVisible: !loading,
      headerShadowVisible: false,
    });
  }, [loading]);
  useEffect(() => {
    if (success) {
      setNotifConfig({
        icon: faCheck,
        message: "Creation Success",
        type: 1,
      });
      console.log("NotifConfig: Creation Success");
      setTimeout(() => {
        setNotifConfig({ icon: null, message: "", type: 3 });
        navigator.navigate(navFrom);
      }, 6000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setNotifConfig({ icon: faXmark, message: "Creation Failed", type: 2 });
      console.log("NotifConfig: Creation Failed");
      setTimeout(() => {
        setNotifConfig({ icon: null, message: "", type: 3 });
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    if (createPressed) {
      // console.log(formData);
      if (
        !formData.image ||
        !formData.name ||
        !formData.category ||
        !formData.type
      ) {
        Alert.alert(
          "Required Fields Missing",
          "Please complete all required fields before proceeding."
        );
      } else {
        submitFormData(formData);
      }
    }
  }, [createPressed]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: loading ? 100 : 0 }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      {(loading || success || error) && (
        <Notification
          icon={notifConfig.icon}
          message={notifConfig.message}
          type={notifConfig.type}
          loading={loading}
        />
      )}
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
      <AddClothingItemForm
        setCategoryFormData={setCategory}
        onTypeSelect={setType}
        setName={setName}
      />
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
