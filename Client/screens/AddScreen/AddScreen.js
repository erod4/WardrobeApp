import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { addToWardrobeContext } from "../home/homeContextProviders/AddToWardrobeContextProvider";
import BottomSheetModal from "../home/AddNew Cothing Items Bottom Sheet/BottomSheetModal";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../Theme/ThemeContext";

const AddScreen = ({}) => {
  const { theme } = useTheme();
  const navigator = useNavigation();
  const {
    openBottomSheet,
    isBottomSheetOpen,
    newOutfitPress,
    navToNewOutfit,
    endNewOutfitNav,
  } = useContext(addToWardrobeContext);
  useEffect(() => {
    if (navToNewOutfit) {
      navigator.navigate("AddNewOutfit");
      endNewOutfitNav();
    }
  }, [navToNewOutfit]);
  const handleAddOutfitPress = () => {
    newOutfitPress();
  };
  const handleNewClothingItemPress = () => {
    openBottomSheet();
  };

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.primary_100,
      }}
    >
      <SafeAreaView
        style={[styles.screen, { backgroundColor: theme.colors.primary_100 }]}
      >
        <TouchableOpacity
          style={styles.container}
          onPress={handleAddOutfitPress}
        >
          <Text style={styles.containerText}>Add Outfit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          onPress={handleNewClothingItemPress}
        >
          <Text style={styles.containerText}>Add Clothing Item</Text>
        </TouchableOpacity>
        {isBottomSheetOpen && <BottomSheetModal />}
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    gap: 5,
  },
  container: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: "100%",
    backgroundColor: "#7678ed",
  },
  containerText: {
    fontWeight: "700",
    color: "#fff",
    fontSize: 15,
  },
});
export default AddScreen;
