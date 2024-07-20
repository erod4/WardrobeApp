import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import HomeScreen from "../home/HomeScreen";
import WardrobeScreen from "../wardrobe/WardrobeScreen";
import AddToWardrobeButton from "./AddToWardrobeButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlus,
  faShirt,
  faHome,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { addToWardrobeContext } from "../home/homeContextProviders/AddToWardrobeContextProvider";
import BottomSheetModal from "../home/AddNew Cothing Items Bottom Sheet/BottomSheetModal";
import SettingsScreen from "../Settings/SettingsScreen";
import AddScreen from "../AddScreen/AddScreen";
import { useTheme } from "../Theme/ThemeContext";

const BottomTabs = () => {
  const { theme } = useTheme();
  const { openBottomSheet, isBottomSheetOpen } =
    useContext(addToWardrobeContext);
  const Placeholder = () => {
    return null;
  }; // Or return minimal UI
  const Tab = createBottomTabNavigator();
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.secondary_100,
          tabBarInactiveTintColor: theme.colors.text_primary,
          tabBarStyle: {
            backgroundColor: theme.colors.primary_300,
            borderTopColor: theme.colors.primary_200,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FontAwesomeIcon
                icon={faHome}
                color={
                  focused
                    ? theme.colors.secondary_100
                    : theme.colors.text_primary
                }
              />
            ),
          }}
        />

        <Tab.Screen
          name="Wardrobe"
          component={WardrobeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FontAwesomeIcon
                icon={faShirt}
                color={
                  focused
                    ? theme.colors.secondary_100
                    : theme.colors.text_primary
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FontAwesomeIcon
                icon={faPlus}
                color={
                  focused
                    ? theme.colors.secondary_100
                    : theme.colors.text_primary
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FontAwesomeIcon
                icon={faCog}
                color={
                  focused
                    ? theme.colors.secondary_100
                    : theme.colors.text_primary
                }
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabs;
