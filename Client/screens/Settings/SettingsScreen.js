import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { authContext } from "../Auth/AuthProvider/AuthProvider";
import SettingItem from "./SettingItem";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../Theme/ThemeContext";

const SettingsScreen = () => {
  const { theme } = useTheme();
  const navigator = useNavigation();
  const items = [
    "Change Password",
    "Privacy Policy",
    "Terms and Conditions",
    "About Us",
  ];
  const { userAuth } = useContext(authContext);
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text>Account</Text>
        <View style={styles.settingItemsContainer}>
          {items.map((idx) => {
            if (items[3] == idx) {
              return <SettingItem item={idx} isLast={true} key={idx} />;
            } else {
              return <SettingItem item={idx} isLast={false} key={idx} />;
            }
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    alignItems: "center",
    gap: 75,
  },
  topContainer: {
    width: "90%",
    gap: 20,
  },
  pageTitle: {
    width: "100%",
    fontSize: 20,
    fontWeight: "700",
  },
  editProfileContainer: {
    width: "100%",
    borderRadius: 10,
    padding: 5,
    // height: "30%",
    flexDirection: "row",
    gap: 5,
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  avatarImageContainer: {
    width: 75,
    height: 75,
    borderRadius: 100,
    borderWidth: 1,
  },
  nameContainer: {
    justifyContent: "center",
    gap: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
  },
  settingItemsContainer: {
    width: "90%",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
});
export default SettingsScreen;
