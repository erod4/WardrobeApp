import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";

const LoginButton = ({ name, onPress, disabled, height, loading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, { height: height ? height : "15%" }]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.buttonTitle}>{name}</Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: "#3d348b",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "#fff",
    width: "100%",
    textAlign: "center",
    paddingHorizontal: 20,
    fontWeight: "900",
  },
});
export default LoginButton;
