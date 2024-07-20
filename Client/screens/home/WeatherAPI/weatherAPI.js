import axios from "react-native-axios";
import * as Location from "expo-location";
import { WEATHER_API_KEY, GOOGLE_MAPS_API_KEY } from "@env";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
const getCoords = async () => {
  lat = null;
  long = null;
  try {
    // Request permission to access location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return { lat, long };
    }

    // Get the current location of the user
    const location = await Location.getCurrentPositionAsync({});
    lat = location.coords.latitude;
    long = location.coords.longitude;
  } catch (error) {
    console.log(`Location Error: ${error}`);
  }
  return { lat, long };
};

const getAddress = async () => {
  const { lat, long } = await getCoords();
  setKey(GOOGLE_MAPS_API_KEY);
  try {
    const res = await geocode(RequestType.LATLNG, `${lat},${long}`, {
      location_type: "ROOFTOP", // Override location type filter for this request.
      enable_address_descriptor: true, // Include address descriptor in response.
    });
    const { city, state, country } = res.results[0].address_components.reduce(
      (acc, component) => {
        if (component.types.includes("locality"))
          acc.city = component.long_name;
        else if (component.types.includes("administrative_area_level_1"))
          acc.state = component.long_name;
        else if (component.types.includes("country"))
          acc.country = component.long_name;
        return acc;
      },
      {}
    );
    return { city, country };
  } catch (error) {
    console.error(error);
  }
};

const fetchWeatherData = async () => {
  const { lat, long } = await getCoords();
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=${WEATHER_API_KEY}`;
  try {
    const res = await axios.get(url);
    // console.log("Weather data:", JSON.stringify(res.data, null, 2));
    const { conditions, temp, humidity, icon, sunrise, sunset, datetime } =
      res.data.currentConditions;
    return { conditions, temp, humidity, icon, sunrise, sunset, datetime };
  } catch (error) {
    console.error(`Weather Error: ${error}`);
  }
};

module.exports = { fetchWeatherData, getAddress, getCoords };
