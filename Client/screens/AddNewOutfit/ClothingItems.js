import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowAltCircleRight,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { readData } from "../GlobalHelperFunctions/GlobalHelperFunctions";

const ClothingItems = () => {
  const clothingItemNames = ["Hat", "Top", "Bottoms", "Shoes"];
  return (
    <View style={style.ClothingItems}>
      {clothingItemNames.map((index) => {
        return <ClothingItem name={index} key={index} />;
      })}
    </View>
  );
};

const ClothingItem = ({ name }) => {
  const [item, setItem] = useState(null);
  //if user previously selected item check storage for item then display it and show remove item button
  useEffect(() => {
    const fetchDataFromStorage = async () => {
      setItem(await readData(name));
    };
    fetchDataFromStorage();
  }, []);
  //handle select item
  const navigator = useNavigation();
  const handlePress = () => {
    navigator.navigate("SelectItemsPage", { name });
  };
  //remove item from storage if xmark is pressed
  const handleClearItem = async () => {
    await clearData(name);
  };
  return (
    <View style={style.ClothingItem}>
      <View style={style.itemType}>
        <Text style={style.itemTypeText}>{name}</Text>
        {item && (
          <TouchableOpacity style={style.clearItem} onPress={handleClearItem}>
            <FontAwesomeIcon icon={faXmarkCircle} />
          </TouchableOpacity>
        )}
      </View>
      <View style={style.getFromWadrobeButton}>
        <TouchableOpacity onPress={handlePress}>
          <FontAwesomeIcon
            icon={faArrowAltCircleRight}
            size={22}
            color="#3d348b"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  ClothingItems: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    // flex: 1,
    height: "100%",
    // width: "100%",
  },
  ClothingItem: {
    height: "23%",
    width: "55%",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  clearItem: {
    position: "absolute",
    left: -5,
    top: -5,
  },
  itemType: {
    backgroundColor: "rgba(118	,120	,237, 0.3)",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemTypeText: { textAlign: "center", fontWeight: "bold" },
  getFromWadrobeButton: {
    position: "absolute",
    right: "-25%",
    top: "50%",
  },
  getFromWadrobeText: {
    fontSize: 10,
  },
});
export default ClothingItems;
