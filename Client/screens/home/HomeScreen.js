import { View, Text, SafeAreaView } from "react-native";
import React, { useContext, useEffect } from "react";
import WeatherSection from "./WeatherSection";
import RecentOutfits from "./RecentOutfits/RecentOutfits";
import RandomOutfitButton from "./RandomOutfit/RandomOutfitButton";
import PinnedOutfit from "./PinnedOutfit/PinnedOutfit";
import { addToWardrobeContext } from "./homeContextProviders/AddToWardrobeContextProvider";
import { authContext } from "../Auth/AuthProvider/AuthProvider";

const HomeScreen = ({ navigation }) => {
  const { isModalOpen, setModal, navToNewOutfit } =
    useContext(addToWardrobeContext);
  const { profile, getUserAction } = useContext(authContext);
  useEffect(() => {
    getUserAction();
  }, []);
  //if new outfit button is pressed in modal then nav to screen
  useEffect(() => {
    if (navToNewOutfit) {
      navigation.navigate("AddNewOutfit");
    }
  }, [navToNewOutfit]);

  return (
    <View style={{ backgroundColor: "#ddd" }}>
      <SafeAreaView
        style={{
          backgroundColor: "#ddd",
          height: "100%",
          gap: 12,
        }}
      >
        <WeatherSection />
        <PinnedOutfit />

        <RecentOutfits />
        <RandomOutfitButton />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
