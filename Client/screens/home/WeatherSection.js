import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchWeatherData } from "./WeatherAPI/weatherAPI";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCloudSun,
  faSpinner,
  faCloudMoon,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { getTime, getDate, isDayTime } from "./TimeOfDay/TimeOfDay";
import DailyForcast from "./WeatherScreen/DailyForcast";

const WeatherSection = () => {
  const { dayOfMonth, monthName, dayName } = getDate();
  const [isItDayTime, setIsItDayTime] = useState(null);
  const [weather, setWeather] = useState({
    conditions: "",
    temp: "",
    humidity: "",
    icon: "",
    sunrise: "",
    sunset: "",
    datetime: "",
  });
  const icons = {
    "partly-cloudy-day": isItDayTime ? faCloudSun : faCloudMoon,
    "clear-night": faMoon,
    "clear-day": faSun,
  };
  const [icon, setIcon] = useState(weather.icon);

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
            color="#000"
          />
        </View>
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
          padding: 5,
        }}
      >
        <DailyForcast day={"Mon"} high={73.4} low={60.8} />
        <DailyForcast day={"Tue"} high={73.4} low={60.8} />
        <DailyForcast day={"Wed"} high={73.4} low={60.8} />
        <DailyForcast day={"Thu"} high={73.4} low={60.8} />
        <DailyForcast day={"Fri"} high={73.4} low={60.8} />
        <DailyForcast day={"Sat"} high={73.4} low={60.8} last={true} />
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7678ed",
    width: "90%",
    borderRadius: 10,
    flexDirection: "column",
  },
  weather: {
    backgroundColor: "#7678ed",
    width: "100%",
    padding: 5,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  leftWeatherContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1.5,
    paddingHorizontal: 5,
    borderColor: "#fff",
  },

  weatherConditions: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "Arial Rounded MT Bold",
  },
  weatherTemp: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    fontFamily: "Arial Rounded MT Bold",
  },
  centerWeatherContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontWeight: "900",
    color: "#fff",
    fontSize: 16,
    fontFamily: "Arial Rounded MT Bold",
  },
  rightWeatherContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
  },
});
export default WeatherSection;
