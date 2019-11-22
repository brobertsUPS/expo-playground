import Animated from "react-native-reanimated";
import {
  CardInterpolationProps,
  CardInterpolatedStyle
} from "react-navigation-stack/src/types";
const { add, interpolate } = Animated;

/**
 * Standard iOS-style modal animation in iOS 13.
 */
export function editedForModalPresentationIOS({
  index,
  current,
  next,
  layouts: { screen },
  insets
}: CardInterpolationProps): CardInterpolatedStyle {
  const isLandscape = screen.width > screen.height;
  const topOffset = isLandscape ? 0 : 10;
  const statusBarHeight = insets.top;
  const aspectRatio = screen.height / screen.width;

  const progress = add(current.progress, next ? next.progress : 0);

  console.log(
    "translateY options",
    screen.height,
    index === 0 ? 0 : topOffset,
    index * ((index === 0 ? statusBarHeight : 0) - topOffset * aspectRatio)
  );

  console.log(
    "statusbarHeight, topOffset, aspectRatio",
    statusBarHeight,
    topOffset,
    aspectRatio
  );

  const translateY = interpolate(progress, {
    inputRange: [0, 1, 2],
    outputRange: [812, index * 30, index * 20]
  });

  const overlayOpacity = interpolate(progress, {
    inputRange: [0, 1, 1.0001, 2],
    outputRange: [0.1, 0.1, 0.1, 0.1]
  });

  const scale = isLandscape
    ? 1
    : interpolate(progress, {
        inputRange: [0, 1, 2],
        outputRange: [
          1,
          1,
          screen.width ? 1 - (topOffset * 2) / screen.width : 1
        ]
      });

  console.log(
    "scale options",
    1,
    1,
    screen.width ? 1 - (topOffset * 2) / screen.width : 1
  );

  const borderRadius = isLandscape
    ? 0
    : index === 0
    ? interpolate(progress, {
        inputRange: [0, 1, 2],
        outputRange: [0, 0, 10]
      })
    : 10;
  console.log("yikes", index);
  return {
    cardStyle: {
      overflow: "hidden",
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      marginTop: index === 0 ? 0 : statusBarHeight,
      transform: [{ translateY }, { scale }]
    },
    overlayStyle: { opacity: overlayOpacity }
  };
}
