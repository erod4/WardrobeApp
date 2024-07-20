import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SingleItem from "./SingleItem";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { addClothingItemContext } from "../Album/AddClothingItemContextProvider/AddClothingItemContext";
import Notification from "../Notification/Notification";
import { useTheme } from "../Theme/ThemeContext";

const ClothingItemsConainer = ({ clothingItems, name, outfitPage }) => {
  const { theme } = useTheme();
  const { deleteClothingItems, loading } = useContext(addClothingItemContext);
  const [itemsToDelete, setItemsToDelete] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [itemsToDeleteSize, setItemsToDeleteSize] = useState(0);
  const onEditModeCancelPress = () => {
    setEditMode(false);
    setItemsToDelete({});
    setItemsToDeleteSize(0);
  };
  const handleItemPress = (id) => {
    setItemsToDelete((prevItems) => ({
      ...prevItems,
      [id]: !prevItems[id],
    }));
  };
  useEffect(() => {
    const len = Object.keys(itemsToDelete).filter(
      (key) => itemsToDelete[key]
    ).length;
    setItemsToDeleteSize(len);
  }, [itemsToDelete]);

  const filterItemsToDelete = () => {
    const deleteTheseItems = [];
    //filters items by value matching 'true' then return all ids as an array
    Object.keys(itemsToDelete).filter((key) => {
      const val = itemsToDelete[key];
      if (val) {
        deleteTheseItems.push(key);
      }
      return;
    });
    return deleteTheseItems;
  };
  const onDeleteSelectedItems = () => {
    //delete items if size is greater than 0
    if (itemsToDeleteSize > 0) {
      Alert.alert(
        "Cofirm Deletion",
        `Delete ${itemsToDeleteSize} Item${itemsToDeleteSize > 1 ? "s" : ""}`,
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Confirm ",
            onPress: () => {
              const idsToDelete = filterItemsToDelete();
              deleteClothingItems(idsToDelete);
              setEditMode(false);
              setItemsToDelete({});
              setItemsToDeleteSize(0);
            },
          },
        ]
      );
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "flex-start",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "flex-start",
          paddingHorizontal: 5,
        }}
      >
        {loading && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <Notification
              loading={loading}
              message={"Deleting Items"}
              type={3}
            />
          </View>
        )}
        {clothingItems.map((item) => {
          return (
            <SingleItem
              key={item.id}
              id={item.id}
              name={name}
              image={item.imageURL}
              outfitPage={outfitPage}
              globalEditMode={editMode}
              setGlobalEditMode={setEditMode}
              handleItemPressed={handleItemPress}
            />
          );
        })}
      </ScrollView>
      {editMode && (
        <View style={styles.editModeContainer}>
          <TouchableOpacity
            style={styles.leftEditContainer}
            disabled={itemsToDeleteSize > 0 ? false : true}
            onPress={onDeleteSelectedItems}
          >
            <Text
              style={[
                styles.editTextTitle,
                {
                  color: itemsToDeleteSize > 0 ? "red" : "#999",
                },
              ]}
            >
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rightEditContainer}
            onPress={onEditModeCancelPress}
          >
            <Text style={styles.editTextTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: { width: "100%", marginBottom: "30%" },
  editModeContainer: {
    position: "absolute",
    bottom: "18%",
    right: "5%",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 0.25,
    borderColor: "#ddd",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 5,
  },
  leftEditContainer: {
    width: 55,
    height: "100%",
    justifyContent: "center",
    borderRightWidth: 0.25,
    borderRightColor: "#ddd",
  },
  rightEditContainer: {
    width: 55,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  editTextTitle: { fontWeight: "700" },
});

export default ClothingItemsConainer;
