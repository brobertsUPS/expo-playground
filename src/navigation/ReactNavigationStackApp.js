import React from "react";
import { Button, View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import Animated from "react-native-reanimated";
import {
  createStackNavigator,
  TransitionPresets
} from "react-navigation-stack";

import { editedForModalPresentationIOS } from "./screenAnimations";
const {
  add,
  block,
  greaterThan,
  cond,
  interpolate,
  set,
  call,
  onChange
} = Animated;

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Home Screen</Text>
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate("Details")}
    />
    <Button
      title="Go to ReanimatedBottomSheetApp"
      onPress={() => navigation.navigate("ReanimatedBottomSheetApp")}
    />
  </View>
);

const DetailsScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Details Screen</Text>
    <Button title="Go to Cat" onPress={() => navigation.navigate("Cat")} />
  </View>
);

const CatScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>I is cat, hear me roar</Text>
    <Button title="Go to Dog" onPress={() => navigation.navigate("Dog")} />
  </View>
);

const DogScreen = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>I is dog, hear me woof</Text>
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
    },
    Cat: {
      screen: CatScreen,
      path: "Cat"
    },
    Dog: {
      screen: DogScreen,
      path: "Dog"
    }
  },
  {
    initialRouteName: "Home",
    mode: "modal",
    defaultNavigationOptions: () => {
      return {
        /**
         * ModalPresentationIOS
         * https://github.com/react-navigation/stack/blob/master/src/TransitionConfigs/TransitionPresets.tsx
         *
         * forModalPresentationIos
         * https://github.com/react-navigation/stack/blob/master/src/TransitionConfigs/CardStyleInterpolators.tsx
         */
        ...TransitionPresets.ModalPresentationIOS, // ModalSlideFromBottomIOS or ModalPresentationIOS
        cardOverlayEnabled: true,
        gestureEnabled: true,
        //headerShown: false,
        cardStyleInterpolator: editedForModalPresentationIOS
      };
    }
  }
);

export default AppNavigator;
