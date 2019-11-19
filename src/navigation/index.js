import { createSwitchNavigator, createAppContainer } from "react-navigation";

import App from "./App";

export default createAppContainer(
  createSwitchNavigator(
    {
      App
    },
    {
      initialRouteName: "App"
    }
  )
);
