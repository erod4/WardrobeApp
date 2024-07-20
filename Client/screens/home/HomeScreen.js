import { View, Text, SafeAreaView } from "react-native";
import React, { useContext, useEffect } from "react";

import RecentOutfits from "./RecentOutfits/RecentOutfits";
import PinnedOutfit from "./PinnedOutfit/PinnedOutfit";
import { addToWardrobeContext } from "./homeContextProviders/AddToWardrobeContextProvider";
import { authContext } from "../Auth/AuthProvider/AuthProvider";
import { allDeviceStorage } from "../GlobalHelperFunctions/GlobalHelperFunctions";
import { addClothingItemContext } from "../Album/AddClothingItemContextProvider/AddClothingItemContext";
import WeatherWidget from "./WeatherWidget/WeatherWidget";
import ClosetStaples from "./ClosetStaples/ClosetStaples";
import { useTheme } from "../Theme/ThemeContext";

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { navToNewOutfit } = useContext(addToWardrobeContext);
  const { getUserAction } = useContext(authContext);
  const { setNavFrom } = useContext(addClothingItemContext);
  useEffect(() => {
    allDeviceStorage();
    getUserAction();
    setNavFrom(null);
  }, []);
  //if new outfit button is pressed in modal then nav to screen
  useEffect(() => {
    if (navToNewOutfit) {
      navigation.navigate("AddNewOutfit");
    }
  }, [navToNewOutfit]);

  return (
    <View style={{ backgroundColor: theme.colors.primary_100 }}>
      <SafeAreaView
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",

          gap: 20,
        }}
      >
        <WeatherWidget />
        <View
          style={{
            width: "90%",
            flexDirection: "row",

            gap: 10,
          }}
        >
          <PinnedOutfit />
          <ClosetStaples />
        </View>

        <RecentOutfits />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
