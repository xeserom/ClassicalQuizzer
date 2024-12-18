import { useState, useEffect, memo } from 'react';
import { type LayoutChangeEvent, View, Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  cancelAnimation
} from 'react-native-reanimated';
import ProgressBar from './ProgressBar';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type AudioPlayerProps = {
  url: string;
  playat: [number, number];
  style?: StyleProp<ViewStyle>;
};

const AudioPlayer = ({ url, playat, style }: AudioPlayerProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fart, setFart] = useState(false);
  const animatedWidth = useSharedValue(0);

  const loadAudio = async () => {
    
    try {
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: false, positionMillis: playat[0] },
      );

      const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
        if (playbackStatus.isLoaded) {
          const status = playbackStatus as AVPlaybackStatusSuccess;
          
          if (status.isPlaying && status.durationMillis) {
            if (!isPlaying) {
              start();
              setIsPlaying(isPlaying);
            }

            if (status.positionMillis >= playat[1]) {
              playbackObject.setStatusAsync({ shouldPlay: false, positionMillis: playat[0]});
              animatedWidth.value = 0;
              setIsPlaying(false);
            }
          }
        }
      };

      playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setSound(playbackObject);
    } catch (error) {
      console.error('Error loading audio file:', error);
    }
  };

  const playAudio = async () => {
    try {
      if (sound) {
        if (fart) {
          cancelAnimation(animatedWidth);
        }

        setFart(!fart);
        
        
        await sound.setStatusAsync({ shouldPlay: !fart });
        
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const stopAudio = async () => {
    try {
      if (sound && sound._loaded) {
        await sound.setStatusAsync({ shouldPlay: false,  });
        animatedWidth.value = 0;
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error stoping audio:', error);
    }
  };

  useEffect(() => {
    if (url) {
      // console.log(url);
      setFart(false);
      stopAudio();
      loadAudio();
    }

    return () => {
      sound?.unloadAsync();
    };
  }, [url]);

  const duration = playat[1] - playat[0];
  const fullWidth = useSharedValue(0);

  const start = () => {
    animatedWidth.value = withTiming(fullWidth.value - 1, {
      duration: duration,
      easing: Easing.linear,
      reduceMotion: ReduceMotion.System,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animatedWidth.value
    }
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    fullWidth.value = width;
  };

  return (
    <Pressable
      onPress={() => {
        setIsPlaying(!isPlaying);
        playAudio();
      }}
      style={style}>
        
      {fart ?
        <View style={{borderWidth: 1, width: 37, height: 37, borderRadius: 100}}>
          <FontAwesome6 name="pause" size={23} style={{right: 10, bottom: 5, position: 'absolute'}} color="black" /> 
        </View>
        :
        <View style={{borderWidth: 1, width: 37, height: 37, borderRadius: 100}}>
          <FontAwesome6 name="play" size={19} style={{right: 9, bottom: 7, position: 'absolute'}} color="black" /> 
        </View>
      }      

      <View
        onLayout={handleLayout}
        style={{
          backgroundColor: '#e6e6e6',
          borderWidth: 1,
          flex: 1,
          height: 10,
          margin: 10,
          borderRadius: 20,
          // borderColor: 'red'
        }}>
        <Animated.View
          style={[{
            height: 8,
            position: 'absolute',
            backgroundColor: 'black',
            borderRadius: 20,
          }, 
          animatedStyle
        ]}
        />
      </View>
    </Pressable>
  );
};

export default AudioPlayer;