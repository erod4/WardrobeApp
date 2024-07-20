import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import { SwiperFlatListWithGestureHandler } from "react-native-swiper-flatlist/WithGestureHandler";
import { useTheme } from "../../Theme/ThemeContext";

const RecentOutfits = () => {
  const colors = ["tomato", "thistle", "skyblue", "teal"];
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.containerTitle,
          {
            color: theme.colors.text_primary,
            fontWeight: theme.font.bold,
            fontSize: theme.font_size.medium,
          },
        ]}
      >
        Recent Outfits
      </Text>

      <View style={styles.recent}>
        <View style={styles.swiperContainer}>
          <SwiperFlatListWithGestureHandler
            autoplay
            autoplayDelay={8}
            autoplayLoop
            index={0}
            showPagination
            paginationDefaultColor={theme.colors.primary_300}
            paginationActiveColor={theme.colors.primary_100}
            data={colors}
            keyExtractor={(item, index) => `key-${index}`}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.child,
                  { backgroundColor: theme.colors.primary_100 },
                ]}
              >
                <View
                  style={[
                    { backgroundColor: theme.colors.primary_200 },
                    styles.text,
                  ]}
                >
                  <Text>{item}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 50,
    width: "100%",
  },
  swiperContainer: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  containerTitle: {
    textAlign: "left",
    width: "90%",
    fontWeight: "700",
  },
  recent: {
    width: "100%",
    borderRadius: 10,
    height: 300,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  child: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  blurview: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    height: "100%",
    borderRadius: 10,
    width: "100%",
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",

    borderRadius: 10,

    height: "100%",
  },
});
export default RecentOutfits;
