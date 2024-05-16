import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, val) => {
  try {
    const jsonValue = JSON.stringify(val);
    const item = await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {}
};
export const readData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {}
};
export const clearData = async (key) => {
  try {
    const jsonValue = JSON.stringify(null);
    await AsyncStorage.setItem(key, jsonValue);
    return "success";
  } catch (error) {
    console.log(error);
  }
};

export const allDeviceStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log("All Device Storage", keys);
  } catch (error) {
    console.log("All Device Storage Error", error);
  }
};
