import React from 'react';
import { View, StyleSheet, Animated, StyleProp, type ViewStyle } from 'react-native';

type FlipComponentProps = {
  rotationValue: Animated.Value,
  cardStyle?: StyleProp<ViewStyle>;
  FrontComponent: React.ReactNode;
  BackComponent: React.ReactNode;
  direction?: string;
};

export default function FlipComponent({
    rotationValue, 
    FrontComponent, 
    BackComponent,
    direction = 'y',
    cardStyle
  }: FlipComponentProps) {
  const isDirectionX = direction === 'x';
  return (
    <View style={cardStyle}>
      <Animated.View
        style={[
          flipCardStyles.regularCard,
          {width: '100%', height: '100%'},
          {transform: [
            isDirectionX ? 
            { rotateX: rotationValue.interpolate({inputRange: [0, 1], outputRange: ['0deg', '180deg']}) }:
            { rotateY: rotationValue.interpolate({inputRange: [0, 1], outputRange: ['0deg', '180deg']}) }
          ]}
        ]}>
        {BackComponent}
      </Animated.View>
      <Animated.View
        style={[
          flipCardStyles.flippedCard,
          {width: '100%', height: '100%'},
          {transform: [
            isDirectionX ? 
            { rotateX: rotationValue.interpolate({inputRange: [0, 1], outputRange: ['180deg', '360deg']}) } :
            { rotateY: rotationValue.interpolate({inputRange: [0, 1], outputRange: ['180deg', '360deg']}) }
          ]}
        ]}>
        {FrontComponent}
      </Animated.View>
    </View>
  );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: 'absolute',
    zIndex: 1,
  },
  flippedCard: {
    backfaceVisibility: 'hidden',
    zIndex: 2,
  },
});