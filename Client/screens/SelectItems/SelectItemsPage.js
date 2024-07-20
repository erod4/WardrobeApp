import { View, Text, ScrollView } from "react-native";
import React, { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeData } from "../GlobalHelperFunctions/GlobalHelperFunctions";
import { authContext } from "../Auth/AuthProvider/AuthProvider";
import ClothingItemsConainer from "../ClothingItems/ClothingItemsConainer";

const getCategoryItems = (categoryName, profile) => {
  console.log(profile.clothingItems[0].category);
  return profile.clothingItems.filter((item) => item.category === categoryName);
};

const SelectItemsPage = ({ route }) => {
  const { name } = route.params;
  //map cetgory to clothing type
  const { profile } = useContext(authContext);
  const items = getCategoryItems(name, profile);

  return (
    <ScrollView style={{ paddingTop: 10 }}>
      <ClothingItemsConainer
        clothingItems={items}
        name={name}
        outfitPage={true}
      />
    </ScrollView>
  );
};

export default SelectItemsPage;
