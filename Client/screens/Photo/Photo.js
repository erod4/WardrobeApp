import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBolt, faRotate } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

const Photo = ({ navigation }) => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const [flash, setFlash] = useState(false);
  const cameraRef = useRef(null);
  const navigator = useNavigation();
  const handleFlashPress = () => {
    setFlash(!flash);
  };
  const handleCameraReady = () => {
    setCameraReady(true);
  };
  const handleCancelPress = () => {
    navigation.goBack();
  };
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const takePhoto = async () => {
    if (cameraRef.current && cameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
        });
        navigator.navigate("ImageCapture", { photo });
      } catch (error) {
        console.error("Error taking photo:", error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          padding: 15,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 100,
            backgroundColor: "#222",
            width: 20,
            height: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleFlashPress}
        >
          <FontAwesomeIcon
            icon={faBolt}
            style={{ color: flash ? "yellow" : "white" }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <CameraView
          flash={flash ? "on" : "off"}
          ref={cameraRef}
          onCameraReady={handleCameraReady}
          style={styles.camera}
          facing={facing}
        ></CameraView>
      </View>

      <View style={styles.imageCaptureContainer}>
        <TouchableOpacity
          style={{ position: "absolute", left: 0, bottom: 20 }}
          onPress={handleCancelPress}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
            Cancel
          </Text>
        </TouchableOpacity>
        <Text style={styles.imageCaptureCameraType}>Photo</Text>
        <View style={styles.imageCaptureOptionsContainer}>
          <TouchableOpacity
            onPress={takePhoto}
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              borderColor: "#000",
              borderWidth: 2.25,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    flexDirection: "column",
    gap: 15,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    height: "60%",
    width: "100%",
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageCaptureContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    width: "90%",
  },

  imageCaptureCameraType: {
    color: "yellow",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",

    width: "100%",
  },
  imageCaptureOptionsContainer: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  rotateCotainer: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  //   allow access view
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default Photo;
