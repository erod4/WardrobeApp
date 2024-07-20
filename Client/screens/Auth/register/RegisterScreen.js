import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import RegisterForm from "./RegisterForm";
import { useTheme } from "../../Theme/ThemeContext";
const RegisterScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.primary_100 }}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{ width: "80%", gap: 10 }}>
          <Text
            style={{
              fontWeight: theme.font.bold,
              fontSize: theme.font_size.large,
              color: theme.colors.text_primary,
            }}
          >
            Hello, Welcome 👋
          </Text>
          <Text
            style={{
              fontSize: theme.font_size.small,
              color: theme.colors.text_secondary,
            }}
          >
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
