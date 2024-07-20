import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getDate } from "../TimeOfDay/TimeOfDay";
import {
  getAddress,
  getCoords,
  fetchWeatherData,
} from "../WeatherAPI/weatherAPI";
import { DotIndicator } from "react-native-indicators";

import { weather_icons } from "../WeatherAPI/IconsObject";
import { useTheme } from "../../Theme/ThemeContext";
const WeatherWidget = () => {
  const { theme } = useTheme();
  const [location, setLocation] = useState(null);
  const [weather_data_loading, set_weather_data_loading] = useState(true);
  const [address_data_loading, set_address_data_loading] = useState(true);
  const [img, setImg] = useState(null);
  const [weather, setWeather] = useState({
    conditions: "",
    temp: "",
    humidity: "",
    icon: "",
    sunrise: "",
    sunset: "",
    datetime: "",
  });
  const { dayOfMonth, monthName, dayName } = getDate();
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchWeatherData();
        setWeather(data);
        setImg(weather_icons[data.icon]);
        set_weather_data_loading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const { city, country } = await getAddress();
        setLocation(`${city}, ${country}`);
        set_address_data_loading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddress();
  }, []);
  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: theme.border.radius,
          borderWidth: theme.border.width,
          borderColor: theme.border.color,
          backgroundColor: "#282828",
        },
      ]}
    >
      {address_data_loading || weather_data_loading ? (
        <DotIndicator
          color={theme.colors.text_primary}
          style={{ width: "100%" }}
          size={8}
        />
      ) : (
        <>
          <View style={styles.leftContainer}>
            <View
              style={[
                styles.leftTopContainer,
                { backgroundColor: theme.colors.secondary_100 },
              ]}
            >
              <Text
                style={[
                  styles.date,
                  {
                    color: theme.colors.text_primary,
                    fontWeight: theme.font.bold,
                    fontSize: theme.font_size.medium,
                  },
                ]}
              >
                {dayName}
              </Text>
            </View>
            <View style={styles.leftMiddleContainer}>
              <Text
                style={[
                  styles.location,
                  {
                    color: theme.colors.text_primary,
                    fontWeight: theme.font.bold,
                    fontSize: theme.font_size.medium,
                  },
                ]}
              >
                {location}
              </Text>
            </View>
            <View style={styles.leftBottomContainer}>
              <Text
                style={[
                  {
                    color: theme.colors.text_secondary,
                    fontWeight: theme.font.regular,
                    fontSize: theme.font_size.small,
                  },
                ]}
              >
                {weather.conditions}
              </Text>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <Image
              source={{ uri: img }}
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.rightTopContainer}>
              <Text
                style={[
                  styles.tempHigh,
                  {
                    color: theme.colors.text_primary,
                    fontWeight: theme.font.bold,
                    fontSize: theme.font_size.xLarge,
                  },
                ]}
              >
                {Math.round(weather.temp)}°
              </Text>
            </View>
            <View style={styles.rightBottomContainer}>
              <Text
                style={[
                  styles.tempLow,
                  {
                    color: theme.colors.text_secondary,
                    fontWeight: theme.font.bold,
                    fontSize: theme.font_size.xLarge,
                  },
                ]}
              >
                {Math.round(weather.humidity)}%
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    padding: 10,
  },
  leftContainer: {
    justifyContent: "space-between",
    flex: 1,
    // borderWidth: 1,
  },
  rightContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  middleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },

  leftTopContainer: {
    backgroundColor: "#7678ed",

    maxWidth: "45%",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  leftMiddleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },

  leftBottomContainer: { paddingHorizontal: 2 },
  rightTopContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rightBottomContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    width: "100%",
    textAlign: "center",
  },
  tempHigh: {
    textAlign: "left",
    width: "100%",
  },
  tempLow: {
    width: "100%",

    textAlign: "left",
  },
});
export default WeatherWidget;
