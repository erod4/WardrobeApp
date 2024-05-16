import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { SwiperFlatListWithGestureHandler } from "react-native-swiper-flatlist/WithGestureHandler";

const RecentOutfits = () => {
  const colors = ["tomato", "thistle", "skyblue", "teal"];

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Recent Outfits</Text>

      <View style={styles.recent}>
        <View style={styles.swiperContainer}>
          <SwiperFlatListWithGestureHandler
            autoplay
            autoplayDelay={8}
            autoplayLoop
            index={0}
            showPagination
            paginationActiveColor={"#000"}
            data={colors}
            keyExtractor={(item, index) => `key-${index}`}
            renderItem={({ item }) => (
              <View style={styles.child}>
                <View style={styles.text}>
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
    height: "60%",
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
    fontSize: 15,
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
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    textAlign: "center",
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#ddd",
    height: "100%",
  },
});
export default RecentOutfits;
