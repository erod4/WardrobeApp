import { View, Text, StyleSheet } from "react-native";
import React from "react";
import TopTabsScrollView from "./TopTabsScrollView";

const WardrobeScreen = () => {
  return (
    <View style={style.outerScreen}>
      <View style={style.innerScreen}>
        <TopTabsScrollView />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  outerScreen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerScreen: {
    marginTop: 70,
  },
});
export default WardrobeScreen;
