import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LoginFormInput from "../login/LoginFormInput";
import {
  faEye,
  faEyeSlash,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ActionButton from "../login/ActionButton";
import { useNavigation } from "@react-navigation/native";
import LoginButton from "../login/LoginButton";
import { useTheme } from "../../Theme/ThemeContext";

const RegisterForm = () => {
  const { theme } = useTheme();

  const navigator = useNavigation();
  const navToLogin = () => {
    navigator.navigate("Login");
  };
  return (
    <View style={styles.form}>
      <LoginFormInput name={"Name"} icon={faUser} type={"name"} />
      <LoginFormInput name={"Phone Number"} icon={faPhone} type={"phone"} />
      <LoginFormInput
        name={"Password"}
        icon={faEye}
        icon2={faEyeSlash}
        type={"password"}
      />
      <LoginButton name={"Sign Up"} disabled={true} height={"13%"} />
      <View style={styles.noAccountContainer}>
        <Text
          style={{
            fontSize: theme.font_size.medium,
            color: theme.colors.text_primary,
          }}
        >
          Already have an account?
        </Text>
        <ActionButton
          text={"Login"}
          size={theme.font_size.medium}
          color={theme.colors.secondary_200}
          onPress={navToLogin}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  form: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    gap: 15,
  },
  noAccountContainer: {
    flexDirection: "row",
    gap: 5,

    flex: 1,
    alignItems: "flex-end",
  },
});
export default RegisterForm;
