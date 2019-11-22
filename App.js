import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-navigation";

import Navigation from "./src/navigation";
import ReanimatedBottomSheetApp from "./src/navigation/ReanimatedBottomSheetApp";

// Adding SafeAreaView to the below borks the app
/*
<SafeAreaView
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
  <Navigation />
  </SafeAreaView>

*/
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
