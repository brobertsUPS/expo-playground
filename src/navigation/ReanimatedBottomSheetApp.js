import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TapGestureHandler, State } from "react-native-gesture-handler";

const HomeScreen = () => (
  <View style={styles.container}>
    <Text>Welcome Home!</Text>
  </View>
);

const ProfileScreen = ({ screenProps: { showProfileSwitcher } }) => (
  <View style={styles.container}>
    <Text>Your profile goes here!</Text>
    <Button title="Show profile sheet" onPress={showProfileSwitcher} />
  </View>
);

const Home = createStackNavigator(
  { HomeScreen },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          color={tintColor}
          name="home-circle"
          size={25}
        />
      )
    }
  }
);

const Profile = createStackNavigator(
  { ProfileScreen },
  {
    navigationOptions: ({ screenProps }) => ({
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          color={tintColor}
          name="face-profile"
          size={25}
        />
      ),
      tabBarOnLongPress: () => {
        screenProps.showProfileSwitcher();
      }
    })
  }
);

const Tabs = createBottomTabNavigator({
  Profile,
  Home
});

const Navigation = createAppContainer(Tabs);

const { greaterOrEq, cond } = Animated;

class ProfileSwitcher extends React.Component {
  sheetRef: React.RefObject<BottomSheet> = React.createRef();

  renderContent = () => {
    return (
      <View
        style={{
          padding: 20,
          height: Dimensions.get("window").height,
          backgroundColor: "#fff"
        }}
      >
        <Text style={{ fontSize: 22 }}>Hello this is some content!</Text>
        <Text style={{ fontSize: 22, marginTop: 20 }}>More of it here</Text>
        <Text style={{ fontSize: 22, marginTop: 40 }}>And down here</Text>
        <Button
          title="Open nested profile switcher"
          onPress={this.props.showNestedProfileSwitcher}
        />
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.panelHandle} />
      </View>
    );
  };

  show = () => {
    this.sheetRef.current && this.sheetRef.current.snapTo(0);
  };

  hide = () => {
    this.sheetRef.current && this.sheetRef.current.snapTo(1);
  };

  sheetOpenValue = new Animated.Value(1);
  overlayOpacity = Animated.interpolate(this.sheetOpenValue, {
    inputRange: [0, 1],
    outputRange: [0.5, 0],
    extrapolate: Animated.Extrapolate.CLAMP
  });
  pointerEvents = cond(greaterOrEq(0.9, this.sheetOpenValue), "auto", "none");

  handleTapStateChange = ({
    nativeEvent
  }: {
    nativeEvent: { state: State }
  }) => {
    if (nativeEvent.state === State.ACTIVE) {
      this.hide();
    }
  };

  render() {
    console.log("props", this.props);
    return (
      <React.Fragment>
        <TapGestureHandler onHandlerStateChange={this.handleTapStateChange}>
          <Animated.View
            pointerEvents={
              Platform.OS === "android" ? "none" : this.pointerEvents
            }
            style={[
              StyleSheet.absoluteFill,
              { opacity: this.overlayOpacity, backgroundColor: "black" }
            ]}
          />
        </TapGestureHandler>
        <BottomSheet
          ref={this.sheetRef}
          overdragResistanceFactor={8}
          enabledInnerScrolling={false}
          snapPoints={[450, 0]}
          renderContent={this.renderContent}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.sheetOpenValue}
        />
      </React.Fragment>
    );
  }
}

class NestedProfileSwitcher extends React.Component {
  sheetRef: React.RefObject<BottomSheet> = React.createRef();

  renderContent = () => {
    return (
      <View
        style={{
          padding: 20,
          height: Dimensions.get("window").height,
          backgroundColor: "#fff"
        }}
      >
        <Text style={{ fontSize: 22 }}>Nested!</Text>
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.nestedPanelHandle} />
      </View>
    );
  };

  show = () => {
    this.sheetRef.current && this.sheetRef.current.snapTo(0);
  };

  hide = () => {
    this.sheetRef.current && this.sheetRef.current.snapTo(1);
  };

  sheetOpenValue = new Animated.Value(1);
  overlayOpacity = Animated.interpolate(this.sheetOpenValue, {
    inputRange: [0, 1],
    outputRange: [0.5, 0],
    extrapolate: Animated.Extrapolate.CLAMP
  });
  pointerEvents = cond(greaterOrEq(0.9, this.sheetOpenValue), "auto", "none");

  handleTapStateChange = ({
    nativeEvent
  }: {
    nativeEvent: { state: State }
  }) => {
    if (nativeEvent.state === State.ACTIVE) {
      this.hide();
    }
  };

  render() {
    return (
      <React.Fragment>
        <TapGestureHandler onHandlerStateChange={this.handleTapStateChange}>
          <Animated.View
            pointerEvents={
              Platform.OS === "android" ? "none" : this.pointerEvents
            }
            style={[
              StyleSheet.absoluteFill,
              { opacity: this.overlayOpacity, backgroundColor: "black" }
            ]}
          />
        </TapGestureHandler>
        <BottomSheet
          ref={this.sheetRef}
          overdragResistanceFactor={8}
          enabledInnerScrolling={false}
          snapPoints={[350, 0]}
          renderContent={this.renderContent}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.sheetOpenValue}
        />
      </React.Fragment>
    );
  }
}

export default class App extends React.Component {
  profileSwitcherRef: React.RefObject<ProfileSwitcher> = React.createRef();
  nestedProfileSwitcherRef: React.RefObject<ProfileSwitcher> = React.createRef();

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigation
          screenProps={{
            showProfileSwitcher: () =>
              this.profileSwitcherRef.current &&
              this.profileSwitcherRef.current.show()
          }}
        />
        <ProfileSwitcher
          ref={this.profileSwitcherRef}
          showNestedProfileSwitcher={() => {
            this.nestedProfileSwitcherRef.current &&
              this.nestedProfileSwitcherRef.current.show();
          }}
        />
        <NestedProfileSwitcher ref={this.nestedProfileSwitcherRef} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    height: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  panelHandle: {
    width: 35,
    height: 6,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.7)",
    marginBottom: 0
  },
  nestedPanelHandle: {
    width: 35,
    height: 6,
    borderRadius: 4,
    backgroundColor: "grey",
    marginBottom: 0
  }
});
