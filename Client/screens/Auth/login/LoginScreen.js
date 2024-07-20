import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useContext } from "react";
import LoginForm from "./LoginForm";
import { authContext } from "../AuthProvider/AuthProvider";
import { useTheme } from "../../Theme/ThemeContext";

const LoginScreen = () => {
  const { error } = useContext(authContext);
  const { theme } = useTheme();

  return (
    <View style={[styles.page, { backgroundColor: theme.colors.primary_100 }]}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{ width: "80%", gap: 10 }}>
          <Text
            style={{
              fontWeight: theme.font.bold,
              fontSize: theme.font_size.large,
              color: theme.colors.text_primary,
            }}
          >
            Hello, Welcome Back 👋
          </Text>
          <Text
            style={{
              fontSize: theme.font_size.small,
              color: theme.colors.text_secondary,
            }}
          >
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
    gap: 50,
  },
});
export default LoginScreen;
