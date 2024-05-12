import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
const LoginFormInput = ({
  value,
  name,
  icon,
  icon2,
  type,
  handleInputChange,
  keyboard,
}) => {
  const [borderColor, setBorderColor] = useState("#000");
  const [secureText, setSecureText] = useState(
    type == "password" ? true : false
  );
  const [formIconPressed, setFormIconPressed] = useState(true);
  const onIconPress = () => {
    setFormIconPressed(!formIconPressed);
    setSecureText(!secureText);
  };
  const onFocus = () => {
    setBorderColor("#3d348b");
  };

  const onEndFocus = () => {
    setBorderColor("#000");
  };
  return (
    <View style={[styles.formInputContainer, { borderColor: borderColor }]}>
      <View style={styles.formInputInnerContainer}>
        <Text style={styles.formInputTitle}>{name}</Text>
        <TextInput
          maxLength={type == "phone" ? 10 : 35}
          value={value}
          style={styles.formInput}
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
            color={borderColor}
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
          <FontAwesomeIcon icon={icon} color={borderColor} />
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
    backgroundColor: "#ddd",
  },
  formInputTitle: {
    fontSize: 10,
    fontWeight: "700",
  },
  formInputInnerContainer: {
    flexDirection: "column",
    width: "90%",
  },
  formInput: {
    width: "100%",
    fontSize: 15,
  },
});
export default LoginFormInput;
