import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

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
  return (
    <View style={style.ClothingItem}>
      <View style={style.itemType}>
        <Text style={style.itemTypeText}>{name}</Text>
      </View>
      <View style={style.getFromWadrobeButton}>
        <TouchableOpacity>
          {/* <Text style={style.getFromWadrobeText}>From Wardrobe</Text> */}
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
