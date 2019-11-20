import { createSwitchNavigator, createAppContainer } from "react-navigation";

import ReactNavigationStackApp from "./ReactNavigationStackApp";
import ReanimatedBottomSheetApp from "./ReanimatedBottomSheetApp";

export default createAppContainer(
  createSwitchNavigator(
    {
      ReactNavigationStackApp,
      ReanimatedBottomSheetApp
    },
    {
      initialRouteName: "ReactNavigationStackApp"
    }
  )
);
