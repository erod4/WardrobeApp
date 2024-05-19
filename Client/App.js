import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/home/HomeScreen";
import WardrobeScreen from "./screens/wardrobe/WardrobeScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomTabs from "./screens/nav/BottomTabs";
import AddToWardrobeContextProvider from "./screens/home/homeContextProviders/AddToWardrobeContextProvider";
import AddNewOutfit from "./screens/AddNewOutfit/AddNewOutfit";
import DoneButton from "./screens/AddNewOutfit/DoneButton";
import ReturnButton from "./screens/nav/ReturnButton";
import SelectItemsPage from "./screens/SelectItems/SelectItemsPage";
import LoginScreen from "./screens/Auth/login/LoginScreen";
import RegisterScreen from "./screens/Auth/register/RegisterScreen";
import AuthContextProvider from "./screens/Auth/AuthProvider/AuthProvider";
import Photo from "./screens/Photo/Photo";
import ImageCapture from "./screens/Photo/ImageCapture";
import AlbumSingle from "./screens/Album/AlbumSingle";
import { StyleSheet, StatusBar, Platform } from "react-native";
import CreateButton from "./screens/nav/CreateButton";
import AddClothingItemContextProvider from "./screens/Album/AddClothingItemContextProvider/AddClothingItemContext";
import SettingsScreen from "./screens/Settings/SettingsScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
        hidden={false} // Ensure the status bar is visible
        backgroundColor="transparent" // For Android to blend with the app background
        translucent={true} // For Android to overlay the content
      />
      <NavigationContainer>
        <AuthContextProvider>
          <AddClothingItemContextProvider>
            <AddToWardrobeContextProvider>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{
                    headerShown: false,
                    title: "Login",
                    headerBackVisible: false,
                  }}
                />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen}
                  options={{
                    headerShown: false,
                    title: "Register",
                    headerBackVisible: (
                      <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                          headerShown: false,
                          title: "Login",
                          headerBackVisible: false,
                        }}
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="Wardrobe"
                  component={WardrobeScreen}
                  options={{
                    title: "",
                  }}
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
                <Stack.Screen
                  name="AddNewOutfit"
                  component={AddNewOutfit}
                  options={{
                    title: "",
                    headerShadowVisible: false,
                    headerRight: () => <DoneButton />,
                    headerLeft: () => <ReturnButton navTo={"Nav"} />,
                    headerStyle: {
                      backgroundColor: "#fff",
                    },
                  }}
                />
                <Stack.Screen
                  name="SelectItemsPage"
                  component={SelectItemsPage}
                  options={{
                    headerShown: true,
                    title: "Make A Selection",
                    headerBackVisible: true,
                  }}
                />
                <Stack.Screen
                  name="Photo"
                  component={Photo}
                  options={{
                    headerShown: false,

                    headerBackVisible: false,
                  }}
                />
                <Stack.Screen
                  name="Settings"
                  component={SettingsScreen}
                  options={{
                    headerShown: true,
                    headerShadowVisible: false,

                    title: "Settings",
                    headerLeft: () => <ReturnButton navTo={"Nav"} />,
                    headerBackVisible: false,
                  }}
                />
                <Stack.Screen
                  name="Album_Single"
                  component={AlbumSingle}
                  options={{
                    title: "Create Item",
                    headerLeft: () => <ReturnButton navTo={"Nav"} />,
                    headerRight: () => <CreateButton />,
                    headerShadowVisible: false,

                    headerStyle: {
                      backgroundColor: "#fff",
                    },
                  }}
                />
                <Stack.Screen
                  name="ImageCapture"
                  component={ImageCapture}
                  options={{
                    headerShown: false,
                    title: "",
                    headerBackVisible: false,
                  }}
                />
              </Stack.Navigator>
            </AddToWardrobeContextProvider>
          </AddClothingItemContextProvider>
        </AuthContextProvider>
      </NavigationContainer>
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
