import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import InputContainer from "./InputContainer";

const EditProfileScreen = ({ route }) => {
  console.log(route);
  const { firstName, lastName, phone } = route.params;

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image />
      </View>
      <View style={styles.nameContainer}>
        <InputContainer name={"First Name"} placeholder={firstName} />
        <InputContainer name={"Last Name"} placeholder={lastName} />

        <InputContainer name={"Phone-Number"} placeholder={phone} />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save and Continue</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 80,
    justifyContent: "center",
  },
  nameContainer: {
    // flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    backgroundColor: "#3d348b",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff" },
});
export default EditProfileScreen;
