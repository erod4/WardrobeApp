import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { fa0, fa1 } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../Theme/ThemeContext";

const LoginFormInput = ({
  value = "",
  name = "",
  icon = fa0,
  icon2 = fa1,
  type,
  handleInputChange,
  keyboard = "default",
}) => {
  const { theme } = useTheme();
  const [borderColor, setBorderColor] = useState(theme.colors.border);
  const [secureText, setSecureText] = useState(
    type == "password" ? true : false
  );
  const [formIconPressed, setFormIconPressed] = useState(true);
  const onIconPress = () => {
    setFormIconPressed(!formIconPressed);
    setSecureText(!secureText);
  };
  const onFocus = () => {
    setBorderColor(theme.colors.secondary_200);
  };

  const onEndFocus = () => {
    setBorderColor(theme.colors.border);
  };
  return (
    <View
      style={[
        styles.formInputContainer,
        { borderColor: borderColor, backgroundColor: theme.colors.primary_300 },
      ]}
    >
      <View style={styles.formInputInnerContainer}>
        <Text
          style={[
            {
              fontWeight: theme.font.bold,
              color: theme.colors.text_primary,
              fontSize: theme.font_size.small,
            },
          ]}
        >
          {name}
        </Text>
        <TextInput
          maxLength={type == "phone" ? 10 : 35}
          value={value}
          style={[
            styles.formInput,
            {
              fontSize: theme.font_size.medium,
              color: theme.colors.text_primary,
            },
          ]}
          onFocus={onFocus}
          onEndEditing={onEndFocus}
          keyboardType={keyboard ? keyboard : "default"}
          secureTextEntry={secureText}
          onChangeText={(text) => {
            handleInputChange(type, text);
          }}
        />
      </View>
      {type == "password" ? (
        <TouchableOpacity
          onPress={onIconPress}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "10%",
          }}
        >
          <FontAwesomeIcon
            icon={formIconPressed ? icon2 : icon}
            style={{ color: borderColor }}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "10%",
          }}
        >
          <FontAwesomeIcon icon={icon} style={{ color: borderColor }} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  formInputContainer: {
    borderWidth: 1.5,
    width: "80%",
    borderRadius: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "13%",
  },

  formInputInnerContainer: {
    flexDirection: "column",
    width: "90%",
  },
  formInput: {
    width: "100%",
  },
});
export default LoginFormInput;
