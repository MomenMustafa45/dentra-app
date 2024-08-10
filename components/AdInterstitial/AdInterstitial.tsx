import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-8988048891909123/1375740662";

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  keywords: ["fashion", "clothing"],
});

const AdInterstitial = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );
    console.log("Hello", loaded);

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        className="bg-black"
        onPress={() => {
          interstitial.show();
        }}
      >
        <Text>Show AD</Text>
      </TouchableOpacity>
    </>
  );
};

export default AdInterstitial;
