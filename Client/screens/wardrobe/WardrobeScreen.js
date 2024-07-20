import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TopTabsScrollView from "./TopTabsScrollView";
import { authContext } from "../Auth/AuthProvider/AuthProvider";
import ClothingItemsConainer from "../ClothingItems/ClothingItemsConainer";
import { useTheme } from "../Theme/ThemeContext";

const WardrobeScreen = () => {
  const { profile, getUserAction } = useContext(authContext);
  const { theme } = useTheme();
  useEffect(() => {
    getUserAction();
  }, [profile]);
  const [category, setCategory] = useState(1);
  return (
    <View
      style={[style.outerScreen, { backgroundColor: theme.colors.primary_100 }]}
    >
      <View style={style.innerScreen}>
        <TopTabsScrollView setItem={setCategory} />
      </View>
      {profile ? (
        <View style={style.ClothingItemsConainer}>
          {category == 1 && (
            <ClothingItemsConainer clothingItems={profile?.clothingItems} />
          )}
          {category == 2 && (
            <ClothingItemsConainer
              clothingItems={profile?.clothingItems?.filter(
                (item) => item.category === "Tops"
              )}
            />
          )}
          {category == 3 && (
            <ClothingItemsConainer
              clothingItems={profile?.clothingItems?.filter(
                (item) => item.category === "Bottoms"
              )}
            />
          )}
          {category == 4 && (
            <ClothingItemsConainer
              clothingItems={profile?.clothingItems?.filter(
                (item) => item.category === "shoes"
              )}
            />
          )}
          {category == 5 && (
            <ClothingItemsConainer
              clothingItems={profile.clothingItems?.filter(
                (item) => item.category === "Hats"
              )}
            />
          )}
        </View>
      ) : (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <ActivityIndicator />
          </View>
        </>
      )}
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
