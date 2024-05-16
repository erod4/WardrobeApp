import { View, Text, SafeAreaView } from "react-native";
import React, { useContext, useEffect } from "react";
import WeatherSection from "./WeatherSection";
import RecentOutfits from "./RecentOutfits/RecentOutfits";
import RandomOutfitButton from "./RandomOutfit/RandomOutfitButton";
import PinnedOutfit from "./PinnedOutfit/PinnedOutfit";
import { addToWardrobeContext } from "./homeContextProviders/AddToWardrobeContextProvider";
import { authContext } from "../Auth/AuthProvider/AuthProvider";
import { allDeviceStorage } from "../GlobalHelperFunctions/GlobalHelperFunctions";

const HomeScreen = ({ navigation }) => {
  const { isModalOpen, setModal, navToNewOutfit } =
    useContext(addToWardrobeContext);
  const { profile, getUserAction } = useContext(authContext);
  useEffect(() => {
    allDeviceStorage();
    getUserAction();
  }, []);
  //if new outfit button is pressed in modal then nav to screen
  useEffect(() => {
    if (navToNewOutfit) {
      navigation.navigate("AddNewOutfit");
    }
  }, [navToNewOutfit]);

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <SafeAreaView
        style={{
          backgroundColor: "#fff",
          height: "100%",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
      >
        <WeatherSection />
        <PinnedOutfit />

        <RecentOutfits />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
