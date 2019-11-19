import Animated from "react-native-reanimated";

const { cond, add, multiply, interpolate } = Animated;

export function editedForModalPresentationIOS({
  index,
  current,
  next,
  layouts: { screen },
  insets
}) {
  const isLandscape = screen.width > screen.height;
  const topOffset = isLandscape ? 0 : index * 30;
  const statusBarHeight = insets.top;
  const aspectRatio = screen.height / screen.width;

  const progress = add(current.progress, next ? next.progress : 0);

  const translateY = interpolate(progress, {
    inputRange: [0, 1, 2],
    outputRange: [
      screen.height,
      index === 0 ? 0 : topOffset,
      (index === 0 ? statusBarHeight : 0) - topOffset * aspectRatio
    ]
  });

  const overlayOpacity = interpolate(progress, {
    inputRange: [0, 1, 1.0001, 2],
    outputRange: [0, 0.1, 1, 1]
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

  const borderRadius = isLandscape
    ? 0
    : index === 0
    ? interpolate(progress, {
        inputRange: [0, 1, 2],
        outputRange: [0, 0, 10]
      })
    : 10;

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
