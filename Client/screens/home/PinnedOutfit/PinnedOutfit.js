import { View, Text, StyleSheet } from "react-native";
import React from "react";
import PinnedOutfitItem from "./PinnedOutfitItem";
import { useTheme } from "../../Theme/ThemeContext";

const PinnedOutfit = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <Text
        style={[
          {
            color: theme.colors.text_primary,
            fontWeight: theme.font.bold,
            fontSize: theme.font_size.medium,
          },
        ]}
      >
        Pinned Outfit
      </Text>
      <View
        style={[
          styles.pinnedOutfit,
          { backgroundColor: theme.colors.primary_200 },
        ]}
      >
        {true && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <PinnedOutfitItem
              uri={
                "https://wardrobeapp.s3.us-west-1.amazonaws.com/6629e281be9d112a6cfecabffecTW4htAtMvWVmLe9Fqzs.jpg"
              }
              width={50}
              height={30}
            />
            <PinnedOutfitItem
              width={80}
              height={70}
              uri={
                "https://wardrobeapp.s3.us-west-1.amazonaws.com/664031a77d97fa37db153cc4sTEFVd39yU2MAVsniMKFQ8.png"
              }
            />
            <PinnedOutfitItem
              width={70}
              height={100}
              uri={
                "https://wardrobeapp.s3.us-west-1.amazonaws.com/664031a77d97fa37db153cc4uyaUrZZW6d4VCuhLuGKqxx.png"
              }
            />
            <PinnedOutfitItem
              width={50}
              height={50}
              uri={
                "https://wardrobeapp.s3.us-west-1.amazonaws.com/664031a77d97fa37db153cc4uCw51pKkCYPhaa9am4P6zN.png"
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  blurview: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
  },
  title: {
    textAlign: "center",
    width: "100%",
  },
  pinnedOutfit: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
export default PinnedOutfit;
