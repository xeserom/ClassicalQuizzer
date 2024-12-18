import { 
  Pressable, 
  Text, 
  GestureResponderEvent, 
  ColorValue, 
  PressableStateCallbackType, 
  StyleProp, 
  ViewStyle 
} from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  color?: ColorValue;
  style?: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
};

const Button = ({ title, onPress, disabled = false, color = 'grey', style }: ButtonProps) => 
  <Pressable
    onPress={(e) => { if (onPress) onPress(e) }}
    style={({pressed}) => [{
      backgroundColor: pressed || disabled ? 'darkgrey' : color,
      width: 155,
      height: 40,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
    }, typeof style === 'function' ? style({ pressed }) : style ]}
    disabled={disabled}
  >
    <Text style={{ userSelect: 'none', color: 'white' }}>
      {title}
    </Text>
  </Pressable>

export default Button;