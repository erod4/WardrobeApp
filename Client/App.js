import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/home/HomeScreen";
import WardrobeScreen from "./screens/wardrobe/WardrobeScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomTabs from "./screens/nav/BottomTabs";
import AddToWardrobeContextProvider from "./screens/home/homeContextProviders/AddToWardrobeContextProvider";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AddToWardrobeContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Nav">
            <Stack.Screen
              name="Wardrobe"
              component={WardrobeScreen}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="Nav"
              component={BottomTabs}
              options={{
                headerShown: false,
                title: "Home",
                headerBackVisible: true,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AddToWardrobeContextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
