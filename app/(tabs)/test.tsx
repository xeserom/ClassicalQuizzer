import React, { useEffect, useRef, useState, memo } from 'react';
import { View, Text, Button, Animated } from 'react-native';
import FlipComponent from '@/components/FlipComponent';

const Front = () => {
  return (
    <View 
      style={{
        width: 100, 
        height: 100, 
        borderRadius: 10, 
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text 
        style={{
          color: 'white', 
          fontSize: 30, 
          fontWeight: 'bold'
        }}>
        0
      </Text>
    </View>
  );
};

const Back = () => {
  return (
    <View 
      style={{
        width: 100, 
        height: 100, 
        borderRadius: 10, 
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text 
        style={{
          color: 'white', 
          fontSize: 30, 
          fontWeight: 'bold'
        }}>
        1
      </Text>
    </View>
  );
};

const App = () => {
  const rotationValue = useRef(new Animated.Value(0)).current;
  const [pressed, setPressed] = useState(false);

  const flip = (pressed: boolean) => {
    Animated.timing(rotationValue, {
      toValue: Number(pressed),
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    console.log( (rotationValue as any)._value );
    setPressed(!pressed);
    flip(!pressed);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlipComponent
        rotationValue={rotationValue}
        FrontComponent={<Front/>}
        BackComponent={<Back />}
        direction='x'
      />
      <Button title='Press' onPress={handlePress}/>
    </View>
  );
};

export default App;