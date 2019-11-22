import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Navigation from "./src/navigation";
import ReanimatedBottomSheetApp from "./src/navigation/ReanimatedBottomSheetApp";
const App = () => <Navigation />;

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
