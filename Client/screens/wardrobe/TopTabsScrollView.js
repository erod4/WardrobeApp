import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
const DATA = [
  {
    id: "1",
    title: "All",
  },
  {
    id: "8",
    title: "Outfits",
  },
  {
    id: "2",
    title: "Tops",
  },
  {
    id: "3",
    title: "Pants",
  },
  {
    id: "4",
    title: "Shorts",
  },
  {
    id: "5",
    title: "Hats",
  },
  {
    id: "6",
    title: "Socks",
  },
  {
    id: "7",
    title: "Shoes",
  },
];
const Item = ({ item, onPress, backgroundColor, textColor }) => {
  const isActive = textColor == "black" ? true : false;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        { backgroundColor: "#fff", borderBottomWidth: isActive ? 1.5 : 0 },
        style.Item,
      ]}
    >
      <Text style={[{ color: textColor }, style.ItemTitle]}>{item.title}</Text>
    </TouchableOpacity>
  );
};
const TopTabsScrollView = () => {
  const [selectedId, setSelectedId] = useState(DATA[0].id);
  const renderItem = ({ item }) => {
    const textColor = item.id === selectedId ? "black" : "grey";
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
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
  Item: { paddingHorizontal: 5, paddingVertical: 3, margin: 5, width: 60 },
  ItemTitle: { textAlign: "center" },
});
export default TopTabsScrollView;
