import { View, Text, StyleSheet } from "react-native";
import React from "react";

const SettingsScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>SettingsScreen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: { backgroundColor: "#fff", width: "100%", height: "100%" },
});
export default SettingsScreen;
