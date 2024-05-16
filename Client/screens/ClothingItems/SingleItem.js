import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { storeData } from "../GlobalHelperFunctions/GlobalHelperFunctions";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;

const SingleItem = ({ name, image, id, category, outfitPage }) => {
  const navigator = useNavigation();
  const handleOutfitItemPress = () => {
    if (outfitPage) {
      console.log(image);
      storeData(name, image);
      navigator.navigate("AddNewOutfit");
    }
  };
  return (
    <TouchableOpacity
      style={styles.clothingItem}
      onPress={handleOutfitItemPress}
    >
      {/* <Text style={styles.title}>{name}</Text> */}
      <Image
        source={{ uri: image }}
        style={{
          width: (screenWidth - 30) / 3,
          height: (screenWidth - 30) / 3,
        }}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  clothingItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 3,
  },
  title: {
    textAlign: "center",
  },
});
export default SingleItem;
