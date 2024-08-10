import React, { useEffect } from "react";
import StackNavigation from "@/navigation/StackNavigation";
import FontLoader from "@/utils/FontLoader";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { usePreventScreenCapture } from "expo-screen-capture";
import mobileAds from "react-native-google-mobile-ads";

const index = () => {
  usePreventScreenCapture();
  useEffect(() => {
    // mobileAds()
    //   .initialize()
    //   .then((adapterStatuses) => {
    //     console.log("adMob inited", adapterStatuses);
    //   });
  }, []);

  return (
    <>
      <Provider store={store}>
        <FontLoader>
          <StackNavigation />
        </FontLoader>
      </Provider>
    </>
  );
};

export default index;
