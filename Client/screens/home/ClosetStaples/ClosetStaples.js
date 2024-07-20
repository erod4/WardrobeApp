import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { useTheme } from "../../Theme/ThemeContext";

const ClosetStaples = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.text_primary,
            fontWeight: theme.font.bold,
            fontSize: theme.font_size.medium,
          },
        ]}
      >
        Staples
      </Text>
      <View
        style={[
          styles.pinnedOutfit,
          { backgroundColor: theme.colors.primary_200 },
        ]}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}></View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  blurview: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    textAlign: "center",
    width: "100%",
  },
  pinnedOutfit: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
});
export default ClosetStaples;
