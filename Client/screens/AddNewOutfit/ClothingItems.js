import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleMinus,
  faCircleXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  clearData,
  readData,
} from "../GlobalHelperFunctions/GlobalHelperFunctions";

const ClothingItems = () => {
  const clothingItemNames = [
    { name: "Hat", height: "15%", width: "25%" },
    { name: "Top", height: "23%", width: "35%" },
    { name: "Bottoms", height: "30%", width: "35%" },
    { name: "Shoes", height: "15%", width: "25%" },
  ];
  return (
    <View style={style.ClothingItems}>
      {clothingItemNames.map((index) => {
        return (
          <ClothingItem
            name={index.name}
            key={index.name}
            height={index.height}
            width={index.width}
          />
        );
      })}
    </View>
  );
};

const ClothingItem = ({ name, width, height }) => {
  const [item, setItem] = useState(null);
  //if user previously selected item check storage for item then display it and show remove item button
  useFocusEffect(
    React.useCallback(() => {
      const fetchDataFromStorage = async () => {
        const data = await readData(name);
        setItem(data);
      };

      fetchDataFromStorage();

      // Optionally return a function that runs on unmount
      return () => {
        // const deleteFromStorage = async () => {
        //   await clearData(name);
        // };
        // deleteFromStorage();
      };
    }, [name])
  );
  //handle select item
  const navigator = useNavigation();
  const handlePress = () => {
    navigator.navigate("SelectItemsPage", { name });
  };
  //remove item from storage if xmark is pressed
  const handleClearItem = async () => {
    try {
      await clearData(name);
      setItem(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={[style.ClothingItem, { height, width }]}>
      {item && (
        <TouchableOpacity style={style.clearItem} onPress={handleClearItem}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            style={{ color: "#000" }}
            size={20}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handlePress}
      >
        {item ? (
          <Image source={{ uri: item }} style={style.Image} />
        ) : (
          <FontAwesomeIcon icon={faPlus} style={{ color: "#000" }} size={40} />
        )}
      </TouchableOpacity>
      <View style={style.itemType}>
        <Text style={style.itemTypeText}>{name}</Text>
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
    backgroundColor: "#fff",
  },
  ClothingItem: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  clearItem: {
    position: "absolute",
    left: -10,
    top: -10,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",

    zIndex: 1,
  },
  itemType: {
    backgroundColor: "rgba(118	,120	,237, 0.3)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: "100%",
  },
  itemTypeText: { textAlign: "center", fontWeight: "bold" },

  getFromWadrobeText: {
    fontSize: 10,
  },
  Image: { width: "100%", height: "100%", resizeMode: "cover" },
});
export default ClothingItems;
