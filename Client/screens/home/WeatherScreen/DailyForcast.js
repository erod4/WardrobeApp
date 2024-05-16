import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";

const DailyForcast = ({ day, high, low, icon, last }) => {
  return (
    <View
      style={[styles.dailyForcastContainer, { borderRightWidth: last ? 0 : 1 }]}
    >
      <Text style={styles.dayTitle}>{day}</Text>
      <View style={styles.iconContainer}>
        <FontAwesomeIcon icon={faSun} style={{ color: "#fff" }} />
      </View>
      <View style={styles.tempContainer}>
        <View style={styles.tempContainerLeft}>
          <Text style={styles.tempTitle}>Hi</Text>
          <Text style={styles.temp}>{high}°</Text>
        </View>
        <View style={styles.tempContainerRight}>
          <Text style={styles.tempTitle}>Lo</Text>
          <Text style={styles.temp}>{low}°</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  dailyForcastContainer: {
    paddingHorizontal: 5,
    borderRightColor: "#fff",
  },
  dayTitle: {
    width: "100%",
    textAlign: "center",
    fontWeight: "700",
    color: "#fff",
  },
  iconContainer: { width: "100%", alignItems: "center" },
  tempContainer: {
    flexDirection: "row",

    width: "100%",
  },
  tempContainerLeft: { alignItems: "flex-start", paddingRight: 2 },
  tempContainerRight: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingLeft: 2,
  },
  tempTitle: { fontSize: 8, fontWeight: "700", color: "#fff" },

  temp: { fontSize: 8, fontWeight: "700", color: "#fff" },
});
export default DailyForcast;
