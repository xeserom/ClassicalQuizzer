import { StyleSheet, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';

import AudioPlayer from '@/components/AudioPlayer';
import Button from '@/components/Button';

// https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Vivaldi.jpg/195px-Vivaldi.jpg

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function EndScreen() {
  const { composer, piece, movement } = useLocalSearchParams<{ 
    composer: string; 
    piece: string; 
    movement: string;
  }>();

  return (
      <View 
        style={{ 
          flex: 1, 
          backgroundColor: 'white',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        
        <Image
          style={{
            width: 200, 
            height: 200, 
            borderRadius: 1000, 
            borderWidth: 2, 
            borderColor: 'grey',
          }}
          source='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Vivaldi.jpg/195px-Vivaldi.jpg'
          placeholder={{ blurhash }}
          contentFit='cover'
          transition={1000}
        />
        
        <View 
          style={{ 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>
            {composer}
          </Text>
          <Text>
            {piece}
          </Text>
          <Text>
            {movement}
          </Text>
        </View>

        {/* <AudioPlayer /> */}
        <Button title='Play Again' onPress={() => router.replace('/test') } />
          
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
});