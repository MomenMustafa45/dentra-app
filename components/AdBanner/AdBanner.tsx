import { View, Text } from "react-native";
import React from "react";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const adBannerId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-8988048891909123/1374475311";

const AdBanner = () => {
  return (
    <View className="">
      <Text>Hello</Text>
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log("Ad loaded");
        }}
        // onAdFailedToLoad={(error) => {
        //   console.error("Ad failed to load", error);
        // }}
      />
    </View>
  );
};

export default AdBanner;
