import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import LoginFormInput from "./LoginFormInput";
import { faEye, faEyeSlash, faPhone } from "@fortawesome/free-solid-svg-icons";
import LoginButton from "./LoginButton";
import ActionButton from "./ActionButton";
import { useNavigation } from "@react-navigation/native";
import { formatPhoneNumber } from "../HelperFunctions";
import { authContext } from "../AuthProvider/AuthProvider";
import { useTheme } from "../../Theme/ThemeContext";

const LoginForm = () => {
  const { theme } = useTheme();
  const { loginUserAction, error, loading } = useContext(authContext);
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const handleInputChange = (field, value) => {
    if (field === "phone") {
      //format phone into (123) 456-7890
      const formattedValue = formatPhoneNumber(value);
      setFormData({
        ...formData,
        [field]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };
  const handleFormSubmit = () => {
    const rawPhoneLength = formData.phone.replace(/\D/g, "").length;
    if (rawPhoneLength < 10) {
      alert("Phone number must be 10 digits.");
      return;
    } else if (formData.password.length < 10) {
      alert("Password must be at least 10 characters.");
      return;
    }
    //submit form
    loginUserAction({
      ...formData,
      ["phone"]: formData.phone.replace(/\D/g, ""),
    });
  };

  //navigate to register page
  const navigator = useNavigation();
  const navToRegister = () => {
    navigator.navigate("Register");
  };
  ///////////////////////////////////////////////////////////

  const navToForgotPass = () => {};
  return (
    <View style={styles.form}>
      {error && (
        <Text style={{ color: theme.colors.text_error, position: "relative" }}>
          {error}
        </Text>
      )}
      <LoginFormInput
        name={"Phone Number"}
        icon={faPhone}
        handleInputChange={handleInputChange}
        type={"phone"}
        keyboard={"number-pad"}
        value={formData.phone}
      />
      <LoginFormInput
        value={formData.password}
        name={"Password"}
        icon={faEye}
        icon2={faEyeSlash}
        type={"password"}
        handleInputChange={handleInputChange}
      />
      <ActionButton
        text={"Forgot my password"}
        size={theme.font_size.small}
        color={theme.colors.text_primary}
        width={"80%"}
        onPress={navToForgotPass}
      />

      <LoginButton
        loading={loading}
        name={"Login"}
        disabled={loading ? false : false}
        onPress={handleFormSubmit}
      />
      <View style={styles.noAccountContainer}>
        <Text
          style={{
            fontSize: theme.font_size.medium,
            color: theme.colors.text_primary,
          }}
        >
          Dont have an account?
        </Text>
        <ActionButton
          text={"Register"}
          size={theme.font_size.medium}
          color={theme.colors.secondary_200}
          onPress={navToRegister}
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
export default LoginForm;
