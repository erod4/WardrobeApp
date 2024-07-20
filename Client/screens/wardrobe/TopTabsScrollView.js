import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "../Theme/ThemeContext";

const DATA = [
  {
    id: 1,
    title: "All",
  },
  {
    id: 6,
    title: "Outfits",
  },
  {
    id: 5,
    title: "Hats",
  },
  {
    id: 2,
    title: "Tops",
  },
  {
    id: 3,
    title: "Bottoms",
  },
  {
    id: 4,
    title: "Shoes",
  },
];
const Item = ({ item, onPress, backgroundColor, textColor }) => {
  const { theme } = useTheme();
  const isActive = textColor == theme.colors.text_secondary ? true : false;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style.Item,
        {
          backgroundColor: backgroundColor,
          borderBottomWidth: isActive ? 1.5 : 0,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Text style={[{ color: textColor }, style.ItemTitle]}>{item.title}</Text>
    </TouchableOpacity>
  );
};
const TopTabsScrollView = ({ setItem }) => {
  const { theme } = useTheme();
  const [selectedId, setSelectedId] = useState(DATA[0].id);
  const renderItem = ({ item }) => {
    const textColor =
      item.id === selectedId
        ? theme.colors.text_secondary
        : theme.colors.text_primary;
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          setItem(item.id);
        }}
        textColor={textColor}
      />
    );
  };

  return (
    <FlatList
      horizontal={true}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={style.TopTabScrollView}
      extraData={selectedId}
      showsHorizontalScrollIndicator={false}
    />
  );
};
const style = StyleSheet.create({
  TopTabScrollView: {},
  Item: { paddingHorizontal: 2, paddingVertical: 3, margin: 5, width: 60 },
  ItemTitle: { textAlign: "center" },
});
export default TopTabsScrollView;
