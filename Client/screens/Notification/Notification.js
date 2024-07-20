import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { DotIndicator } from "react-native-indicators";
const Notification = ({ type, message, icon, loading }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current; // Initial position is above the screen

  useEffect(() => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 250, // Slide down to this position
        duration: 500,
        useNativeDriver: true,
      }),
      //   Animated.delay(4000), // Wait for 2 seconds
      //   Animated.timing(slideAnim, {
      //     toValue: -100, // Slide back up to the initial position
      //     duration: 500,
      //     useNativeDriver: true,
      //   }),
    ]).start();
  }, [slideAnim]);
  //types
  //1-success
  //2-error
  //3-standard

  const bgColor = ["", "green", "red", "#fff"];
  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: bgColor[type],
            transform: [{ translateY: slideAnim }],
            justifyContent: loading ? "center" : "space-between",
            flexDirection: loading ? "column" : "row",
          },
        ]}
      >
        <View style={styles.rightContainer}>
          <Text style={[styles.message, { color: loading ? "#000" : "#fff" }]}>
            {message}
          </Text>
        </View>
        <View style={styles.leftContainer}>
          {icon ? (
            <FontAwesomeIcon icon={icon} size={25} style={{ color: "#fff" }} />
          ) : (
            <DotIndicator color="#000" style={{ width: "100%" }} size={8} />
          )}
        </View>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    position: "absolute",
    width: "91%",
    paddingVertical: 10,
    zIndex: 1,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",

    paddingHorizontal: 10,
    top: -100, // Start position outside of the screen
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 5,
  },

  leftContainer: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    width: "100%",
    textAlign: "center",
    fontWeight: "700",
    color: "#fff",
    fontSize: 18,
  },
});
export default Notification;
