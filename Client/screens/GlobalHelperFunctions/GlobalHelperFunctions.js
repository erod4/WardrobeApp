import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, val) => {
  try {
    const jsonValue = JSON.stringify(val);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {}
};
export const readData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    // console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {}
};
export const clearData = async (key) => {
  try {
    const jsonValue = JSON.stringify(null);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {}
};
