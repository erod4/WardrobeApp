import { View, Text } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeData } from "../GlobalHelperFunctions/GlobalHelperFunctions";

const SelectItemsPage = ({ route }) => {
  console.log(route.params);
  const { name } = route.params;
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default SelectItemsPage;
