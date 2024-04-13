import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../home/HomeScreen";
import WardrobeScreen from "../wardrobe/WardrobeScreen";
import AddToWardrobeButton from "./AddToWardrobeButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faShirt, faHome } from "@fortawesome/free-solid-svg-icons";
const Placeholder = () => null; // Or return minimal UI

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#7678ed",
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: { backgroundColor: "#444" },
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
              color={focused ? "#7678ed" : "#fff"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddToWardrobe"
        component={Placeholder}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={{ color: focused ? "#7DCEA0" : "#C8C8C8" }}>+</Text>
          ),
          tabBarButton: () => <AddToWardrobeButton />,
          headerShown: false,
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
              color={focused ? "#7678ed" : "#fff"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
