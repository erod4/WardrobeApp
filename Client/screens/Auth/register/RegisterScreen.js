import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import RegisterForm from "./RegisterForm";

const RegisterScreen = () => {
  return (
    <View>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{ width: "80%", gap: 10 }}>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>
            Hello, Welcome 👋
          </Text>
          <Text style={{ fontSize: 13, color: "#555" }}>
            Happy to see you, please sign up here
          </Text>
        </View>
        <RegisterForm />
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  page: {},
  safeAreaView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    gap: 50,
  },
});
export default RegisterScreen;
