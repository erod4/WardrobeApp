import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCog,
  faPen,
  faPencil,
  faPlus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
const SettingsButton = ({ width, height, isVisible }) => {
  const navigator = useNavigation();
  const topPosition = useSharedValue(0); // Start from 0 (visible at the bottom)

  // Start animation when isVisible changes
  useEffect(() => {
    topPosition.value = withTiming(isVisible ? -80 : 0, {
      duration: 400,
      easing: Easing.out(Easing.quad),
    });
  }, [isVisible]);
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigator.navigate("Settings");
  };
  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: topPosition.value,
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: Dimensions.get("window").width / 2 - width / 2,
          justifyContent: "center",
          alignItems: "center",
        },
        animatedStyles,
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        style={{
          borderRadius: 100,

          justifyContent: "center",
          alignItems: "center",
          width,
          backgroundColor: "#3d348b",
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 8,
          height,
        }}
      >
        <FontAwesomeIcon icon={faCog} size={25} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const AddToWardrobeButton = ({ onPress, width, height, mode }) => {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const handleLongPress = () => {
    setIsSettingsVisible(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTimeout(() => {
      setIsSettingsVisible(false);
    }, 4500);
  };
  return (
    <>
      {mode == 1 && isSettingsVisible && (
        <SettingsButton
          width={width / 1.5}
          height={height / 1.5}
          isVisible={isSettingsVisible}
        />
      )}
      <TouchableOpacity
        style={{
          top: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onPress}
        onLongPress={handleLongPress}
      >
        <View
          style={{
            width,
            height,
            borderRadius: 100,
            backgroundColor: "#3d348b",
            justifyContent: "center",
            alignItems: "center",
            // Shadow for iOS
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            // Elevation for Android
            elevation: 8,
          }}
        >
          {mode == 1 ? (
            <FontAwesomeIcon icon={faPen} size={23} color="#fff" />
          ) : (
            <FontAwesomeIcon icon={faPlus} size={23} color="#fff" />
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export const ModalButton = ({ onPress, mode }) => {
  return (
    <View style={styles.buttonContainer}>
      <AddToWardrobeButton
        onPress={onPress}
        width={50}
        height={50}
        mode={mode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 100,
    width: 100,
    backgroundColor: "red",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
    paddingBottom: 20,
  },
});

export default AddToWardrobeButton;
