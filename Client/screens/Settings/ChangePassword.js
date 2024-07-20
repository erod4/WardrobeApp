import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const changePassword = () => {
  const [isPassword, setIsPassword] = useState(true);
  const [passBorderColor, setPassBorderColor] = useState("#000");
  const [confirmPassBorderColor, setConfirmPassBorderColor] = useState("#000");

  const [isConfirmPassword, setIsConfirmPassword] = useState(true);
  const onPassFocus = () => {
    setPassBorderColor("#3d348b");
  };
  const onEndPassFocus = () => {
    setPassBorderColor("#000");
  };
  const onConfirmPassFocus = () => {
    setConfirmPassBorderColor("#3d348b");
  };
  const onEndConfirmPassFocus = () => {
    setConfirmPassBorderColor("#000");
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerTitle}>New Password</Text>
        <View
          style={[styles.inputContainerInput, { borderColor: passBorderColor }]}
        >
          <TextInput
            autoCapitalize="none"
            style={{ width: "93%" }}
            secureTextEntry={isPassword ? true : false}
            onFocus={onPassFocus}
            onEndEditing={onEndPassFocus}
          />
          <TouchableOpacity
            onPress={() => {
              setIsPassword(!isPassword);
            }}
          >
            <FontAwesomeIcon
              icon={isPassword ? faEye : faEyeSlash}
              color={passBorderColor}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerTitle}>Confirm New Password</Text>
        <View
          style={[
            styles.inputContainerInput,
            { borderColor: confirmPassBorderColor },
          ]}
        >
          <TextInput
            autoCapitalize="none"
            style={{ width: "93%" }}
            secureTextEntry={isConfirmPassword ? true : false}
            onFocus={onConfirmPassFocus}
            onEndEditing={onEndConfirmPassFocus}
          />
          <TouchableOpacity
            onPress={() => {
              setIsConfirmPassword(!isConfirmPassword);
            }}
          >
            <FontAwesomeIcon
              icon={isConfirmPassword ? faEye : faEyeSlash}
              color={confirmPassBorderColor}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  inputContainer: {
    width: "100%",
  },
  updateButton: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#3d348b",
    height: "20%",
    marginTop: 20,
  },
  updateButtonText: { fontWeight: "700", color: "#fff" },
  inputContainerTitle: {
    fontWeight: "700",
  },
  inputContainerInput: {
    borderRadius: 5,
    borderWidth: 1.5,
    height: 30,
    backgroundColor: "#ddd",
    padding: 5,
    flexDirection: "row",
  },
});
export default changePassword;
