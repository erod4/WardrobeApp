import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import LoginForm from "./LoginForm";

const LoginScreen = () => {
  return (
    <View style={styles.page}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{ width: "80%", gap: 10 }}>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>
            Hello, Welcome Back 👋
          </Text>
          <Text style={{ fontSize: 13, color: "#555" }}>
            Happy to see you again, please login here
          </Text>
        </View>
        <LoginForm />
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
export default LoginScreen;
