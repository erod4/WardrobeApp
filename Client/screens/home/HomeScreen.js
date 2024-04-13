import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import WeatherSection from "./WeatherSection";
import RecentOutfits from "./RecentOutfits/RecentOutfits";
import RandomOutfitButton from "./RandomOutfit/RandomOutfitButton";
import PinnedOutfit from "./PinnedOutfit/PinnedOutfit";

const HomeScreen = () => {
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <SafeAreaView
        style={{
          backgroundColor: "#fff",
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
