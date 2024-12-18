import Animated, {
  withTiming,
  useAnimatedStyle,
  withSequence,
  withSpring,
  AnimatedStyle,
  SharedValue
} from 'react-native-reanimated';
import { StyleProp, ViewStyle } from 'react-native';
import React from 'react';

type ShakeComponentProps = {
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  children?: React.ReactNode;
  value: SharedValue<number>;
};

export default function ShakeComponent({ style, children, value }: ShakeComponentProps) {
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: value.value }],
  }));

  return (
    <Animated.View style={[style, shakeStyle]}>
      {children}
    </Animated.View>
  );
}

ShakeComponent.Elastic = (value: SharedValue<number>) => {
  const OFFSET = 10;
  const TIME = 200;
  
  value.value = withSequence(
    withTiming(-OFFSET, { duration: TIME / 2 }),
    withSpring(0, { mass: 0.1, damping: 1, stiffness: 300 })
  );
};