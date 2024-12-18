import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet, Text } from 'react-native';

type CarouselProps = {
  children?: React.ReactNode;
};

type CarouselState = {
  offset: number;
  childCount: number;
};

export default class Carousel extends React.Component<CarouselProps, CarouselState> {
  constructor(props: CarouselProps) {
    super(props);

    this.state = {
      offset: 0,
      childCount: React.Children.count(props.children),
    };
  }

  nextPage = () => {
    this.setState((prevState) => ({
      offset: Math.min(prevState.offset + 1, prevState.childCount - 1),
    }));
  };

  prevPage = () => {
    this.setState((prevState) => ({
      offset: Math.max(prevState.offset - 1, 0),
    }));
  };

  getLayerStyle = (index: number = 0): StyleProp<ViewStyle> => {
    const sign = index > 0 ? -1 : +1;
  
    return index !== 0
      ? {
          position: 'absolute',
          zIndex: -Math.abs(index),
          marginRight: sign * (5 + 10 * Math.abs(index)),
          height: `${90 - 5 * Math.abs(index)}%`,
        }
      : {};
  };

  render(): React.ReactNode {
    return (
      <>
      {React.Children.map(this.props.children, (child, index) => (
        // TODO: decouple style, and make inner child wrapper callback
        <View key={index} style={[style.card, this.getLayerStyle(index - this.state.offset)]}>
          <View 
            style={{
              backgroundColor: `rgba(0, 0, 0, ${Math.abs(index - this.state.offset) * 0.1 })`,
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: -1,
              borderRadius: 10,
            }}
          /> 

          {child}

        </View>
      ))}
    </>
    );
  }
}

const style = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: 'grey',
    height: '100%',
    width: '90%',
    maxWidth: 300,
    borderRadius: 10,
  },
});