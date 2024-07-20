import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ChangePassword from "./ChangePassword";
import TermsConditions from "./TermsConditions";
import About from "./About";
import PrivacyPolicy from "./PrivacyPolicy";

const SettingItem = ({ item, isLast }) => {
  const items = [
    "Change Password",
    "Privacy Policy",
    "Terms and Conditions",
    "About Us",
  ];

  const [isPanOpen, setIsPanOpen] = useState(false);
  const onPress = () => {
    setIsPanOpen(!isPanOpen);
  };
  return (
    <>
      <View style={[styles.item, { borderBottomWidth: isLast ? 0 : 0.5 }]}>
        <Text style={styles.itemText}>{item}</Text>
        <TouchableOpacity onPress={onPress}>
          <FontAwesomeIcon
            icon={isPanOpen ? faChevronDown : faChevronRight}
            color="#3d348b"
          />
        </TouchableOpacity>
      </View>
      {isPanOpen && item === items[0] && <ChangePassword />}
      {isPanOpen && item === items[1] && <PrivacyPolicy />}
      {isPanOpen && item === items[2] && <TermsConditions />}
      {isPanOpen && item === items[3] && <About />}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "95%",
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#ddd",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
export default SettingItem;
