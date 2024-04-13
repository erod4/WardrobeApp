import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchWeatherData } from "./WeatherAPI/weatherAPI";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCloudSun,
  faSpinner,
  faCloudMoon,
} from "@fortawesome/free-solid-svg-icons";
import { getTime, getDate, isDayTime } from "./TimeOfDay/TimeOfDay";

const WeatherSection = () => {
  const { dayOfMonth, monthName, dayName } = getDate();

  const [weather, setWeather] = useState({
    conditions: "",
    temp: "",
    humidity: "",
    icon: faSpinner,
    sunrise: "",
    sunset: "",
    datetime: "",
  });
  const [icon, setIcon] = useState(weather.icon);
  const icons = {
    "partly-cloudy-day": isDayTime(weather) ? faCloudSun : faCloudMoon,
  };
  useEffect(() => {
    async function fetchData() {
      const data = await fetchWeatherData();
      setWeather(data);
      setIcon(icons[data.icon]);
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.weather}>
        <View style={styles.leftWeatherContainer}>
          <Text style={styles.weatherConditions}>{weather.conditions}</Text>
          <Text style={styles.weatherTemp}>{weather.temp}°</Text>
        </View>
        <View style={styles.centerWeatherContainer}>
          <Text style={styles.dateText}>
            {dayName}, {dayOfMonth} {monthName}
          </Text>
        </View>
        <View style={styles.rightWeatherContainer}>
          <FontAwesomeIcon
            icon={icon ? icon : faCloudSun}
            size={30}
            color="#fff"
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  weather: {
    backgroundColor: "#7678ed",
    width: "90%",
    borderRadius: 10,
    padding: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  leftWeatherContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1.5,
    paddingHorizontal: 5,
    borderColor: "#fff",
  },

  weatherConditions: {
    fontSize: 10,
    fontWeight: "500",
    color: "#fff",
  },
  weatherTemp: {
    fontSize: 25,
    fontWeight: "700",
    color: "#fff",
  },
  centerWeatherContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontWeight: "700",
    color: "#fff",
  },
  rightWeatherContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default WeatherSection;
