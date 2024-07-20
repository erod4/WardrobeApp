import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputContainer = ({ name, icon, type, placeholder }) => {
  const [focusColor, setFocusColor] = useState("#000");
  const onFocus = () => {
    setFocusColor("#3d348b");
  };
  const onEndFocus = () => {
    setFocusColor("#000");
  };
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { borderColor: focusColor }]}>
        <Text style={styles.title}>{name}</Text>

        <TextInput
          style={styles.input}
          onFocus={onFocus}
          onEndEditing={onEndFocus}
          placeholder={placeholder}
        />
        {icon && <FontAwesomeIcon icon={icon} />}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, width: "80%", gap: 5 },
  title: { fontSize: 11, fontWeight: "500" },
  inputContainer: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#ddd",
    padding: 5,
  },
  input: {},
});
export default InputContainer;
