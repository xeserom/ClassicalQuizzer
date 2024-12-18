import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, StyleProp, ViewStyle, StyleSheet, Platform } from 'react-native';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type KeyboardButtonProps = {
  value?: string;
  onKeyPress?: (key: string) => void;
  children?: React.ReactNode;
  fontSize?: number;
  style?: StyleProp<ViewStyle>;
};

const KeyboardButton = ({ value = '', onKeyPress, children, fontSize = 20, style }: KeyboardButtonProps) => {
  return (
    <Pressable
      onPress={() => onKeyPress ? onKeyPress(value) : {}}
      style={({ pressed }) => [
        styles.keyboardButton,
        { backgroundColor: pressed ? 'darkgray' : 'grey' }, 
        style
      ]}>
      <Text style={[styles.keyboardKeyLabel, { fontSize: fontSize }]}>
        {value ? value : children}
      </Text>
    </Pressable>
  );
}

type KeyboardProps = {
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  onEnter?: () => void;
};

const Keyboard = ({ onChangeText, onEnter }: KeyboardProps) => {
  const onKeyPress = (key: string) => 
    onChangeText(prevText => prevText + key.toUpperCase());

  const onBackSpace = () =>
    onChangeText(prevText => prevText.slice(0, -1));

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Backspace')
          onBackSpace();
        else if (/^[a-zA-Z0-9]$/.test(event.key))
          onKeyPress(event.key);
      };

      window.addEventListener('keydown', handleKeyPress);

      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, []);

  return (
    <View style={styles.keyboard}>

      <View style={styles.keyboardRow}>

        <KeyboardButton value={'1'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'2'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'3'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'4'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'5'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'6'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'7'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'8'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'9'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'0'} onKeyPress={onKeyPress} />

      </View>

      <View style={styles.keyboardRow}>

        <KeyboardButton value={'q'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'w'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'e'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'r'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'t'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'y'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'u'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'i'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'o'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'p'} onKeyPress={onKeyPress} />

      </View>

      <View style={styles.keyboardRow}>

        <View style={styles.spacer}/>

        <KeyboardButton value={'a'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'s'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'d'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'f'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'g'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'h'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'j'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'k'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'l'} onKeyPress={onKeyPress} />

        <View style={styles.spacer}/>

      </View>

      <View style={styles.keyboardRow}>

        <View style={{ flex: 1.7 }} />
        <KeyboardButton value={'z'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'x'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'c'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'v'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'b'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'n'} onKeyPress={onKeyPress} />
        <KeyboardButton value={'m'} onKeyPress={onKeyPress} />
        <KeyboardButton style={{ flex: 1.5 }} onKeyPress={onBackSpace}>
          <FontAwesome5 name="backspace" size={18} color="white" />
        </KeyboardButton>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 'auto',
    width: '100%',
    maxWidth: 500,
    marginLeft: 6
  },
  keyboardRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: 'auto',
    marginBottom: 8,
  },
  keyboardButton: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
    height: 58,
    borderRadius: 4,
  },
  keyboardKeyLabel: {
    color: 'white',
    fontWeight: 'bold', 
    textTransform: 'uppercase',
    userSelect: 'none',
  },
  spacer: {
    flex: .5
  }
});

export default Keyboard;