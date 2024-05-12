import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TopTabsScrollView from "./TopTabsScrollView";
import { authContext } from "../Auth/AuthProvider/AuthProvider";
import ClothingItemsConainer from "../ClothingItems/ClothingItemsConainer";

const WardrobeScreen = () => {
  const { profile, getUserAction } = useContext(authContext);

  const [category, setCategory] = useState(0);
  return (
    <View style={style.outerScreen}>
      <View style={style.innerScreen}>
        <TopTabsScrollView setItem={setCategory} />
      </View>
      <View style={style.ClothingItemsConainer}>
        {category == 1 && <View></View>}
        {category == 2 && <View></View>}
        {category == 3 && <View></View>}
        {category == 4 && <View></View>}
        {category == 5 && (
          <ClothingItemsConainer
            clothingItems={profile.clothingItems.filter(
              (item) => item.category === "hats"
            )}
          />
        )}
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
  ClothingItemsConainer: {
    paddingTop: 20,
    alignItems: "center",
    height: "100%",
  },
});
export default WardrobeScreen;
