import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as Haptics from "expo-haptics";

import React, { useEffect, useState } from "react";
import { storeData } from "../GlobalHelperFunctions/GlobalHelperFunctions";
import { useNavigation } from "@react-navigation/native";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
const screenWidth = Dimensions.get("window").width;

const SingleItem = ({
  name,
  image,
  id,
  category,
  outfitPage,
  globalEditMode,
  setGlobalEditMode,
  handleItemPressed,
}) => {
  const [itemPressed, setItemPressed] = useState(false);
  const navigator = useNavigation();
  const handleOutfitItemPress = () => {
    if (outfitPage) {
      console.log(image);
      storeData(name, image);
      navigator.navigate("AddNewOutfit");
    }
  };
  const handleLongPress = () => {
    setGlobalEditMode(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };
  const handleEditModeItemPress = () => {
    setItemPressed(!itemPressed);
    handleItemPressed(id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };
  useEffect(() => {
    if (!globalEditMode) {
      setItemPressed(false);
    }
  }, [globalEditMode]);
  return (
    <>
      {globalEditMode ? (
        <TouchableOpacity
          style={styles.clothingItem}
          onPress={handleEditModeItemPress}
        >
          <View
            style={[
              styles.selectImage,
              {
                backgroundColor: itemPressed ? "#7678ed" : "#fff",
                borderColor: itemPressed ? "#7678ed" : "#000",
              },
            ]}
          >
            {itemPressed && (
              <FontAwesomeIcon
                icon={faCheck}
                size={10}
                style={{ color: "#fff" }}
              />
            )}
          </View>

          <Image
            source={{ uri: image }}
            style={{
              width: (screenWidth - 30) / 3,
              height: (screenWidth - 30) / 3,
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.clothingItem}
          onPress={handleOutfitItemPress}
          onLongPress={handleLongPress}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: (screenWidth - 30) / 3,
              height: (screenWidth - 30) / 3,
            }}
          />
        </TouchableOpacity>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  selectImage: {
    position: "absolute",
    right: "3%",
    top: "1%",
    zIndex: 1,
    borderWidth: 1.25,
    borderRadius: 100,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
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
