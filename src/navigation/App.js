import React from "react";
import { Button, View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Home Screen</Text>
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate("Details")}
    />
  </View>
);

const DetailsScreen = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Details Screen</Text>
  </View>
);

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      path: "Home"
    },
    Details: {
      screen: DetailsScreen,
      path: "Details"
    }
  },
  {
    mode: "modal",
    initialRouteName: "Home"
  }
);

export default AppNavigator;
