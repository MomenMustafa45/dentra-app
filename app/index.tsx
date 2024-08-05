import React from "react";
import StackNavigation from "@/navigation/StackNavigation";
import FontLoader from "@/utils/FontLoader";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { usePreventScreenCapture } from "expo-screen-capture";

const index = () => {
  usePreventScreenCapture();
  return (
    <Provider store={store}>
      <FontLoader>
        <StackNavigation />
      </FontLoader>
    </Provider>
  );
};

export default index;
